'use client'

import { Globe } from 'lucide-react'
import { useLocale } from 'next-intl'

import { Button } from '@/shared/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu'

import { usePathname, useRouter } from '@/i18n/navigation'

const LOCALES = [
	{ code: 'en', label: 'English' },
	{ code: 'ru', label: 'Русский' }
]

export function LocaleSwitcher() {
	const router = useRouter()
	const pathname = usePathname()
	const activeLocale = useLocale()

	const handleChange = (locale: string) => {
		if (locale === activeLocale) return

		router.replace(pathname, { locale: locale })
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className='absolute top-5 right-35 z-[1000]'
				asChild
			>
				<Button variant='outline' size='icon' className='rounded-full'>
					<Globe className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end'>
				{LOCALES.map(locale => (
					<DropdownMenuItem
						key={locale.code}
						onClick={() => handleChange(locale.code)}
						className={
							activeLocale === locale.code ? 'font-bold' : ''
						}
					>
						{locale.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
