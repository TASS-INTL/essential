import React, { createContext, useCallback, useEffect, useState, useRef } from 'react'
import { devicesDetails } from '@/store/devices/devicesDetails'

import { showToast } from '@/helpers/toast'
import { userStore } from '@/store/userStore'
import { io } from 'socket.io-client'
import { deviceInfoStore } from '@/store/devices/deviceInfoStore'

import { SOCKET_EVENTS, TRANSPORT_SOCKET, SOCKETS_ROOMS } from './constants'

export const SocketDeviceContext = createContext()


export const SocketDeviceProvider = ({ children }) => {


    const setDevicesDetails = devicesDetails((state) => state.setDevicesDetails)
    const { uid, tokenSesion } = userStore((state) => state.userData)
    const socketRef = useRef(null)
    const [connection, setConnection] = useState(false)
    const InRealTimeDeviceInfo = deviceInfoStore((state) => state.inRealTimeTravelInfo)
    const setInRealTime = deviceInfoStore((state) => state.setInRealTimeTravelInfo)
    const generalDeviceInfo = deviceInfoStore((state) => state.general)
  
    const connectSocketDeviceNameSpace = useCallback(() => {
      if (!socketRef.current) {
        const socketTemp = io(`http://localhost:8003/device`, {
          reconnectionDelayMax: 9000,
          transports: [TRANSPORT_SOCKET.WEBSOCKET, TRANSPORT_SOCKET.POLLING],
          autoConnect: true,
          auth: { x_access_token: tokenSesion },
        })
        console.log('CONECTANDO AL SOCKET DEVICE')
        socketRef.current = socketTemp
        setConnection(true)
      }
    }, [tokenSesion])
  
    const disconnectSocket = useCallback(() => {

      if (socketRef.current) {
        socketRef.current?.emit(SOCKET_EVENTS.LEAVE_ROOM_DEVICE_INVENTORY, {
          id_user: uid,
          id_room: tokenSesion,
          type_leave: SOCKETS_ROOMS.DEVICE_INVENTORY,
          x_access_token: tokenSesion,
        })
        console.log('real time', InRealTimeDeviceInfo)
        console.log('info device', generalDeviceInfo)
          socketRef.current?.emit(SOCKET_EVENTS.LEAVE_ROOM_DEVICE_INFO, {
            id_user: uid,
            id_room: generalDeviceInfo?.data?.general._id,
            type_leave: SOCKETS_ROOMS.DEVICE_INFO,
            x_access_token: tokenSesion,
          })
        if(InRealTimeDeviceInfo){
          
          setInRealTime(false)
        }

        socketRef.current.disconnect()
        setConnection(false)
        socketRef.current = null
      }
    }, [])
  
    useEffect(() => {
      connectSocketDeviceNameSpace()
  
      return () => {
        
        
        disconnectSocket()
      }
    }, [connectSocketDeviceNameSpace, disconnectSocket])
  
    useEffect(() => {
      const socket = socketRef.current
      if (socket) {
        socket.on(SOCKET_EVENTS.CONNECT, () => {
          console.log('Conectado al namespace device socket')
        })
  
        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
          console.log('Desconectado del namespace device socket')
          showToast('Desconectado del namespace device ', 'info')
        })
  
        socket.on(SOCKET_EVENTS.JOINED_ROOM_DEVICE_INVENTORY, (data) => {
          showToast('conectado a la sala: ' + data.type_, 'success')
        })
  
        socket.emit(SOCKET_EVENTS.JOIN_ROOM_DEVICE_INVENTORY, {
          id_user: uid,
          id_room: tokenSesion,
          type_join: SOCKETS_ROOMS.DEVICE_INVENTORY,
          x_access_token: tokenSesion,
        })
  
        socket.on(SOCKET_EVENTS.R_DEVICE_INVENTORY, (data) => {
          showToast('Datos recibidos del dispositivo', 'success')
          console.log('data', data)
          setDevicesDetails(data)
        })

        socket.on(SOCKET_EVENTS.LEFT_ROOM_DEVICE_INVENTORY, (data) => {
          console.log('data', data)
          showToast('desconectado de la sala: ' + data.type_, 'info')
          
        })
  
        return () => {

          socket.off(SOCKET_EVENTS.CONNECT)
          socket.off(SOCKET_EVENTS.DISCONNECT)
          socket.off(SOCKET_EVENTS.LEFT_ROOM_DEVICE_INVENTORY)
          socket.off(SOCKET_EVENTS.JOINED_ROOM_DEVICE_INVENTORY)
          socket.off(SOCKET_EVENTS.R_DEVICE_INVENTORY)
          
          console.log('Desconectando del namespace device socket')
          
        }
      }
    }, [uid, tokenSesion])
  
    return (
      <SocketDeviceContext.Provider value={{ socketDeviceNameSpace: socketRef.current, connection }}>
        {children}
      </SocketDeviceContext.Provider>
    )
  }
  