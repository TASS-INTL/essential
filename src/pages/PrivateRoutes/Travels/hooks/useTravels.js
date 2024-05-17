import { useMutation, useQuery } from '@tanstack/react-query'

import api from '../../../../Api/api'
import { METHODS_API } from '../../../../Api/constantsApi'
import { showToast } from '../../../../helpers/toast'
import { queryClient } from '../../../../routes/AppRouter'

export const useTravels = () => {
	const fetchDataTableTravels = (page, search) =>
		useQuery({
			queryKey: ['getTravelsList', page, search],
			queryFn: async () =>
				await api(
					METHODS_API.GET,
					`module/service/client?page=${page}${search !== '' ? `&search=${search}` : ''}`
				)
		})

	const fetchDataInfoRegister = () =>
		useQuery({
			queryKey: ['getDataInfoRegister'],
			queryFn: async () => await api(METHODS_API.GET, `module/travel/info/register`)
		})

	const createTravel = useMutation({
		mutationFn: async (data) => await api(METHODS_API.POST, `module/travel/create`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreateTravel'] })
	})

	const handleCreateTravel = async (data) => {
		const response = await createTravel.mutateAsync(data)
		response.completed && showToast('Se a creado de manera exito el viaje', 'success')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	return { fetchDataTableTravels, fetchDataInfoRegister, handleCreateTravel }
}
