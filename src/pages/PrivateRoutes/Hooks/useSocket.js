import { useContext, useEffect } from 'react'

import { showToast } from '../../../helpers/toast'
import { notificationStore } from '../../../store/notificationStore'
import { usersStore } from '../../../store/usersStore'
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
