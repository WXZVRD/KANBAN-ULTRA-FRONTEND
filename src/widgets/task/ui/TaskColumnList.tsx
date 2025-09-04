import { ITask } from '@/entities/task/types/task.interface'
import { TaskCard } from '@/entities/task/ui/TaskCard'
import { Draggable, Droppable } from '@hello-pangea/dnd'

interface ITaskColumnList {
	columnId: string
	tasks: ITask[]
}

export function TaskColumnList({ columnId, tasks }: ITaskColumnList) {
	return (
		<Droppable droppableId={columnId} type='TASK'>
			{provided => (
				<div
					className='rounded-2xl shadow-inner'
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className='max-h-[62vh] space-y-3'>
						{tasks.map((task, index) => (
							<Draggable
								key={task.id}
								draggableId={task.id}
								index={index}
							>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<TaskCard
											id={task.id}
											columnId={task.columnId}
											title={task.title}
											projectId={task.projectId}
											assigneeUser={task.assignee}
											priority={task.priority}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				</div>
			)}
		</Droppable>
	)
}
