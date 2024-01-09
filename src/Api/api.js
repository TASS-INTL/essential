import { AXIOSINSTANCE } from './axiosConfi'
import { constantsApi } from './constantsApi'

const api = async (method = constantsApi.GET, endpoint, body) => {
	try {
		if (method === constantsApi.GET) {
			const response = await AXIOSINSTANCE.get(endpoint)
			return response.data
		}

		if (method === constantsApi.POST) {
			const response = await AXIOSINSTANCE.post(endpoint, body)
			return response.data
		}
	} catch (error) {
		console.error(error)
	}
}

export default api
