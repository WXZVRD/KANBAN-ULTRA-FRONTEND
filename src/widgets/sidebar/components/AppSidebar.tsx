'use client'

import { ChevronDown, Plus } from 'lucide-react'

import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader
} from '@/shared/components/ui'

import { useAuth } from '@/feautures/auth/hooks/useAuth'
import { useGetAllUserProjects } from '@/feautures/project/hooks/useGetAllUserProjects'
import Link from 'next/link'

export function AppSidebar() {
	const { user } = useAuth()

	const { projects, isProjectsLoading } = useGetAllUserProjects(user?.id)

	if (!user) return null

	return (
		<Sidebar variant='inset' className='w-[250px] shrink-0 border-r'>
			<SidebarHeader>
				<Collapsible defaultOpen className='group/collapsible'>
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger>
								Projects
								<ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<div className='flex flex-col gap-1'>
									{isProjectsLoading && (
										<span className='text-muted-foreground text-sm'>
											Loading...
										</span>
									)}

									{!isProjectsLoading && !projects && (
										<span className='text-muted-foreground mt-3 mb-5 text-sm'>
											You have no projects yet
										</span>
									)}

									{!isProjectsLoading &&
										projects?.map(project => (
											<Link
												key={project.id}
												href={`/projects/${project.id}`}
												className='hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 text-sm'
											>
												{project.name}
											</Link>
										))}

									<Button
										variant='outline'
										size='sm'
										className='mt-2 flex items-center gap-1'
									>
										<Plus className='h-4 w-4' />
										Create project
									</Button>
								</div>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup />
				<SidebarGroup />
			</SidebarContent>

			<SidebarFooter />
		</Sidebar>
	)
}
