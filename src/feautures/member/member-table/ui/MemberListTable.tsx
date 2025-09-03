'use client'

import { useMemo, useState } from 'react'

import { Checkbox, Loader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui'
import { useSelectableTable } from '@/shared/hooks'

import { MemberRole, useGetProjectMembersQuery } from '@/entities/member'
import { UserCard } from '@/entities/user'
import { MemberRoleSelector, useChangeRoleMutation } from '@/feautures/member/chage-role'
import { useDeleteProjectMemberMutation } from '@/feautures/member/delete-member'
import { MembersToolbar } from '@/feautures/member/toolbar/ui/MemberToolbar'

interface IMemberListTable {
	projectId: string
}

export function MemberListTable({ projectId }: IMemberListTable) {
	const { projectMembers, isProjectMembersLoading } =
		useGetProjectMembersQuery(projectId)

	const { selectAll, selectedIds, isSelected, hasSelected, toggleItem } =
		useSelectableTable(projectMembers)

	const { changeRole } = useChangeRoleMutation()
	const { deleteMembers } = useDeleteProjectMemberMutation()

	const [search, setSearch] = useState('')
	const [roleFilter, setRoleFilter] = useState<MemberRole | null>(null)

	const filteredMembers = useMemo(() => {
		let result = projectMembers

		if (roleFilter) {
			result = result.filter(m => m.memberRole === roleFilter)
		}

		if (search.trim()) {
			const lower = search.toLowerCase()
			result = result.filter(
				m =>
					m.user?.displayName?.toLowerCase().includes(lower) ||
					m.user?.email?.toLowerCase().includes(lower)
			)
		}

		return result
	}, [projectMembers, roleFilter, search])

	return (
		<>
			<MembersToolbar
				hasSelected={hasSelected}
				onDeleteSelected={() =>
					deleteMembers({
						projectId,
						ids: selectedIds
					})
				}
				onRoleFilterChange={setRoleFilter}
				onSearchChange={setSearch}
				roleFilter={roleFilter}
				search={search}
			/>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>
							<Checkbox
								checked={
									selectedIds.length ===
									filteredMembers.length
								}
								onCheckedChange={selectAll}
							/>
						</TableHead>
						<TableHead>Участник</TableHead>
						<TableHead>Роль</TableHead>
						<TableHead>Почта</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isProjectMembersLoading ? (
						<TableRow>
							<TableCell colSpan={4} className='text-center'>
								<Loader />
							</TableCell>
						</TableRow>
					) : filteredMembers.length > 0 ? (
						filteredMembers.map(member => (
							<TableRow key={member.id}>
								<TableCell>
									<Checkbox
										checked={isSelected(member.id)}
										onCheckedChange={() =>
											toggleItem(member.id)
										}
									/>
								</TableCell>
								<TableCell>
									<UserCard
										displayName={
											member.user?.displayName ??
											'Нет имени'
										}
									/>
								</TableCell>
								<TableCell>
									<MemberRoleSelector
										value={member.memberRole}
										onChangeRole={(role: MemberRole) =>
											changeRole({
												projectId,
												memberRole: role,
												userId: member.userId
											})
										}
									/>
								</TableCell>
								<TableCell>{member.user?.email}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={4} className='text-center'>
								Нет участников, подходящих под фильтры
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	)
}
