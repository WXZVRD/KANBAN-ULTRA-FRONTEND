'use client'

import { BarChart3, LayoutGrid, Loader, Table } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { Button, Card, CardHeader, CardTitle, Separator } from '@/shared/components/ui'
import { APP_ROUTES } from '@/shared/consts/routes.constant'
import { useProjectView } from '@/shared/hooks/useProjectView.hook'

import { useGetById } from '@/feautures/project/hooks/useGetById'
import { ProjectSettingsDropdown } from '@/feautures/project/ui/ProjectSettingsDropdown'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MdCardMembership } from 'react-icons/md'

interface IProjectHeaderProps {
	projectId: string
}

export function ProjectHeader({ projectId }: IProjectHeaderProps) {
	const { currentProject, isProjectLoading } = useGetById(projectId)
	const { setView } = useProjectView()
	const route = useRouter()

	useEffect(() => {
		console.log('[ProjectHeader] mounted with projectId:', projectId)
		return () => {
			console.log('[ProjectHeader] unmounted')
		}
	}, [projectId])

	useEffect(() => {
		console.log('[ProjectHeader] isProjectLoading:', isProjectLoading)
	}, [isProjectLoading])

	useEffect(() => {
		console.log('[ProjectHeader] currentProject:', currentProject)
	}, [currentProject])

	console.log('[ProjectHeader] render with props:', {
		projectId,
		isProjectLoading,
		currentProject
	})

	const t = useTranslations()

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
				{t('ProjectHeader.noData')}
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
				<Button
					size='sm'
					variant='outline'
					onClick={() => {
						console.log('[ProjectHeader] switch to columns view')
						route.push(APP_ROUTES.PROJECTS.CURRENT(projectId))
						setView('columns')
					}}
				>
					<LayoutGrid className='mr-1 h-4 w-4' />
					{t('ProjectHeader.columns')}
				</Button>

				<Button
					size='sm'
					variant='outline'
					onClick={() => {
						console.log('[ProjectHeader] switch to table view')
						route.push(APP_ROUTES.PROJECTS.CURRENT(projectId))
						setView('table')
					}}
				>
					<Table className='mr-1 h-4 w-4' />
					{t('ProjectHeader.table')}
				</Button>

				<Separator orientation='vertical' className='h-6' />

				<Link href={APP_ROUTES.PROJECTS.STATISTIC(projectId)}>
					<Button size='sm' variant='secondary'>
						<BarChart3 className='mr-1 h-4 w-4' />
						{t('ProjectHeader.stats')}
					</Button>
				</Link>

				<Link href={APP_ROUTES.PROJECTS.MEMBERS(projectId)}>
					<Button size='sm' variant='secondary'>
						<MdCardMembership className='mr-1 h-4 w-4' />
						{t('ProjectHeader.manager')}
					</Button>
				</Link>
			</div>
		</Card>
	)
}
