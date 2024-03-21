import { useMutation, useQuery } from '@tanstack/react-query'

import api from '../../../Api/api'
import { constantsApi } from '../../../Api/constantsApi'

export const useInventory = () => {
	//
	const fetchDataInventory = (page, search) =>
		useQuery({
			queryKey: ['getInventoryList', page, search],
			queryFn: async () =>
				await api(
					constantsApi.GET,
					`module/device-factory/inventory?page=${page}${search !== '' ? `&search=${search}` : ''}`
				)
		})

	return { fetchDataInventory }
}
