import { useMutation, useQuery } from '@tanstack/react-query'

import api from '../../../../Api/api'
import { METHODS_API } from '../../../../Api/constantsApi'
import { showToast } from '../../../../helpers/toast'
import { queryClient } from '../../../../routes/AppRouter'

export const useServiceClient = () => {
	const fetchDataServiceClient = (page, search) =>
		useQuery({
			queryKey: ['getServiceClientList', page, search],
			queryFn: async () =>
				await api(
					METHODS_API.GET,
					`module/service/client?page=${page}${search !== '' ? `&search=${search}` : ''}`
				)
		})

	const createServiceClient = useMutation({
		mutationFn: async (data) => await api(METHODS_API.POST, `module/service/`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreateServiceClient'] })
	})

	const handleCreateServiceClient = async (data) => {
		const response = await createServiceClient.mutateAsync(data)
		response.completed && showToast('Se a creado de manera exito el servicio', 'success')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	return { fetchDataServiceClient, handleCreateServiceClient }
}
