import React, { useContext, useEffect, useReducer } from 'react'

import { MapGoogle } from '@/Components/mapGoogle/Map'
import { Polygon } from '@/Components/mapGoogle/Polygon'
import { Polyline } from '@/Components/mapGoogle/Polyline'
import { showToast } from '@/helpers/toast'
import { useMapLogic } from '@/hooks/map/useMap'
import { travelsStore } from '@/store/travelsStore'
import { userStore } from '@/store/userStore'
import { APIProvider, useMap } from '@vis.gl/react-google-maps'
import { Outlet, useParams } from 'react-router-dom'

import { API_KEY_GOOGLE_MAPS } from '../../constants/constants'
import { SOCKET_EVENTS, SOCKETS_ROOMS } from '../../sockets/constants'
import { SocketContextForNameSpace } from '../../sockets/socketForNameSpace'

export const DetailTravel = () => {
	const { idTravel } = useParams()
	const { state, dispatch } = useMapLogic()
	const travelInfo = travelsStore((state) => state.travelInfo)
	const setCoordinates = travelsStore((state) => state.setCoordinates)
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const setTravelInfo = travelsStore((state) => state.setTravelInfo)
	const { socketForNameSpace } = useContext(SocketContextForNameSpace)
	const setRealTimeCoordinates = travelsStore((state) => state.setRealTimeCoordinates)
	const setArrayTableTravelsEvents = travelsStore((state) => state.setArrayTableTravelsEvents)
	const setArrayTableTravelsMonitoring = travelsStore((state) => state.setArrayTableTravelsMonitoring)

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
			setTravelInfo(data)
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
			setArrayTableTravelsEvents(data?.data ? data?.data : data)
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
		// socketForNameSpace?.emit(SOCKET_EVENTS.REAL_TIME_MONITORING, {
		// 	id_user: uid,
		// 	id_travel: idTravel,
		// 	x_access_token: tokenSesion,
		// 	type_join: SOCKETS_ROOMS.ROOM_REAL_TIME_JOIN
		// })

		socketForNameSpace?.on(SOCKET_EVENTS.R_TRAVEL_MONITORING_REAL_TIME, (data) => {
			setRealTimeCoordinates(data)
		})

		socketForNameSpace?.on('connect_error', (error) => {
			console.error('Error de Conexión:', error)
		})

		return () => {
			// Desconexion con la sala para dejar de pedir informacion acerca del viaje
			// socketForNameSpace?.emit(SOCKET_EVENTS.REAL_TIME_MONITORING, {
			// 	id_user: uid,
			// 	id_travel: idTravel,
			// 	x_access_token: tokenSesion,
			// 	type_join: SOCKETS_ROOMS.ROOM_REAL_TIME_LEAVE
			// })

			socketForNameSpace?.on(SOCKET_EVENTS.LEFT_ROOM, (data) => {
				showToast('desconectado correctamente de la sala: ' + data.type_, 'success')
				socketForNameSpace.off(SOCKET_EVENTS.R_INFO_TRAVEL)
				socketForNameSpace.off(SOCKET_EVENTS.LEFT_ROOM)
			})

			socketForNameSpace?.emit(SOCKET_EVENTS.LEAVE_ROOM, {
				id_user: uid,
				id_room: idTravel,
				x_access_token: tokenSesion,
				type_join: SOCKETS_ROOMS.ROOM_TRAVEL_INFO
			})
		}
	}, [])

	useEffect(() => {
		if (state?.now[0]?.geometry?.position) {
			setCoordinates({
				lat: state?.now[0]?.geometry?.position.lat(),
				lng: state?.now[0]?.geometry?.position.lng()
			})
		}
	}, [state])

	return (
		<>
			<div className='h-full pt-5 pl-8 relative'>
				<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
					<MapGoogle width={'40%'} showDrawingManager state={state} dispatch={dispatch}>
						<MapHandlerBoundliteral viewport={travelInfo?.data?.routing?.viewport} />
						{!!travelInfo?.data?.routing?.coordinatesroute && (
							<Polyline
								strokeWeight={7}
								strokeColor={'#c27e79'}
								pathArray={travelInfo?.data?.routing?.coordinatesroute}
							/>
						)}
						{!!travelInfo?.data?.routing?.location_start && (
							<Polygon
								strokeWeight={1.5}
								pathsArray={travelInfo?.data?.routing?.location_start?.location.coordinates[0]}
							/>
						)}
						{!!travelInfo?.data?.routing?.location_end && (
							<Polygon
								strokeWeight={1.5}
								pathsArray={travelInfo?.data?.routing?.location_end?.location.coordinates[0]}
							/>
						)}
					</MapGoogle>
				</APIProvider>
				<Outlet />
			</div>
		</>
	)
}

export const MapHandlerBoundliteral = ({ viewport }) => {
	const map = useMap()

	useEffect(() => {
		if (!map || !viewport) return

		if (viewport) {
			map.fitBounds(viewport, 50)
		}
	}, [map, viewport])

	return null
}
