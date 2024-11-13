import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { checkLink } from './services/api';

export async function middleware(request: NextRequest) {
	const { nextUrl } = request;
	const linkRoute = nextUrl.pathname.split('/').pop();

	if (!linkRoute)
		return NextResponse.redirect(new URL('/', request.url).toString());

	const { error, url } = await checkLink(linkRoute);
	if (error || !url) return;

	return NextResponse.redirect(new URL(url).toString());
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)(.+)',
	],
};
