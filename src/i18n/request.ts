import { routing } from './routing'
import { hasLocale } from 'next-intl'

import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
	const locale =
		requestLocale && hasLocale(routing.locales, requestLocale)
			? requestLocale
			: routing.defaultLocale

	return {
		locale,
		messages: (await import(`../shared/locales/messages/${locale}.json`))
			.default
	}
})
