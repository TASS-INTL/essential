import { useQuery } from '@tanstack/react-query'

import api from '../../../../Api/api'
import { METHODS_API } from '../../../../Api/constantsApi'

export const useService = () => {
	const fetchDataService = (page, search) =>
		useQuery({
			queryKey: ['getServiceList', page, search],
			queryFn: async () =>
				await api(
					METHODS_API.GET,
					`module/service/client?page=${page}${search !== '' ? `&search=${search}` : ''}`
				)
		})

	return { fetchDataService }
}
