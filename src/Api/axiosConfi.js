import axios from 'axios'

import { API_URLS } from './constantsApi'

export const AXIOS_INSTANCE = axios.create({
	baseURL: API_URLS.API_GATEWAY
})

// Request interceptor for API calls
AXIOS_INSTANCE.interceptors.request.use(
	async (config) => {
		const token = await localStorage.getItem('token')
		config.headers = {
			Accept: 'application/json',
			'x-access-token': `${token}`,
			'Content-Type': 'application/json'
		}
		return config
	},
	(error) => {
		Promise.reject(error)
	}
)
