import { useContext } from 'react'

import { SOCKET_EVENTS } from '@/pages/PrivateRoutes/sockets/constants'
import { SocketContext } from '@/pages/PrivateRoutes/sockets/socketProvider'
import { userStore } from '@/store/userStore'

export const useSocketNotifications = () => {
	//
	const { socket } = useContext(SocketContext)
	const { uid, tokenSesion } = userStore((state) => state.userData)
	//
	const sendReadSocket = (idNotification) => {
		socket?.emit(SOCKET_EVENTS.NOTIFICATION_READ, {
			id_user: uid,
			room: tokenSesion,
			id_notification: idNotification
		})
	}

	return {
		sendReadSocket
	}
}
