import React, { useContext, useEffect } from 'react'

import { Outlet, useParams } from 'react-router-dom'

import { travelsStore } from '../../../store/travelsStore'
import { userStore } from '../../../store/userStore'
import { SOCKET_EVENTS, SOCKETS_ROOMS } from '../sockets/constants'
import { SocketContextForNameSpace } from '../sockets/socketForNameSpace'

export const DetailTravel = () => {
	const { idTravel } = useParams()
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const setTravelInfo = travelsStore((state) => state.setTravelInfo)
	const { socketForNameSpace } = useContext(SocketContextForNameSpace)

	console.log(idTravel)
	// conexion con el socket para las diferentes salas
	useEffect(() => {
		// Ingreso a la sala del dispositivo para que me manden la informacion
		socketForNameSpace?.emit(SOCKET_EVENTS.JOIN_ROOM, {
			id_user: uid,
			id_room: idTravel,
			x_access_token: tokenSesion,
			type_join: SOCKETS_ROOMS.ROOM_TRAVEL_INFO
		})

		socketForNameSpace?.on(SOCKET_EVENTS.JOINED_ROOM, (data) => {
			console.log(data)
		})
		// Me suscribo a la sala del dispositivo para que me mande la informacion en tiempo real
		socketForNameSpace?.on(SOCKET_EVENTS.R_INFO_TRAVEL, (data) => {
			console.log(data)
			setTravelInfo(data?.data)
		})

		// // emitir a la tabla de eventos
		// socketForNameSpace?.emit(SOCKET_EVENTS.TB_EVENTS_DEVICE, {
		// 	page: 1,
		// 	search: null,
		// 	id_user: uid,
		// 	id_room: idTravel,
		// 	x_access_token: tokenSesion,
		// 	type_join: SOCKETS_ROOMS.ROOM_DEVICE
		// })

		// // Aqui trae la informacion de los eventos
		// socketForNameSpace?.on(SOCKET_EVENTS.R_TB_EVENTS_DEVICE, (data) => {
		// 	setArrayTableInventoryEvents(data)
		// })

		// // emitir a la tabla de test
		// socketForNameSpace?.emit(SOCKET_EVENTS.TB_TESTINGS_DEVICE, {
		// 	page: 1,
		// 	search: null,
		// 	id_user: uid,
		// 	id_room: idTravel,
		// 	x_access_token: tokenSesion,
		// 	type_join: SOCKETS_ROOMS.ROOM_DEVICE
		// })

		// // suscripcion a la tabla de test
		// socketForNameSpace?.on(SOCKET_EVENTS.R_TB_TESTINGS_DEVICE, (data) => {
		// 	setArrayTableInventoryTest(data)
		// })

		return () => {
			// Desconexion con la sala para dejar de pedir informacion acerca del dispositivo
			socketForNameSpace?.emit(SOCKET_EVENTS.LEAVE_ROOM, {
				id_user: uid,
				id_room: idTravel,
				x_access_token: tokenSesion,
				type_join: SOCKETS_ROOMS.ROOM_DEVICE
			})
		}
	}, [])
	return <Outlet />
}
