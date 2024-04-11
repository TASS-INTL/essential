import React, { createContext, useCallback, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

import { inventoryStore } from '../../../store/inventoryStore'
import { userStore } from '../../../store/userStore'
import { SOCKETS_ROOMS } from './constants'

export const SocketContextForNameSpace = createContext()

export const conectionNameSpace = {
	session: 'session',
	device: 'device'
}

export const SocketForNameSpace = ({ children, nameSpace }) => {
	const [socketForNameSpace, setSocketForNameSpace] = useState(null)
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const setArrayTableInventory = inventoryStore((state) => state.setArrayTableInventory)

	const disconnectSocket = useCallback(() => {
		socketForNameSpace?.disconnect()
	}, [socketForNameSpace])

	const connnectSocketForNameSpace = useCallback(() => {
		const socketTemp = io(`https://skolympo.tassintl.com/${nameSpace}`, {
			reconnectionDelayMax: 1000,
			transports: ['websocket', 'polling'],
			autoConnect: true,
			auth: { x_access_token: tokenSesion }
		})

		return socketTemp
	}, [nameSpace])

	useEffect(() => {
		setSocketForNameSpace(connnectSocketForNameSpace())
		return () => {
			disconnectSocket()
		}
	}, [])

	useEffect(() => {
		socketForNameSpace?.emit('join_room', {
			id_user: uid,
			id_room: tokenSesion,
			type_join: SOCKETS_ROOMS.ROOM_INVENTORY,
			x_access_token: tokenSesion
		})

		socketForNameSpace?.on('joined_room', (data) => {
			// console.log(data)
		})

		socketForNameSpace?.on('r_tb_device_fac', (data) => {
			console.log(data, 'table')
			setArrayTableInventory(data?.data)
		})
	}, [socketForNameSpace])

	const store = {
		socketForNameSpace
	}

	return <SocketContextForNameSpace.Provider value={store}>{children}</SocketContextForNameSpace.Provider>
}
