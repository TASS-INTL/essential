import { useContext, useEffect } from 'react'

import { userStore } from '../../../../store/userStore'
import { SocketContextForNameSpace } from '../../sockets/socketForNameSpace'

export const useInventorySocket = () => {
	const { socketForNameSpace } = useContext(SocketContextForNameSpace)
	const { uid, tokenSesion } = userStore((state) => state.userData)

	const emmitToDevice = () => {
		socketForNameSpace.emit('r_device_lock', { lock: true })
	}

	const paginationEmit = (page, dataSearch) => {
		socketForNameSpace?.emit('tb_devices_fac', {
			page,
			search: dataSearch ? dataSearch : null,
			id_user: uid,
			id_room: tokenSesion,
			x_access_token: tokenSesion
		})
	}

	useEffect(() => {
		socketForNameSpace?.emit('join_room', {
			sid: null,
			id_user: uid,
			id_room: tokenSesion,
			type_join: 'ROOM_DEVICE',
			x_access_token: tokenSesion
		})

		socketForNameSpace?.on('r_device_info', (data) => {
			console.log(data)
		})
	}, [socketForNameSpace])

	return { emmitToDevice, paginationEmit }
}
