import axios from 'axios'

export const Client = () =>
	axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL,
		withCredentials: true,
	})
