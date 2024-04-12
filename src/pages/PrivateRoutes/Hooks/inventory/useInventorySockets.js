import { useContext } from 'react'

import { userStore } from '../../../../store/userStore'
import { SOCKET_EVENTS } from '../../sockets/constants'
import { SocketContextForNameSpace } from '../../sockets/socketForNameSpace'

export const useInventorySocket = () => {
	const { socketForNameSpace } = useContext(SocketContextForNameSpace)
	const { uid, tokenSesion } = userStore((state) => state.userData)

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

	return { emmitToDevice, paginationEmit }
}
