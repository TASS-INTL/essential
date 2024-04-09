import React, { createContext, useCallback, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

import { userStore } from '../../../store/userStore'

export const SocketContextForNameSpace = createContext()

export const conectionNameSpace = {
	session: 'session',
	device: 'device'
}

export const SocketForNameSpace = ({ children, nameSpace }) => {
	console.log(nameSpace)
	const [socketForNameSpace, setSocketForNameSpace] = useState(null)
	const { tokenSesion } = userStore((state) => state.userData)

	const disconnectSocket = useCallback(() => {
		socketForNameSpace?.disconnect()
	}, [socketForNameSpace])

	// const connnectSocketForNameSpace = useCallback(() => {
	// 	const socketTemp = io(`https://skolympo.tassintl.com/${nameSpace}`, {
	// 		reconnectionDelayMax: 1000,
	// 		// transports: ['websocket'],
	// 		autoConnect: true,
	// 		extraHeaders: { x_access_token: tokenSesion }
	// 		// extraHeaders: { x_access_token: tokenSesion }
	// 	})

	// 	return socketTemp
	// }, [nameSpace])x

	useEffect(() => {
		// setSocketForNameSpace(connnectSocketForNameSpace())
		return () => {
			disconnectSocket()
		}
	}, [])

	useEffect(() => {
		// socket?.emit('join_room', {
		// 	id_user: uid,
		// 	id_room: tokenSesion,
		// 	type_join: 'room_session'
		// })
		// socket?.on('my_event', (data) => {
		// 	showToast(`❌ Tienes notificaciones nuevas`, 'warning')
		// 	setNotification(data?.unread)
		// 	setArrayNotification(data?.notifications)
		// })
	}, [socketForNameSpace])

	const store = {
		socketForNameSpace
	}

	return <SocketContextForNameSpace.Provider value={store}>{children}</SocketContextForNameSpace.Provider>
}
