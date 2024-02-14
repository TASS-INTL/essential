import axios from 'axios'

import { constantsApi } from './constantsApi'

export const AXIOSINSTANCE = axios.create({
	baseURL: constantsApi.API_URL
})

// Request interceptor for API calls
AXIOSINSTANCE.interceptors.request.use(
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
