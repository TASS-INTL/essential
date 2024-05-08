import { useQuery } from '@tanstack/react-query'

import api from '../../../../Api/api'
import { METHODS_API } from '../../../../Api/constantsApi'

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

	return { fetchDataTableTravels, fetchDataInfoRegister }
}
