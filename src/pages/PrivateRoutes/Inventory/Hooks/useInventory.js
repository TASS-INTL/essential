import { useContext, useEffect } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'

import api from '../../../../Api/api'
import { METHODS_API } from '../../../../Api/constantsApi'
import { showToast } from '../../../../helpers/toast'
import { queryClient } from '../../../../routes/AppRouter'
import { inventoryStore } from '../../../../store/inventoryStore'
import { userStore } from '../../../../store/userStore'
import { SOCKET_EVENTS, SOCKETS_ROOMS } from '../../sockets/constants'
import { SocketContextForNameSpace } from '../../sockets/socketForNameSpace'

export const useInventory = ({ idDevice }) => {
	const { socketForNameSpace } = useContext(SocketContextForNameSpace)
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const setDeviceInfo = inventoryStore((state) => state.setDeviceInfo)

	//
	const fetchDataInventory = (page, search) =>
		useQuery({
			queryKey: ['getInventoryList', page, search],
			queryFn: async () =>
				await api(
					METHODS_API.GET,
					`module/device-factory/inventory?page=${page}${search !== '' ? `&search=${search}` : ''}`
				)
		})

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

	const comandDevice = useMutation({
		mutationFn: async ({ idDevice, typeComand, did }) =>
			await api(METHODS_API.POST, `module/device-factory/${idDevice}/command/lock?tc=${typeComand}&did=${did}`),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postComand'] })
	})

	const handleSendComand = async (data) => {
		const response = await comandDevice.mutateAsync(data)
		response.completed && showToast('Se a enviado el comando', 'warning')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	useEffect(() => {
		socketForNameSpace?.emit(SOCKET_EVENTS.JOIN_ROOM, {
			id_user: uid,
			id_room: idDevice,
			x_access_token: tokenSesion,
			type_join: SOCKETS_ROOMS.ROOM_DEVICE
		})

		// socketForNameSpace?.on(SOCKET_EVENTS.JOINED_ROOM, (data) => {})

		socketForNameSpace?.on(SOCKET_EVENTS.R_DEVICE_INFO, (data) => {
			setDeviceInfo(data?.data[0])
		})
	}, [socketForNameSpace])

	return { fetchDataInventory, handleSendComand, emmitToDevice, paginationEmit }
}
