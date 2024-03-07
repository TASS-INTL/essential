import React, { createContext, useCallback, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

import { showToast } from '../../../helpers/toast'
import { notificationStore } from '../../../store/notificationStore'
import { usersStore } from '../../../store/usersStore'
import { userStore } from '../../../store/userStore'

export const SocketContext = createContext()

const urlSocket = import.meta.env.VITE_URL_SOCKET_NOTIFICATION

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null)
	const [online, setOnline] = useState(false)
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const setNotification = usersStore((state) => state.setNotification)
	const setArrayNotification = notificationStore((state) => state.setArrayNotification)

	const connnectSocket = useCallback(() => {
		const socketTemp = io(urlSocket, {
			reconnectionDelayMax: 1000,
			transports: ['websocket'],
			autoConnect: true
		})
		return socketTemp
	}, [])

	const disconnectSocket = useCallback(() => {
		socket?.disconnect()
	}, [socket])

	useEffect(() => {
		setOnline(socket?.connected)
	}, [socket])

	useEffect(() => {
		setSocket(connnectSocket())
		return () => {
			disconnectSocket()
		}
	}, [])

	useEffect(() => {
		socket?.emit('join_room', {
			id_user: uid,
			id_room: tokenSesion,
			type_join: 'room_session'
		})

		socket?.on('my_event', (data) => {
			showToast(`❌ Tienes notificaciones nuevas`, 'warning')
			setNotification(data?.unread)
			setArrayNotification(data?.notifications)
		})
	}, [socket])

	const store = {
		socket,
		online
	}

	return <SocketContext.Provider value={store}>{children}</SocketContext.Provider>
}
