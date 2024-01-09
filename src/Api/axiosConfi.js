import axios from 'axios'

const BASE_URL = 'http://ec2-15-229-119-48.sa-east-1.compute.amazonaws.com:8000/api/v1/'

export const AXIOSINSTANCE = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' }
})
