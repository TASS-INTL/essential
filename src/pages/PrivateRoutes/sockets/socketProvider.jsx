import React, { createContext, useCallback, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

import { SOCKET_EVENTS, SOCKETS_ROOMS, TRANSPORT_SOCKET } from './constants'
import { userStore } from '@/store/userStore'
import { usersStore } from '@/store/usersStore'
import { notificationStore } from '@/store/notificationStore'
import { showToast } from '@/helpers/toast'

export const SocketContext = createContext()

const urlSocketSession = import.meta.env.VITE_URL_SOCKET_SESSION

const initialState = {
	chat: false,
	cart: false,
	userProfile: false,
	notification: false
}

export const SocketProvider = ({ children }) => {
	// notifications
	const [screenSize, setScreenSize] = useState(undefined)
	const [currentColor, setCurrentColor] = useState('#black')
	const [currentMode, setCurrentMode] = useState('Light')
	const [themeSettings, setThemeSettings] = useState(false)
	const [activeMenu, setActiveMenu] = useState(false)
	const [isClicked, setIsClicked] = useState(initialState)

	const setMode = (e) => {
		setCurrentMode(e.target.value)
		localStorage.setItem('themeMode', e.target.value)
	}

	const setColor = (color) => {
		setCurrentColor(color)
		localStorage.setItem('colorMode', color)
	}

	const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true })

	// socket
	const [socket, setSocket] = useState(null)
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const setNotification = usersStore((state) => state.setNotification)
	const setArrayNotification = notificationStore((state) => state.setArrayNotification)

	const connnectSocket = useCallback(() => {
		const socketTemp = io(urlSocketSession, {
			transports: [TRANSPORT_SOCKET.WEBSOCKET, TRANSPORT_SOCKET.POLLING],
			auth: { x_access_token: tokenSesion }
		})

		return socketTemp
	}, [])

	const disconnectSocket = useCallback(() => {
		socket?.disconnect()
	}, [socket])

	useEffect(() => {
		setSocket(connnectSocket())
		return () => {
			disconnectSocket()
		}
	}, [])

	useEffect(() => {
		// capture connection with room socket
		socket?.on(SOCKET_EVENTS.JOINED_ROOM, (data) => {
			showToast('conectado a: ' + data.type_, 'success')
		})

		socket?.emit(SOCKET_EVENTS.JOIN_ROOM, {
			id_user: uid,
			id_room: tokenSesion,
			type_join: SOCKETS_ROOMS.ROOM_SESSION,
			x_access_token: tokenSesion
		})

		socket?.on(SOCKET_EVENTS.R_NOTIFICATION_RECEIVE, (data) => {
			showToast(`Revisa tus notificaciones`, 'warning')
			setNotification(data?.unread)
			setArrayNotification(data)
		})

		return () => {
			// When the component is disassembled, the room output is sent
			socket?.emit(SOCKET_EVENTS.LEAVE_ROOM, {
				id_user: uid,
				id_room: tokenSesion,
				type_join: SOCKETS_ROOMS.ROOM_SESSION,
				x_access_token: tokenSesion
			})
			// The exit from the room is reported
			socket?.on(SOCKET_EVENTS.LEFT_ROOM, (data) => {
				showToast('desconectado de la sala: ' + data.type_, 'warning')
			})
		}
	}, [socket])

	const store = {
		socket,
		currentColor,
		currentMode,
		activeMenu,
		screenSize,
		setScreenSize,
		handleClick,
		isClicked,
		initialState,
		setIsClicked,
		setActiveMenu,
		setCurrentColor,
		setCurrentMode,
		setMode,
		setColor,
		themeSettings,
		setThemeSettings
	}

	return <SocketContext.Provider value={store}>{children}</SocketContext.Provider>
}
