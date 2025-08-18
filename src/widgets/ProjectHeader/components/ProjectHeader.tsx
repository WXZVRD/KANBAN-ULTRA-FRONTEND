'use client'

import { BarChart3, LayoutGrid, Loader, Table } from 'lucide-react'

import { Button, Card, CardHeader, CardTitle, Separator } from '@/shared/components/ui'

import { ProjectSettingsDropdown } from '@/feautures/project/components/ProjectSettingsDropdown'
import { useGetById } from '@/feautures/project/hooks/useGetById'
import Link from 'next/link'

interface IProjectHeaderProps {
	projectId: string
}

export function ProjectHeader({ projectId }: IProjectHeaderProps) {
	const { currentProject, isProjectLoading } = useGetById(projectId)

	if (isProjectLoading) {
		return (
			<div className='flex items-center justify-center p-4'>
				<Loader className='animate-spin' />
			</div>
		)
	}

	if (!currentProject) {
		return (
			<div className='text-muted-foreground flex items-center justify-center p-4'>
				Проект не найден
			</div>
		)
	}

	return (
		<Card className='flex flex-col gap-2 p-4 shadow-md'>
			<CardHeader className='mb-2 flex items-center'>
				<CardTitle className='text-lg font-bold'>
					{currentProject.title}
				</CardTitle>
				<ProjectSettingsDropdown
					projectId={projectId}
					showAddMemberButton={true}
				/>
			</CardHeader>

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

				<Link href={`/projects/${projectId}/stats`}>
					<Button size='sm' variant='secondary'>
						<BarChart3 className='mr-1 h-4 w-4' />
						Статистика
					</Button>
				</Link>
			</div>
		</Card>
	)
}
