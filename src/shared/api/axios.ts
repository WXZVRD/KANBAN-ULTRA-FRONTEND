import axios, { AxiosInstance } from 'axios'





const api: AxiosInstance = axios.create({
	baseURL: process.env.SERVER_URL,
	withCredentials: true,
	headers: {
		'content-type': 'application/json'
	}
})

export default api
