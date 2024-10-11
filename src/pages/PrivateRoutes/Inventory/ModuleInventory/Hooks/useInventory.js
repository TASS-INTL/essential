import { useContext } from 'react'

import api from '@/Api/api'
import { queryClient } from '@/routes/AppRouter'
import { useMutation, useQuery } from '@tanstack/react-query'

// import api from '../../../../../Api/api'
import { METHODS_API } from '../../../../../Api/constantsApi'
import { showToast } from '../../../../../helpers/toast'
import { userStore } from '../../../../../store/userStore'
import { SOCKET_EVENTS } from '../../../sockets/constants'
import { SocketContextForNameSpace } from '../../../sockets/socketForNameSpace'

export const useInventory = () => {
	const { socketForNameSpace } = useContext(SocketContextForNameSpace)
	const { uid, tokenSesion } = userStore((state) => state.userData)
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
			search: dataSearch || null,
			id_user: uid,
			id_room: tokenSesion,
			x_access_token: tokenSesion
		})
	}

	const comandDevice = useMutation({
		mutationFn: async ({ idDevice, typeComand, did, to }) =>
			await api(
				METHODS_API.POST,
				`module/device-factory/${idDevice}/command/${to}?${typeComand ? `tc=${typeComand}&` : ''}did=${did}`
			),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postComand'] })
	})
	const handleSendComand = async (data) => {
		const response = await comandDevice.mutateAsync(data)
		response.completed && showToast('Se a enviado el comando', 'warning')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	const comandDeviceTest = useMutation({
		mutationFn: async ({ idDevice, did, to }) =>
			await api(METHODS_API.POST, `module/device-factory/${idDevice}/testing/${to}?did=${did}`),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postComand'] })
	})

	const handleSendComandTest = async (data) => {
		const response = await comandDeviceTest.mutateAsync(data)
		response.completed && showToast('Se a enviado el comando', 'warning')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	return {
		fetchDataInventory,
		handleSendComand,
		emmitToDevice,
		paginationEmit,
		handleSendComandTest
	}
}
