import axios from 'axios'

const BASE_URL = 'http://ec2-15-228-13-62.sa-east-1.compute.amazonaws.com:8000/api/v1/'

export const AXIOSINSTANCE = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') }
})

// export const AXIOSINSTANCEFILE = axios.create({
// 	baseURL: BASE_URL,
// 	headers: { 'x-access-token': 'multipart/form-data' }
// })
