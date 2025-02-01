import React, { useContext, useEffect } from 'react'

import { Container } from '@/Components/Container'
import { showToast } from '@/helpers/toast'
import { deviceInfoStore } from '@/store/devices/deviceInfoStore'
import { userStore } from '@/store/userStore'
import { Outlet, useParams } from 'react-router-dom'

import { SOCKET_EVENTS, SOCKETS_ROOMS } from '../../sockets/constants'
import { SocketContextForNameSpace } from '../../sockets/socketForNameSpace'
import { SocketDeviceContext } from '../../sockets/socketDeviceNameSpace'

export const DeviceInfoProviderSocket = () => {
    const { idDevice } = useParams()
    const { socketDeviceNameSpace } = useContext(SocketDeviceContext)
    const { uid, tokenSesion } = userStore((state) => state.userData)

    const setDeviceInfoGeneral = deviceInfoStore((state) => state.setGeneral)
    const setDeviceInfoEvents = deviceInfoStore((state) => state.setEvents)
    const setInRealTime = deviceInfoStore((state) => state.setInRealTimeTravelInfo)


    // conexion con el socket para las diferentes salas
    useEffect(() => {

        console.log('idDevice', idDevice)
        const socket = socketDeviceNameSpace
        setInRealTime(true)

        
        socket?.on(SOCKET_EVENTS.JOINED_ROOM_DEVICE_INFO, (data) => {
            showToast('conectado a la sala: ' + data.type_, 'success')
            console.log('data de la sala del dispositivo: '+ data)
            setInRealTime(true)
        })

        // Ingreso a la sala del dispositivo para que me manden la informacion
        socket?.emit(SOCKET_EVENTS.JOIN_ROOM_DEVICE_INFO, {
            id_user: uid,
            id_room: idDevice,
            x_access_token: tokenSesion,
            type_join: SOCKETS_ROOMS.DEVICE_INFO
        })

        // Me suscribo a la sala del dispositivo para que me mande la informacion en tiempo real
        socket?.on(SOCKET_EVENTS.R_DEVICE_INFO, (data) => {
            console.log('data de la sala del dispositivo: '+ data)
            setDeviceInfoGeneral(data)
            setInRealTime(true)

        })


        // Aqui trae la informacion de los eventos
        socket?.on(SOCKET_EVENTS.R_TB_EVENTS_DEVICE_INFO, (data) => {
            setDeviceInfoEvents(data)
            setInRealTime(true)
        })

        // emitir a la tabla de eventos
        socket?.emit(SOCKET_EVENTS.TB_EVENTS_DEVICE_INFO, {
            info: {
                page: 1,
                limit: 10,
                search: "",
            },
            id_room: idDevice,
            x_access_token: tokenSesion,
        })

        

        // // emitir a la tabla de test
        // SocketDeviceProvider?.emit(SOCKET_EVENTS.TB_TESTINGS_DEVICE, {
        //     page: 1,
        //     search: null,
        //     id_user: uid,
        //     id_room: idDevice,
        //     x_access_token: tokenSesion,
        //     type_join: SOCKETS_ROOMS.ROOM_DEVICE
        // })

        // // suscripcion a la tabla de test
        // SocketDeviceProvider?.on(SOCKET_EVENTS.R_TB_TESTINGS_DEVICE, (data) => {
        //     setArrayTableInventoryTest(data)
        // })

        return () => {
            socket?.on(SOCKET_EVENTS.LEFT_ROOM_DEVICE_INFO, (data) => {
                showToast('desconectado de la sala: ' + data.type_, 'info')
                setInRealTime(false)
                socket?.off(SOCKET_EVENTS.LEFT_ROOM_DEVICE_INFO)
            })

            // Desconexion con la sala para dejar de pedir informacion acerca del dispositivo
                socket?.emit(SOCKET_EVENTS.LEAVE_ROOM_DEVICE_INFO, {
                id_user: uid,
                id_room: idDevice,
                x_access_token: tokenSesion,
                type_leave: SOCKETS_ROOMS.DEVICE_INFO
            })

            socket?.off(SOCKET_EVENTS.R_DEVICE_INFO)
            
            // SocketDeviceProvider?.off(SOCKET_EVENTS.R_TB_TESTINGS_DEVICE)
            socket?.off(SOCKET_EVENTS.JOINED_ROOM_DEVICE_INFO)
            socket?.off(SOCKET_EVENTS.R_TB_EVENTS_DEVICE_INFO)
            // showToast('desconectado de la sala del dispositivo: ' + `${idDevice}`, 'success')
        }
    }, [socketDeviceNameSpace])

    return (
        <Container>
            <Outlet />
        </Container>
    )
}
