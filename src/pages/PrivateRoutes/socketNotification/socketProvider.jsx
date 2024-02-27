import React, { createContext, useCallback, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

export const SocketContext = createContext()

const urlSocket = import.meta.env.VITE_URL_SOCKET_NOTIFICATION

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null)
	const [online, setOnline] = useState(false)

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
		setSocket(connnectSocket(setSocket))
		return () => {
			disconnectSocket()
		}
	}, [])

	const store = {
		socket,
		online
	}

	return <SocketContext.Provider value={store}>{children}</SocketContext.Provider>
}
