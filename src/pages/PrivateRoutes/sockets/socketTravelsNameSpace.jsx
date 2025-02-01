import React, { createContext, useCallback, useEffect, useState, useRef, act } from 'react'
import { travelsDetailsStore } from '@/store/travels/travelsDetailsStore'

import { showToast } from '@/helpers/toast'
import { userStore } from '@/store/userStore'
import { io } from 'socket.io-client'
import { travelInfoStore } from '@/store/travels/travelInfoStore'

import { SOCKET_EVENTS, TRANSPORT_SOCKET, SOCKETS_ROOMS } from './constants'

export const SocketTravelsContext = createContext()


export const SocketTravelsProvider = ({ children }) => {


    const SocketTravelsDetails = travelsDetailsStore((state) => state.setTravelsDetails)
    const { uid, tokenSesion } = userStore((state) => state.userData)
    const socketRef = useRef(null)
    const [connection, setConnection] = useState(false)

    const activeRealTimeTravelInfo = travelInfoStore((state) => state.inRealTimeTravelInfo)
    const setInRealTime = travelInfoStore((state) => state.setInRealTimeTravelInfo)
    const generalTravelInfo = travelInfoStore((state) => state.general)
  
    const connectSocketDeviceNameSpace = useCallback(() => {
      if (!socketRef.current) {
        const socketTemp = io(`http://localhost:8003/travels`, {
          reconnectionDelayMax: 9000,
          transports: [TRANSPORT_SOCKET.WEBSOCKET, TRANSPORT_SOCKET.POLLING],
          autoConnect: true,
          auth: { x_access_token: tokenSesion },
        })
        console.log('CONECTANDO AL SOCKET TRAVELS')
        socketRef.current = socketTemp
        setConnection(true)
      }
    }, [tokenSesion])
  
    const disconnectSocket = useCallback(() => {

      if (socketRef.current) {
        socketRef.current?.emit(SOCKET_EVENTS.LEAVE_ROOM_TRAVELS_INVENTORY, {
          id_user: uid,
          id_room: tokenSesion,
          type_leave: SOCKETS_ROOMS.TRAVEL_INVENTORY,
          x_access_token: tokenSesion,
        })
        socketRef.current?.emit(SOCKET_EVENTS.LEAVE_ROOM_TRAVEL_INFO, {
          id_user: uid,
          id_room: generalTravelInfo?.data?._id,
          type_leave: SOCKETS_ROOMS.TRAVEL_INFO,
          x_access_token: tokenSesion,
        })
        if(activeRealTimeTravelInfo){
          
          setInRealTime(null)
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
          showToast('Desconectado del namespace travels ', 'info')
        })
  
        socket.on(SOCKET_EVENTS.JOINED_ROOM_TRAVELS_INVENTORY, (data) => {
          showToast('conectado a la sala: ' + data.type_, 'success')
        })
  
        socket.emit(SOCKET_EVENTS.JOIN_ROOM_TRAVELS_INVENTORY, {
          id_user: uid,
          id_room: tokenSesion,
          type_join: SOCKETS_ROOMS.TRAVEL_INVENTORY,
          x_access_token: tokenSesion,
        })
  
        socket.on(SOCKET_EVENTS.TRAVELS_INVENTORY, (data) => {
          showToast('Datos recibidos de los viajes', 'success')
          console.log('data', data)
          SocketTravelsDetails(data)
        })

        socket.on(SOCKET_EVENTS.LEFT_ROOM_TRAVELS_INVENTORY, (data) => {
          console.log('data', data)
          showToast('desconectado de la sala: ' + data.type_, 'info')
          
        })
  
        return () => {

          socket.off(SOCKET_EVENTS.CONNECT)
          socket.off(SOCKET_EVENTS.DISCONNECT)
          socket.off(SOCKET_EVENTS.LEFT_ROOM_TRAVELS_INVENTORY)
          socket.off(SOCKET_EVENTS.JOINED_ROOM_TRAVELS_INVENTORY)
          // socket.off(SOCKET_EVENTS.TRAVELS_INVENTORY)
          
          console.log('Desconectando del namespace travel socket')
          
        }
      }
    }, [uid, tokenSesion])
  
    return (
      <SocketTravelsContext.Provider value={{ socketTravelNameSpace: socketRef.current, connection }}>
        {children}
      </SocketTravelsContext.Provider>
    )
  }
  