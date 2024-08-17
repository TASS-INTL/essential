import React, { useContext, useEffect } from 'react'

import { Outlet, useParams } from 'react-router-dom'

import { travelsStore } from '../../../../store/travelsStore'
import { userStore } from '../../../../store/userStore'
import { SOCKET_EVENTS, SOCKETS_ROOMS } from '../../sockets/constants'
import { SocketContextForNameSpace } from '../../sockets/socketForNameSpace'

export const DetailTravel = () => {
	const { idTravel } = useParams()
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const setTravelInfo = travelsStore((state) => state.setTravelInfo)
	const setArrayTableTravelsEvents = travelsStore((state) => state.setArrayTableTravelsEvents)
	const setArrayTableTravelsMonitoring = travelsStore((state) => state.setArrayTableTravelsMonitoring)
	const setRealTimeCoordinates = travelsStore((state) => state.setRealTimeCoordinates)
	const { socketForNameSpace } = useContext(SocketContextForNameSpace)

	// conexion con el socket para las diferentes salas
	useEffect(() => {
		// Ingreso a la sala del dispositivo para que me manden la informacion
		socketForNameSpace?.emit(SOCKET_EVENTS.JOIN_ROOM, {
			id_user: uid,
			id_room: idTravel,
			x_access_token: tokenSesion,
			type_join: SOCKETS_ROOMS.ROOM_TRAVEL_INFO
		})

		// Me suscribo a la sala del dispositivo para que me mande la informacion en tiempo real
		socketForNameSpace?.on(SOCKET_EVENTS.R_INFO_TRAVEL, (data) => {
			setTravelInfo(data?.data)
		})

		// // emitir a la tabla de eventos de monitorio
		socketForNameSpace?.emit(SOCKET_EVENTS.TB_EVENTS_TRAVELS, {
			page: 1,
			search: null,
			id_user: uid,
			id_room: idTravel,
			x_access_token: tokenSesion
			// type_join: SOCKETS_ROOMS.ROOM_DEVICE
		})

		// Aqui trae la informacion de los eventos de monitoreo
		socketForNameSpace?.on(SOCKET_EVENTS.R_TB_EVENTS_TRAVEL, (data) => {
			setArrayTableTravelsEvents(data?.data)
		})

		// // emitir a la tabla de los eventos del monitoreo
		socketForNameSpace?.emit(SOCKET_EVENTS.TB_MONITORING_TRAVEL, {
			page: 1,
			search: null,
			id_user: uid,
			id_room: idTravel,
			x_access_token: tokenSesion
			// type_join: SOCKETS_ROOMS.ROOM_DEVICE
		})

		// // suscripcion a la tabla de monitorie
		socketForNameSpace?.on(SOCKET_EVENTS.R_TB_MONITORING_TRAVEL, (data) => {
			setArrayTableTravelsMonitoring(data?.data)
		})

		// emitir para pedir los datos en tiempo real de la latitud y logitud del device
		socketForNameSpace?.emit(SOCKET_EVENTS.REAL_TIME_MONITORING, {
			id_user: uid,
			id_travel: idTravel,
			x_access_token: tokenSesion,
			type_join: SOCKETS_ROOMS.ROOM_REAL_TIME_JOIN
		})

		socketForNameSpace?.on(SOCKET_EVENTS.R_TRAVEL_MONITORING_REAL_TIME, (data) => {
			setRealTimeCoordinates(data)
		})

		socketForNameSpace?.on('connect_error', (error) => {
			console.error('Error de Conexión:', error)
		})

		return () => {
			// Desconexion con la sala para dejar de pedir informacion acerca del viaje
			socketForNameSpace?.emit(SOCKET_EVENTS.REAL_TIME_MONITORING, {
				id_user: uid,
				id_travel: idTravel,
				x_access_token: tokenSesion,
				type_join: SOCKETS_ROOMS.ROOM_REAL_TIME_LEAVE
			})

			socketForNameSpace?.emit(SOCKET_EVENTS.LEAVE_ROOM, {
				id_user: uid,
				id_room: idTravel,
				x_access_token: tokenSesion,
				type_join: SOCKETS_ROOMS.ROOM_TRAVEL_INFO
			})
		}
	}, [])
	return <Outlet />
}