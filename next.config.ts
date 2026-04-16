import type { NextConfig } from 'next'

import packageJson from './package.json'

const requiredEnvVars = [
	'NEXT_PUBLIC_APP_URL',
	'NEXT_PUBLIC_API_URL',
	'API_URL',
] as const
for (const envVar of requiredEnvVars) {
	if (!process.env[envVar]) {
		throw new Error(`Missing required environment variable: ${envVar}`)
	}
}

const isDev = process.env.NODE_ENV === 'development'
const apiOrigin = new URL(process.env.API_URL!).origin

const securityHeaders = [
	{ key: 'X-Frame-Options', value: 'DENY' },
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	{
		key: 'Content-Security-Policy',
		value: [
			"default-src 'self'",
			`script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data:",
			"font-src 'self'",
			`connect-src 'self' ${apiOrigin}`,
		].join('; '),
	},
]

const nextConfig: NextConfig = {
	pageExtensions: ['ts', 'tsx'],
	env: { NEXT_PUBLIC_APP_VERSION: packageJson.version },
	experimental: {
		optimizePackageImports: ['lucide-react'],
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: securityHeaders,
			},
		]
	},
	async rewrites() {
		if (!isDev) return []
		return [
			{
				source: '/api-proxy/:path*',
				destination: `${process.env.API_URL}/:path*`,
			},
		]
	},
}

export default nextConfig
