import { useTranslations } from 'next-intl'

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

import { useGetProjectMembersQuery } from '@/entities/member/'
import { UserCard } from '@/entities/user/'

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
	const t = useTranslations()
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className='w-[280px]'>
				<SelectValue
					placeholder={t('TaskCreateModal.assigneeDescription')}
				/>
			</SelectTrigger>
			<SelectContent>
				{isProjectMembersLoading ? (
					<Loader />
				) : projectMembers && projectMembers.length > 0 ? (
					<SelectGroup>
						<SelectLabel>
							{t('TaskCreateModal.assigneeTitle')}
						</SelectLabel>
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
