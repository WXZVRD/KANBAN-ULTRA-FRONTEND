import { BarChart3, LayoutGrid, Table } from 'lucide-react'
import type { Metadata } from 'next'

import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'

import { SITE_NAME } from '@/constants/seo.constants'
import Link from 'next/link'

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description:
		'Pet project with full powered from init to deploy by Nick "WXZVRD" Persiya fullstack'
}

export default function ProjectLayout({
	children,
	params
}: Readonly<{
	children: React.ReactNode
	params: { projectId: string }
}>) {
	const projectName = 'Название проекта'

	return (
		<div className='flex flex-col gap-4'>
			<Card className='flex flex-col gap-2 p-4 shadow-md'>
				<h1 className='text-2xl font-bold'>{projectName}</h1>

				<div className='flex items-center gap-2'>
					<Button size='sm' variant='outline'>
						<LayoutGrid className='mr-1 h-4 w-4' />
						Колонки
					</Button>
					<Button size='sm' variant='outline'>
						<Table className='mr-1 h-4 w-4' />
						Таблица
					</Button>

					<Separator orientation='vertical' className='h-6' />

					<Link href={`/projects/${params.projectId}/stats`}>
						<Button size='sm' variant='secondary'>
							<BarChart3 className='mr-1 h-4 w-4' />
							Статистика
						</Button>
					</Link>
				</div>
			</Card>

			<div>{children}</div>
		</div>
	)
}
