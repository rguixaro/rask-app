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
			return NextResponse.redirect(new URL('/', request.url).toString());
		}

		// Add timeout to prevent hanging requests
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

		const response = await fetch(`${apiUrl}/link-check/${linkRoute}`, {
			credentials: 'include',
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			return NextResponse.redirect(new URL('/', request.url).toString());
		}

		const data = await response.json();
		if (data?.error || !data?.url) {
			return NextResponse.redirect(new URL('/', request.url).toString());
		}

		return NextResponse.redirect(new URL(data.url).toString());
	} catch (error) {
		console.error('Middleware error:', error);
		return NextResponse.redirect(new URL('/', request.url).toString());
	}
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)(.+)',
	],
};
