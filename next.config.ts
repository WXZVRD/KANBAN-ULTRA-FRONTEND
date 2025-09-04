import type { NextConfig } from 'next'

import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
		NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY:
			process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'avatars.yandex.net'
			}
		]
	}
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
