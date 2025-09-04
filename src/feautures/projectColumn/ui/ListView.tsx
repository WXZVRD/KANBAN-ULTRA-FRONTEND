import { useTranslations } from 'next-intl'

import { PriorityBadge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui'

import { IColumn } from '@/entities/column'
import { TaskAuthorCard } from '@/entities/task'
import { TaskSettingsDropdown } from '@/feautures/task'

interface IListView {
	columns: IColumn[]
}

export function ListView({ columns }: IListView) {
	const t = useTranslations('ListView')

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[40%]'>
							{t('taskTitle')}
						</TableHead>
						<TableHead>{t('author')}</TableHead>
						<TableHead>{t('priority')}</TableHead>
						<TableHead>{t('createdAt')}</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{columns.map((group, i) => (
						<>
							<TableRow key={`section-${i}`} className='bg-muted'>
								<TableCell
									colSpan={4}
									className='text-lg font-bold'
								>
									{group.title}
								</TableCell>
							</TableRow>

							{group.tasks.map((task, j) => (
								<TableRow key={`task-${i}-${j}`}>
									<TableCell>{task.title}</TableCell>
									<TableCell>
										<TaskAuthorCard
											assignee={task.assignee}
										/>
									</TableCell>
									<TableCell>
										<PriorityBadge
											priority={task.priority}
										/>
									</TableCell>
									<TableCell>
										{new Date(
											task.createdAt
										).toLocaleDateString('ru-RU')}
									</TableCell>
									<TableCell>
										<TaskSettingsDropdown
											columnId={group.id}
											taskData={{
												title: task.title,
												description: task.description,
												priority: task.priority,
												assigneeId: task.assignee?.id,
												projectId: task.projectId,
												columnId: task.columnId,
												id: task.id
											}}
										/>
									</TableCell>
								</TableRow>
							))}
						</>
					))}
				</TableBody>
			</Table>
		</>
	)
}
