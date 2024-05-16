import React, { createContext, useCallback, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

import { showToast } from '../../../helpers/toast'
import { notificationStore } from '../../../store/notificationStore'
import { usersStore } from '../../../store/usersStore'
import { userStore } from '../../../store/userStore'
import { SOCKET_EVENTS, SOCKETS_ROOMS, TRANSPORT_SOCKET } from './constants'

export const SocketContext = createContext()

const urlSocketSession = import.meta.env.VITE_URL_SOCKET_SESSION

export const SocketProvider = ({ children }) => {
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
	}, [socket])

	const store = {
		socket
	}

	return <SocketContext.Provider value={store}>{children}</SocketContext.Provider>
}
