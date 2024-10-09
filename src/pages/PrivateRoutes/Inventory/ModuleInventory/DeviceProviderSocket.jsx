import React, { useContext, useEffect } from 'react'

import { Outlet, useParams } from 'react-router-dom'

import { inventoryStore } from '../../../../store/inventoryStore'
import { userStore } from '../../../../store/userStore'
import { SOCKET_EVENTS, SOCKETS_ROOMS } from '../../sockets/constants'
import { SocketContextForNameSpace } from '../../sockets/socketForNameSpace'

export const DeviceProviderSocket = () => {
	const { idDevice } = useParams()
	const { socketForNameSpace } = useContext(SocketContextForNameSpace)
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const setDeviceInfo = inventoryStore((state) => state.setDeviceInfo)
	const setArrayTableInventoryEvents = inventoryStore((state) => state.setArrayTableInventoryEvents)
	const setArrayTableInventoryTest = inventoryStore((state) => state.setArrayTableInventoryTest)

	// conexion con el socket para las diferentes salas
	useEffect(() => {
		// Ingreso a la sala del dispositivo para que me manden la informacion
		socketForNameSpace?.emit(SOCKET_EVENTS.JOIN_ROOM, {
			id_user: uid,
			id_room: idDevice,
			x_access_token: tokenSesion,
			type_join: SOCKETS_ROOMS.ROOM_DEVICE
		})

		// Me suscribo a la sala del dispositivo para que me mande la informacion en tiempo real
		socketForNameSpace?.on(SOCKET_EVENTS.R_DEVICE_INFO, (data) => {
			setDeviceInfo(data)
		})

		// emitir a la tabla de eventos
		socketForNameSpace?.emit(SOCKET_EVENTS.TB_EVENTS_DEVICE, {
			page: 1,
			search: null,
			id_user: uid,
			id_room: idDevice,
			x_access_token: tokenSesion,
			type_join: SOCKETS_ROOMS.ROOM_DEVICE
		})

		// Aqui trae la informacion de los eventos
		socketForNameSpace?.on(SOCKET_EVENTS.R_TB_EVENTS_DEVICE, (data) => {
			console.log('data events device -->', data)
			setArrayTableInventoryEvents(data)
		})

		// emitir a la tabla de test
		socketForNameSpace?.emit(SOCKET_EVENTS.TB_TESTINGS_DEVICE, {
			page: 1,
			search: null,
			id_user: uid,
			id_room: idDevice,
			x_access_token: tokenSesion,
			type_join: SOCKETS_ROOMS.ROOM_DEVICE
		})

		// suscripcion a la tabla de test
		socketForNameSpace?.on(SOCKET_EVENTS.R_TB_TESTINGS_DEVICE, (data) => {
			setArrayTableInventoryTest(data)
		})

		return () => {
			// Desconexion con la sala para dejar de pedir informacion acerca del dispositivo
			socketForNameSpace?.emit(SOCKET_EVENTS.LEAVE_ROOM, {
				id_user: uid,
				id_room: idDevice,
				x_access_token: tokenSesion,
				type_join: SOCKETS_ROOMS.ROOM_DEVICE
			})
		}
	}, [])

	return <Outlet />
}
