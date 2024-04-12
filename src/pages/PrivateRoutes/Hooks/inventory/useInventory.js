import { useMutation, useQuery } from '@tanstack/react-query'

import api from '../../../../Api/api'
import { METHODS_API } from '../../../../Api/constantsApi'

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

	return { fetchDataInventory }
}
