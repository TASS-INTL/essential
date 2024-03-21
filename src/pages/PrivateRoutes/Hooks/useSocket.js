import { useContext } from 'react'

import { userStore } from '../../../store/userStore'
import { SocketContext } from '../socketNotification/socketProvider'

export const useSocket = () => {
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const { socket } = useContext(SocketContext)

	const sendReadSocket = (id_notification) => {
		socket?.emit('notification_read', {
			id_user: uid,
			room: tokenSesion,
			id_notification
		})
	}

	return {
		sendReadSocket
	}
}
