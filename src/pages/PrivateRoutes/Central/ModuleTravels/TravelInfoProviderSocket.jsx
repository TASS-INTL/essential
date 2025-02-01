import React, { useContext, useEffect } from 'react'
import { userStore } from '@/store/userStore'
import { travelInfoStore } from '@/store/travels/travelInfoStore'
import { showToast } from '@/helpers/toast'
import { Outlet, useParams } from 'react-router-dom'
import { Container } from '@/Components/Container'
import { MapTravelInfo } from './mapsTravelInfo'


import { SocketTravelsContext } from '../../sockets/socketTravelsNameSpace'
import { SOCKET_EVENTS, SOCKETS_ROOMS } from '../../sockets/constants'

export const TravelInfoProviderSocket = () => {
    const { idTravel } = useParams()
    const { socketTravelNameSpace } = useContext(SocketTravelsContext)
    const { uid, tokenSesion } = userStore((state) => state.userData)
    const setTravelInfoGeneral = travelInfoStore((state) => state.setGeneral)
    const setTravelInfoEvents = travelInfoStore((state) => state.setEvents)
    const setTravelInfoReports = travelInfoStore((state) => state.setReports)
    const setTravelInfoProcess = travelInfoStore((state) => state.setProcess)
    const setTravelInfoMonitoring = travelInfoStore((state) => state.setMonitoring)
    const setTravelInfoCoordinates = travelInfoStore((state) => state.setCoordinates)
    const setInRealTime = travelInfoStore((state) => state.setInRealTimeTravelInfo)


    useEffect(() => {

        
        console.log("Travel: ", idTravel)
        

        socketTravelNameSpace?.on(SOCKET_EVENTS.JOINED_ROOM_TRAVEL_INFO, (data) => {
            showToast('conectado a la sala:'+ data.type_,'success', 'bottom-right', 2000)
            setInRealTime(true)
        })

        socketTravelNameSpace?.emit(SOCKET_EVENTS.JOIN_ROOM_TRAVEL_INFO, {
            id_user: uid,
            id_room: idTravel,
            x_access_token: tokenSesion,
            type_join: SOCKETS_ROOMS.TRAVEL_INFO
        })


        socketTravelNameSpace?.on(SOCKET_EVENTS.R_TB_LOGS_REGISTER_TRAVEL_INFO, (data) => {
            setTravelInfoReports(data)
        })

        socketTravelNameSpace?.on(SOCKET_EVENTS.R_TRAVEL_INFO, (data) => {
            console.log('data R_TRAVEL_INFO', data)
            setTravelInfoGeneral(data)
        })

        socketTravelNameSpace?.on(SOCKET_EVENTS.R_TB_EVENTS_TRAVEL_INFO, (data) => {
            setTravelInfoEvents(data)
        })

        socketTravelNameSpace?.on(SOCKET_EVENTS.R_TB_LOGS_REGISTER_TRAVEL_INFO, (data) => {
            setTravelInfoReports(data)
        })

        socketTravelNameSpace?.on(SOCKET_EVENTS.R_TB_PROCESSES_TRAVEL_INFO, (data) => {
            setTravelInfoProcess(data)
        })

        socketTravelNameSpace?.on(SOCKET_EVENTS.R_TB_MONITORING_TRAVEL_INFO, (data) => {
            setTravelInfoMonitoring(data)
        })

        // emits
        socketTravelNameSpace?.emit(SOCKET_EVENTS.TB_EVENTS_TRAVEL, {
            id_room: idTravel,
            x_access_token: tokenSesion,
            info: {
                page: 1,
                limit: 10,
                search: ""
            }
        })

        socketTravelNameSpace?.emit(SOCKET_EVENTS.TB_MONITORING_TRAVEL, {
            id_room: idTravel,
            x_access_token: tokenSesion,
            info: {
                page: 1,
                limit: 10,
                search: ""
            }
        })

        socketTravelNameSpace?.emit(SOCKET_EVENTS.TB_LOGS_REGISTER, {
            id_room: idTravel,
            x_access_token: tokenSesion,
            info: {
                page: 1,
                limit: 10,
                search: ""
            }
        })

        return () => {
            
            socketTravelNameSpace?.on(SOCKET_EVENTS.LEFT_ROOM_TRAVEL_INFO, (data) => {
                console.log('data', data)
                showToast('desconectado de la sala:'+ data.type_, 'info', 'bottom-right', 2000)
                setInRealTime(false)
                socketTravelNameSpace?.off(SOCKET_EVENTS.LEFT_ROOM_TRAVEL_INFO)
            })
            socketTravelNameSpace?.emit(SOCKET_EVENTS.LEAVE_ROOM_TRAVEL_INFO, {
                id_user: uid,
                id_room: idTravel,
                x_access_token: tokenSesion,
                type_leave: SOCKETS_ROOMS.TRAVEL_INFO
            })
            console.log("ADIOSSS TRAVEEL INFO ")
            
            socketTravelNameSpace?.off(SOCKET_EVENTS.JOINED_ROOM_TRAVEL_INFO)
            socketTravelNameSpace?.off(SOCKET_EVENTS.R_TB_PROCESSES_TRAVEL_INFO)
            socketTravelNameSpace?.off(SOCKET_EVENTS.R_TB_LOGS_REGISTER_TRAVEL_INFO)
            socketTravelNameSpace?.off(SOCKET_EVENTS.R_TRAVEL_INFO)
            socketTravelNameSpace?.off(SOCKET_EVENTS.R_TB_EVENTS_TRAVEL_INFO)
        }
    }, [])

    return (
        <MapTravelInfo></MapTravelInfo>
            
    )
}