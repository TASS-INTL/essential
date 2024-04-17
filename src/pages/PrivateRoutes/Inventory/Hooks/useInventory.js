import { useMutation, useQuery } from '@tanstack/react-query'

import api from '../../../../Api/api'
import { METHODS_API } from '../../../../Api/constantsApi'
import { showToast } from '../../../../helpers/toast'
import { queryClient } from '../../../../routes/AppRouter'

export const useInventory = () => {
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

	return { fetchDataInventory, handleSendComand }
}
