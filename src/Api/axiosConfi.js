import axios from 'axios'

const BASE_URL = 'http://ec2-15-228-13-62.sa-east-1.compute.amazonaws.com:8000/api/v1/'

export const AXIOSINSTANCE = axios.create({
	baseURL: BASE_URL
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

// AXIOSINSTANCE.interceptors.response.use(
// 	(response) => {
// 		return response
// 	},
// 	async function (error) {
// 		const originalRequest = error.config
// 		if (error.response.status === 403 && !originalRequest._retry) {
// 			originalRequest._retry = true
// 			const access_token = await refreshAccessToken()
// 			axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
// 			return axiosApiInstance(originalRequest)
// 		}
// 		return Promise.reject(error)
// 	}
// )
