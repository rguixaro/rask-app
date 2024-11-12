import { z } from 'zod';

import { CreateLinkSchema, LinkSchema } from '@/types';
import { Client, API } from './client';

interface authenticateResult {
	error: boolean;
	message?: string;
}
export const authenticate = async (): Promise<authenticateResult> => {
	const response = await Client().post(`${API}/auth`);
	const { status, data } = response;
	if (status !== 200 || data?.error)
		return { error: true, message: 'Failed to authenticate' };
	return { error: false };
};

interface getLinksResult {
	error: boolean;
	message?: string;
	links?: LinkSchema[];
}
export const getLinks = async (): Promise<getLinksResult> => {
	const response = await Client().get(`${API}/links`);
	const { status, data } = response;
	if (status !== 200 || data?.error || !data?.links)
		return { error: true, message: 'Failed to fetch links' };
	return { error: false, links: data.links as LinkSchema[] };
};

interface checkIfLinkExistsResult {
	error: boolean;
	message?: string;
}
export const checkIfLinkExists = async (
	link: string
): Promise<checkIfLinkExistsResult> => {
	const response = await Client().get(`${API}/link-exists/${link}`);
	const { status, data } = response;
	if (status !== 200)
		return { error: true, message: 'Failed to check if link exists' };
	else if (data?.error) return { error: true, message: data?.message };
	else return { error: false };
};

interface createLinkResult {
	error: boolean;
	message?: string;
}
export const createLink = async (
	values: z.infer<typeof CreateLinkSchema>
): Promise<createLinkResult> => {
	const response = await Client().post(`${API}/link-create`, values);
	const { status, data } = response;
	if (status === 201) return { error: false };
	else return { error: true, message: data.message || 'Failed to create link' };
};

interface getLinkResult {
	error: boolean;
	message?: string;
	url?: string;
}
export const getLink = async (slug: string): Promise<getLinkResult> => {
	const response = await Client().get(`${API}/link/${slug}`);
	const { status, data } = response;
	if (status !== 200 || data?.error || !data?.url)
		return { error: true, message: 'Failed to fetch link' };
	return { error: false, url: data.url as string };
};
