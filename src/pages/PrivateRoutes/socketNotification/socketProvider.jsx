import React, { createContext, useEffect } from 'react'

import { userStore } from '../../../store/userStore'
import { useSocket } from '../Hooks/useSocket'

// import { useMapStore } from '../store/mapStore'

const urlSocket = 'http://15.268.13.62:8009'

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
	// const { setLatAndLng } = useMapStore((state) => state)
	const { logged, uid, tokenSesion } = userStore((state) => state.userData)

	const { socket, online, connnectSocket, disconnectSocket } = useSocket(
		urlSocket
		//  import.meta.env.VITE_API_URL_SOCKETSk
	)

	useEffect(() => {
		if (logged) {
			connnectSocket()
		}
	}, [])

	useEffect(() => {
		if (!logged) {
			disconnectSocket()
		}
	}, [])

	//   useEffect(() => {
	//     socket?.on("userList", (users) =>
	//       dispatch({
	//         type: chatTypes.LOAD_USERS,
	//         payload: users,
	//       })
	//     );
	//   }, [socket, dispatch]);

	useEffect(() => {
		//  console.log("socket reaceived");
		socket?.on('connect', () => {
			socket.emit('join_room', {
				id_user: uid,
				id_room: tokenSesion,
				type_join: 'room_session'
			})

			socket.on('joined_room', (data) => {
				console.log(data, 'alejo ')
			})

			socket.on('my_event', (data) => {
				console.log(data)
			})
		})
	}, [socket])

	const store = {
		socket,
		online
	}

	return <SocketContext.Provider value={store}>{children}</SocketContext.Provider>
}
