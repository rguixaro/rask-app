import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const { nextUrl } = request;
	const linkRoute = nextUrl.pathname.split('/').pop();

	if (!linkRoute)
		return NextResponse.redirect(new URL('/', request.url).toString());

	// Use fetch instead of axios for Edge Runtime compatibility
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		if (!apiUrl) {
			console.error('NEXT_PUBLIC_API_URL is not defined');
			return;
		}

		const response = await fetch(`${apiUrl}/link-check/${linkRoute}`, {
			credentials: 'include',
		});

		if (!response.ok) {
			return;
		}

		const data = await response.json();
		if (data?.error || !data?.url) {
			return;
		}

		return NextResponse.redirect(new URL(data.url).toString());
	} catch (error) {
		console.error('Middleware error:', error);
		return;
	}
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)(.+)',
	],
};
