import React, { createContext, useEffect } from 'react'

import { userStore } from '../../../store/userStore'
import { useSocket } from '../Hooks/useSocket'

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
	const { logged } = userStore((state) => state.userData)

	const { socket, online, connnectSocket, disconnectSocket } = useSocket()

	useEffect(() => {
		if (logged) {
			connnectSocket()
		}
	}, [])

	useEffect(() => {
		if (!logged) {
			disconnectSocket()
		}
	}, [])

	const store = {
		socket,
		online
	}

	return <SocketContext.Provider value={store}>{children}</SocketContext.Provider>
}
