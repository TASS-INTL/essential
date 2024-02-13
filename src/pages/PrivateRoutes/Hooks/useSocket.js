import { useCallback, useEffect, useState } from 'react'

import io from 'socket.io-client'

export const useSocket = (serverPath) => {
	const [socket, setSocket] = useState(null)
	const [online, setOnline] = useState(false)

	const connnectSocket = useCallback(() => {
		const socketTemp = io('http://15.228.13.62:8009', {
			transports: ['websocket'],
			autoConnect: true
		})
		setSocket(socketTemp)
	}, [serverPath])

	const disconnectSocket = useCallback(() => {
		socket?.disconnect()
	}, [socket])

	useEffect(() => {
		setOnline(socket?.connected)
	}, [socket])

	useEffect(() => {
		socket?.on('disconnect', () => {
			setOnline(false)
			console.log('desconectado del socket')
		})
	}, [socket])

	useEffect(() => {
		socket?.on('connect', () => {
			socket.on('joined_room', (data) => {
				console.log(data)
			})
		})
	}, [socket])

	return {
		socket,
		online,
		connnectSocket,
		disconnectSocket
	}
}
