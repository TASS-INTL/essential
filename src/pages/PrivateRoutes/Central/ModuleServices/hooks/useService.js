import { METHODS_API } from '@/Api/constantsApi'
import { useApi } from '@/Api/useApi'
import { useQuery } from '@tanstack/react-query'

export const useService = () => {
	const { requestApi } = useApi()

	const fetchDataService = (page, search) =>
		useQuery({
			queryKey: ['getServiceList', page, search],
			queryFn: async () =>
				await requestApi(
					METHODS_API.GET,
					`module/service/master?page=${page}${search !== '' ? `&search=${search}` : ''}`
				),
			enabled: Boolean(page)
		})

	return { fetchDataService }
}
