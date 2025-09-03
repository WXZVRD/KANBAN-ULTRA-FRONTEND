import { Filter, Search, Trash2 } from 'lucide-react'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Input
} from '@/shared/components/ui'

import { MemberRole } from '@/entities/member'

interface MembersToolbarProps {
	search: string
	onSearchChange: (val: string) => void
	roleFilter: MemberRole | null
	onRoleFilterChange: (role: MemberRole | null) => void
	hasSelected: boolean
	onDeleteSelected: () => void
}

export function MembersToolbar({
	search,
	onSearchChange,
	roleFilter,
	onRoleFilterChange,
	hasSelected,
	onDeleteSelected
}: MembersToolbarProps) {
	return (
		<div className='flex items-center justify-between gap-2 border-b p-2'>
			<div className='flex items-center gap-2'>
				<Search className='text-muted-foreground h-4 w-4' />
				<Input
					placeholder='Поиск участников...'
					value={search}
					onChange={e => onSearchChange(e.target.value)}
					className='h-8 w-[200px]'
				/>
			</div>

			<div className='flex items-center gap-2'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='sm'>
							<Filter className='mr-1 h-4 w-4' />
							{roleFilter ?? 'Все роли'}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem
							onClick={() => onRoleFilterChange(null)}
						>
							Все
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => onRoleFilterChange(MemberRole.ADMIN)}
						>
							Админ
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() =>
								onRoleFilterChange(MemberRole.MEMBER)
							}
						>
							Участник
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<Button
					variant='destructive'
					size='sm'
					disabled={!hasSelected}
					onClick={onDeleteSelected}
				>
					<Trash2 className='mr-1 h-4 w-4' />
					Удалить
				</Button>
			</div>
		</div>
	)
}
