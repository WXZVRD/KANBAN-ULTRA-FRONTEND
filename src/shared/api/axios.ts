import axios, { AxiosInstance } from 'axios'





const api: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000',
	withCredentials: true,
	headers: {
		'content-type': 'application/json'
	}
})

export default api
