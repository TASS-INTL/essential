import { useContext } from 'react'

import { userStore } from '../../../../store/userStore'
import { SocketContext } from '../../sockets/socketProvider'

export const useSocketNotifications = () => {
	//
	const { socket } = useContext(SocketContext)
	const { uid, tokenSesion } = userStore((state) => state.userData)
	//
	const sendReadSocket = (id_notification) => {
		socket?.emit(SOCKET_EVENTS.NOTIFICATION_READ, {
			id_user: uid,
			room: tokenSesion,
			id_notification
		})
	}

	return {
		sendReadSocket
	}
}
