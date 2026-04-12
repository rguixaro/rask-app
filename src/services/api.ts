import { z } from 'zod'
import { AxiosError } from 'axios'

import { CreateLinkSchema, LinkSchema } from '@/types'
import { Client } from './client'

interface authenticateResult {
	error: boolean
	message?: string
}
export const authenticate = async (): Promise<authenticateResult> => {
	try {
		const { data } = await Client().post('/auth')
		if (data?.error) return { error: true, message: 'Failed to authenticate' }
		return { error: false }
	} catch {
		return { error: true, message: 'Failed to authenticate' }
	}
}

interface getLinksListResult {
	error: boolean
	message?: string
	links?: LinkSchema[]
}
export const getLinksList = async (): Promise<getLinksListResult> => {
	try {
		const { data } = await Client().get('/links-list')
		if (data?.error || !data?.list)
			return { error: true, message: 'Failed to fetch links list' }
		return { error: false, links: data.list as LinkSchema[] }
	} catch {
		return { error: true, message: 'Failed to fetch links list' }
	}
}

interface checkLinkResult {
	error: boolean
	message?: string
	url?: string
}
export const checkLink = async (slug: string): Promise<checkLinkResult> => {
	try {
		const { data } = await Client().get(`/link-check/${slug}`)
		if (data?.error || !data?.url)
			return { error: true, message: data?.message || 'Failed to check link' }
		return { error: false, url: data.url as string }
	} catch (error) {
		if (error instanceof AxiosError) {
			return {
				error: true,
				message: error.response?.data?.message ?? 'LINK_NOT_FOUND',
			}
		}
		return { error: true, message: 'LINK_NOT_FOUND' }
	}
}

interface createLinkResult {
	error: boolean
	message?: string
	slug?: string
}
export const createLink = async (
	values: z.infer<typeof CreateLinkSchema>,
): Promise<createLinkResult> => {
	try {
		const response = await Client().post('/link-create', values)
		const { status, data } = response
		if (status === 201) return { error: false, slug: data.slug }
		else return { error: true, message: data.message || 'Failed to create link' }
	} catch (error) {
		if (error instanceof AxiosError) {
			const { response } = error
			return {
				error: true,
				message: (response?.data?.message ??
					'Failed to create link') as string,
			}
		}
		return { error: true, message: 'Failed to create link' }
	}
}
