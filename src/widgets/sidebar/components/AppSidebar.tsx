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

import Link from 'next/link'

export function AppSidebar() {
	// Тут можешь подгружать проекты с API
	const projects = [
		{ id: '1', name: 'Kanban Board', href: '/projects/1' },
		{ id: '2', name: 'E-commerce App', href: '/projects/2' },
		{ id: '3', name: 'Portfolio Website', href: '/projects/3' }
	]

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
									{projects.map(project => (
										<Link
											key={project.id}
											href={project.href}
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
