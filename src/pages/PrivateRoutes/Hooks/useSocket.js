import { useCallback, useEffect, useState } from 'react'

import io from 'socket.io-client'

import { usersStore } from '../../../store/usersStore'
import { userStore } from '../../../store/userStore'

const urlSocket = import.meta.env.VITE_URL_SOCKET_NOTIFICATION
const arrayNotification = [
	{
		type_notification: 'alert',
		message: 'hubo un problema con la apertura de un candado',
		date: new Date()
	},
	{
		type_notification: 'alert',
		message: 'hubo un problema con la apertura de un candado',
		date: new Date()
	},
	{
		type_notification: 'alert',
		message: 'hubo un problema con la apertura de un candado',
		date: new Date()
	},
	{
		type_notification: 'alert',
		message: 'hubo un problema con la apertura de un candado',
		date: new Date()
	}
]

export const useSocket = () => {
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const setNotification = usersStore((state) => state.setNotification)

	const [socket, setSocket] = useState(null)
	const [online, setOnline] = useState(false)

	const connnectSocket = useCallback(() => {
		const socketTemp = io(urlSocket, {
			transports: ['websocket'],
			autoConnect: true
		})
		setSocket(socketTemp)
	}, [])

	const disconnectSocket = useCallback(() => {
		socket?.disconnect()
	}, [socket])

	useEffect(() => {
		setOnline(socket?.connected)
	}, [socket])

	useEffect(() => {
		socket?.on('connect', () => {
			socket.emit('join_room', {
				id_user: uid,
				id_room: tokenSesion,
				type_join: 'room_session'
			})

			socket.on('joined_room', (data) => {
				console.log(data, 'joined_room')
			})

			socket.on('my_event', (data) => {
				// console.log(data)
			})
		})
		setNotification(arrayNotification.length)
	}, [socket])

	return {
		socket,
		online,
		connnectSocket,
		disconnectSocket
	}
}
