import { useContext, useEffect } from 'react'

import { showToast } from '../../../helpers/toast'
import { notificationStore } from '../../../store/notificationStore'
import { usersStore } from '../../../store/usersStore'
import { userStore } from '../../../store/userStore'
import { SocketContext } from '../socketNotification/socketProvider'

export const useSocket = () => {
	const { socket, online } = useContext(SocketContext)
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const setNotification = usersStore((state) => state.setNotification)
	const setArrayNotification = notificationStore((state) => state.setArrayNotification)

	useEffect(() => {
		socket?.emit('join_room', {
			id_user: uid,
			id_room: tokenSesion,
			type_join: 'room_session'
		})

		socket?.on('my_event', (data) => {
			showToast('❌ tienes una nueva notificacion', 'warning')
			setNotification(data?.unread)
			console.log(data)
			setArrayNotification(data?.notifications)
		})
	}, [socket])

	return {
		socket,
		online
	}
}
