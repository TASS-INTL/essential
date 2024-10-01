import { useMutation, useQuery } from '@tanstack/react-query'

import api from '../../../../../Api/api'
import { METHODS_API } from '../../../../../Api/constantsApi'
import { showToast } from '../../../../../helpers/toast'
import { queryClient } from '../../../../../routes/AppRouter'

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

	const getDataPreCreateTravel = () =>
		useQuery({
			queryKey: ['getDataInfoRegister'],
			queryFn: async () => await api(METHODS_API.GET, `module/travel/info/register`)
		})

	const activateTravel = useMutation({
		mutationFn: async ({ idTravel, type }) =>
			await api(
				METHODS_API.POST,
				`module/travel/${idTravel}/${type}${type === 'activate' ? '?tx_period=120&sensing_period=20' : ''}`
			),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreateTravel'] })
	})

	const handleActivateTravel = async (data) => {
		const response = await activateTravel.mutateAsync(data)
		response.completed && showToast('Se a activado el viaje de manera exitosa', 'success')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	const createTravel = useMutation({
		mutationFn: async (data) => await api(METHODS_API.POST, `module/travel/create`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreateTravel'] })
	})

	const handleCreateTravel = async (data) => {
		const response = await createTravel.mutateAsync(data)
		response?.completed && showToast('Se a creado de manera exito el viaje', 'success')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	return {
		handleCreateTravel,
		handleActivateTravel,
		fetchDataTableTravels,
		getDataPreCreateTravel
	}
}
