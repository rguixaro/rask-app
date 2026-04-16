import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function proxy(request: NextRequest) {
	const { nextUrl } = request
	const linkRoute = nextUrl.pathname.split('/').pop()

	if (!linkRoute)
		return NextResponse.redirect(new URL('/', request.url).toString())

	try {
		const apiUrl = process.env.API_URL
		const response = await fetch(`${apiUrl}/link-check/${linkRoute}`, {
			credentials: 'include',
		})

		if (!response.ok)
			return NextResponse.redirect(new URL('/', request.url).toString())

		const data = await response.json()

		if (data?.error || !data?.url)
			return NextResponse.redirect(new URL('/', request.url).toString())

		const redirectUrl = new URL(data.url)
		if (!['http:', 'https:'].includes(redirectUrl.protocol))
			return NextResponse.redirect(new URL('/', request.url).toString())

		return NextResponse.redirect(redirectUrl.toString())
	} catch {
		return NextResponse.redirect(new URL('/', request.url).toString())
	}
}

export const config = {
	matcher: [
		'/((?!_next/|api/|api-proxy/|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)(.+)',
	],
}
