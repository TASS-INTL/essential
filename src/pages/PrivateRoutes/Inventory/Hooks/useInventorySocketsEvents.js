import { useContext, useEffect } from 'react'

import { inventoryStore } from '../../../../store/inventoryStore'
import { userStore } from '../../../../store/userStore'
import { SOCKET_EVENTS, SOCKETS_ROOMS } from '../../sockets/constants'
import { SocketContextForNameSpace } from '../../sockets/socketForNameSpace'

export const useInventorySocketsEvents = ({ idDevice }) => {
	const { socketForNameSpace } = useContext(SocketContextForNameSpace)
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const setArrayTableInventoryEvents = inventoryStore((state) => state.setArrayTableInventoryEvents)

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
		socketForNameSpace?.emit(SOCKET_EVENTS.TB_EVENTS_DEVICE, {
			id_user: uid,
			id_room: idDevice,
			page: 1,
			search: null,
			x_access_token: tokenSesion
		})

		socketForNameSpace?.on(SOCKET_EVENTS.R_TB_EVENTS_DEVICE, (data) => {
			setArrayTableInventoryEvents(data?.data?.results)
		})
	}, [socketForNameSpace])

	return { paginationEmit }
}
