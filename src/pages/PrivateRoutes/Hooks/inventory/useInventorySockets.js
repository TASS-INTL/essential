import { useContext, useEffect } from 'react'

import { userStore } from '../../../../store/userStore'
import { SocketContextForNameSpace } from '../../sockets/socketForNameSpace'

export const useInventorySocket = () => {
	const { socketForNameSpace } = useContext(SocketContextForNameSpace)
	const { uid, tokenSesion } = userStore((state) => state.userData)

	const emmitToDevice = () => {
		socketForNameSpace.emit('r_device_lock', { lock: true })
	}

	useEffect(() => {
		socketForNameSpace?.emit('join_room', {
			id_user: uid,
			type_join: 'ROOM_DEVICE',
			id_room: tokenSesion,
			sid: null,
			x_access_token: tokenSesion
		})

		socketForNameSpace?.on('r_device_info', (data) => {
			console.log(data)
		})
	}, [socketForNameSpace])

	return { emmitToDevice }
}
