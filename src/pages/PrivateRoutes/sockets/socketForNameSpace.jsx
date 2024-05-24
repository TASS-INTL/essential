import React, { createContext, useCallback, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

import { userStore } from '../../../store/userStore'
import { SOCKET_EVENTS, TRANSPORT_SOCKET } from './constants'

export const SocketContextForNameSpace = createContext()

export const SocketForNameSpace = ({ children, nameSpace, typeJoin, socketsEvents, functionListening }) => {
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const [socketForNameSpace, setSocketForNameSpace] = useState(null)

	const connnectSocketForNameSpace = () => {
		const socketTemp = io(`https://skolympo.tassintl.com/${nameSpace}`, {
			reconnectionDelayMax: 9000,
			transports: [TRANSPORT_SOCKET.WEBSOCKET, TRANSPORT_SOCKET.POLLING],
			autoConnect: true,
			auth: { x_access_token: tokenSesion }
		})

		return socketTemp
	}

	const disconnectSocket = useCallback(() => {
		socketForNameSpace?.disconnect()
	}, [socketForNameSpace])

	useEffect(() => {
		// Conexion al socket medianate namespace
		setSocketForNameSpace(connnectSocketForNameSpace())
		return () => {
			// Desconexion del socket
			disconnectSocket()
		}
	}, [nameSpace])

	useEffect(() => {
		// Ingresar a las diferentes salas del socket
		socketForNameSpace?.emit(SOCKET_EVENTS.JOIN_ROOM, {
			id_user: uid,
			id_room: tokenSesion,
			type_join: typeJoin,
			x_access_token: tokenSesion
		})

		// Escuchar una sala en especifico
		socketForNameSpace?.on(socketsEvents, (data) => {
			functionListening(data?.data)
		})

		socketForNameSpace?.on('connect_error', (error) => {
			console.error('Error de Conexión:', error)
		})
	}, [socketForNameSpace])

	const store = {
		socketForNameSpace
	}

	return <SocketContextForNameSpace.Provider value={store}>{children}</SocketContextForNameSpace.Provider>
}
