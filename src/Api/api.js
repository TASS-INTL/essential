import { showToast } from '../helpers/toast'
import { AXIOS_INSTANCE } from './axiosConfi'
import { METHODS_API } from './constantsApi'

const api = async (method = METHODS_API.GET, endpoint, body) => {
	try {
		if (method === METHODS_API.GET) {
			const response = await AXIOS_INSTANCE.get(endpoint)
			return response.data
		}

		if (method === METHODS_API.POST) {
			const response = await AXIOS_INSTANCE.post(endpoint, body)
			return response.data
		}

		if (method === METHODS_API.DELETE) {
			const response = await AXIOS_INSTANCE.delete(endpoint)
			return response.data
		}

		if (method === METHODS_API.PUT) {
			const response = await AXIOS_INSTANCE.put(endpoint, body)
			return response.data
		}
	} catch (error) {
		showToast('❌ Algo ha salido mal ' + error, 'error')
		console.error(error)
	}
}

export default api
