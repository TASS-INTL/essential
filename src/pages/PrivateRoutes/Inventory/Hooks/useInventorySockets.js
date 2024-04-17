import { useContext, useEffect } from 'react'

import { inventoryStore } from '../../../../store/inventoryStore'
import { userStore } from '../../../../store/userStore'
import { SOCKET_EVENTS, SOCKETS_ROOMS } from '../../sockets/constants'
import { SocketContextForNameSpace } from '../../sockets/socketForNameSpace'

export const useInventorySocket = ({ idDevice }) => {
	const { socketForNameSpace } = useContext(SocketContextForNameSpace)
	const { uid, tokenSesion } = userStore((state) => state.userData)

	const setDeviceInfo = inventoryStore((state) => state.setDeviceInfo)

	const emmitToDevice = () => {
		socketForNameSpace.emit('r_device_lock', { lock: true })
	}

	const paginationEmit = (page, dataSearch) => {
		socketForNameSpace?.emit(SOCKET_EVENTS.TB_DEVICES_FAC, {
			page,
			search: dataSearch ? dataSearch : null,
			id_user: uid,
			id_room: tokenSesion,
			x_access_token: tokenSesion
		})
	}

	useEffect(() => {
		socketForNameSpace?.emit(SOCKET_EVENTS.JOIN_ROOM, {
			id_user: uid,
			id_room: idDevice,
			type_join: SOCKETS_ROOMS.ROOM_DEVICE,
			x_access_token: tokenSesion
		})

		// socketForNameSpace?.on(SOCKET_EVENTS.JOINED_ROOM, (data) => {
		// })

		socketForNameSpace?.on(SOCKET_EVENTS.R_DEVICE_INFO, (data) => {
			setDeviceInfo(data?.data[0])
		})
	}, [socketForNameSpace])

	return { emmitToDevice, paginationEmit }
}
