import React, { createContext, useCallback, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

import { showToast } from '../../../helpers/toast'
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
		// capture connection with room socket
		socketForNameSpace?.on(SOCKET_EVENTS.JOINED_ROOM, (data) => {
			showToast('conectado a la sala: ' + data.type_, 'success')
		})
		// join the connection with room socket
		socketForNameSpace?.emit(SOCKET_EVENTS.JOIN_ROOM, {
			id_user: uid,
			id_room: tokenSesion,
			type_join: typeJoin,
			x_access_token: tokenSesion
		})

		// licening room especific
		socketForNameSpace?.on(socketsEvents, (data) => {
			functionListening(data?.data)
		})

		// capture error in connection socket
		socketForNameSpace?.on('connect_error', (error) => {
			showToast('ocurrio un error en la conexion del socket' + error, 'error')
		})

		return () => {
			socketForNameSpace?.on(SOCKET_EVENTS.LEFT_ROOM, (data) => {
				console.log('data left room', data)
				showToast('desconectado de la sala: ' + data.type_, 'warning')
			})
			// When the component is disassembled, the room output is sent
			socketForNameSpace?.emit(SOCKET_EVENTS.LEAVE_ROOM, {
				id_user: uid,
				id_room: tokenSesion,
				type_join: typeJoin,
				x_access_token: tokenSesion
			})
			// The exit from the room is reported
		}
	}, [socketForNameSpace])

	const store = {
		socketForNameSpace
	}

	return <SocketContextForNameSpace.Provider value={store}>{children}</SocketContextForNameSpace.Provider>
}
