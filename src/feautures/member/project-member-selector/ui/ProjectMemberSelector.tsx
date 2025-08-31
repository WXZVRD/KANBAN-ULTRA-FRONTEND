import {
	Loader,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui'

import { useGetProjectMembersQuery } from '@/entities/member/model/useGetProjectMembers.mutation'
import { UserCard } from '@/entities/user/ui/UserCard'

interface IProjectMemberSelector {
	projectId: string
	value?: string
	onChange: (value: string) => void
}

export function ProjectMemberSelector({
	projectId,
	value,
	onChange
}: IProjectMemberSelector) {
	const { projectMembers, isProjectMembersLoading } =
		useGetProjectMembersQuery(projectId)

	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className='w-[280px]'>
				<SelectValue placeholder='Выбери исполнителя' />
			</SelectTrigger>
			<SelectContent>
				{isProjectMembersLoading ? (
					<Loader />
				) : projectMembers && projectMembers.length > 0 ? (
					<SelectGroup>
						<SelectLabel>Участники проекта</SelectLabel>
						{projectMembers
							.filter(member => !!member.user)
							.map(member => (
								<SelectItem
									key={member.user!.id}
									value={member.user!.id}
								>
									<UserCard
										displayName={member.user!.displayName}
										picture={member.user!.picture}
									/>
								</SelectItem>
							))}
					</SelectGroup>
				) : (
					<div className='text-muted-foreground p-2 text-center'>
						Участники отсутствуют
					</div>
				)}
			</SelectContent>
		</Select>
	)
}
