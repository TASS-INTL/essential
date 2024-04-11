import React, { createContext, useCallback, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

import { showToast } from '../../../helpers/toast'
import { notificationStore } from '../../../store/notificationStore'
import { usersStore } from '../../../store/usersStore'
import { userStore } from '../../../store/userStore'
import { SOCKETS_ROOMS } from './constants'

export const SocketContext = createContext()

const urlSocketSession = import.meta.env.VITE_URL_SOCKET_SESSION

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null)
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const setNotification = usersStore((state) => state.setNotification)
	const setArrayNotification = notificationStore((state) => state.setArrayNotification)

	const connnectSocket = useCallback(() => {
		const socketTemp = io(urlSocketSession, {
			transports: ['websocket', 'polling'],
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
		socket?.emit('join_room', {
			id_user: uid,
			id_room: tokenSesion,
			type_join: SOCKETS_ROOMS.ROOM_SESSION,
			x_access_token: tokenSesion
		})

		socket?.on('r_notificatio_receive', (data) => {
			showToast(`❌ Tienes notificaciones nuevas`, 'warning')
			setNotification(data?.unread)
			setArrayNotification(data)
		})
	}, [socket])

	const store = {
		socket
	}

	return <SocketContext.Provider value={store}>{children}</SocketContext.Provider>
}
