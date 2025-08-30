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
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuSkeleton
} from '@/shared/components/ui'

import { DASBOARD_PAGES } from '@/config/pages-url.config'
import { UserCard } from '@/entities/user/ui/UserCard'
import { useAuth } from '@/feautures/auth/hooks/useAuth'
import { useGetAllUserProjects } from '@/feautures/member/get-project-by-member/model/useGetProjectByMemberApi.query'
import { ProjectListItem } from '@/widgets/sidebar/components/ProjectListItem'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export function AppSidebar() {
	const { user } = useAuth()

	const params = useParams<{ projectId: string }>()

	const { projects, isProjectsLoading } = useGetAllUserProjects(
		params.projectId
	)

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
									{isProjectsLoading &&
										Array.from({ length: 5 }).map(
											(_, index) => (
												<SidebarMenuItem key={index}>
													<SidebarMenuSkeleton
														showIcon
													/>
												</SidebarMenuItem>
											)
										)}

									{!isProjectsLoading && !projects && (
										<span className='text-muted-foreground mt-3 mb-5 text-sm'>
											You have no projects yet
										</span>
									)}

									{!isProjectsLoading &&
										projects?.map(project => (
											<ProjectListItem
												key={project.project.id}
												id={project.project.id}
												title={project.project.title}
											/>
										))}

									<Button
										variant='outline'
										size='sm'
										className='mt-2 flex items-center gap-1'
									>
										<Plus className='h-4 w-4' />
										<Link
											href={DASBOARD_PAGES.PROJECT_CREATE}
										>
											Create project
										</Link>
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

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<Link href='/dashboard/settings'>
							<div className='hover:bg-muted/50 cursor-pointer rounded-xl p-4 transition-colors'>
								<UserCard
									displayName={user.displayName}
									picture={user.picture}
									size='lg'
								/>
							</div>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
