import { useContext } from 'react'

import { useApi } from '@/Api/useApi'
import { queryClient } from '@/routes/AppRouter'
import { useMutation, useQuery } from '@tanstack/react-query'

// import api from '../../../../../Api/api'
import { METHODS_API } from '../../../../../Api/constantsApi'
import { showToast } from '../../../../../helpers/toast'
import { userStore } from '../../../../../store/userStore'
import { SOCKET_EVENTS } from '../../../sockets/constants'
import { SocketDeviceContext } from '@/pages/PrivateRoutes/sockets/socketDeviceNameSpace'

export const useDeviceInfo = () => {
    const { socketDeviceNameSpace } = useContext(SocketDeviceContext)
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const { requestApi } = useApi()

    const emitEventTbDeviceEvents = (page, search) => {
        socketForNameSpace?.emit(SOCKET_EVENTS.TB_EVENTS_DEVICE, {
            page,
            search: search || null,
            id_user: uid,
            id_room: tokenSesion,
            x_access_token: tokenSesion
        })
    }

	// const emmitToDevice = () => {
	// 	socketForNameSpace.emit('r_device_lock', { lock: true })
	// }

	// const paginationEmit = (page, dataSearch) => {
	// 	socketForNameSpace?.emit(SOCKET_EVENTS.TB_DEVICES_FAC, {
	// 		page,
	// 		search: dataSearch || null,
	// 		id_user: uid,
	// 		id_room: tokenSesion,
	// 		x_access_token: tokenSesion
	// 	})
	// }

	const comandDevice = useMutation({
		mutationFn: async ({ idDevice, typeComand }) =>
			await requestApi(
				METHODS_API.POST,
				`module/device/${idDevice}/command/${typeComand}`
			),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postComand'] })
	})
	const handleSendComand = async (data) => {
		const response = await comandDevice.mutateAsync(data)
		response?.completed && showToast('Se a enviado el comando', 'info')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	const comandDeviceTest = useMutation({
		mutationFn: async ({ idDevice, did, to }) =>
			await requestApi(METHODS_API.POST, `module/device/${idDevice}/testing/${to}?did=${did}`),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postComand'] })
	})

	const handleSendComandTest = async (data) => {
		const response = await comandDeviceTest.mutateAsync(data)
		response?.completed && showToast('Se a enviado el comando', 'warning')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	return {
		handleSendComand,
		handleSendComandTest
	}
}
