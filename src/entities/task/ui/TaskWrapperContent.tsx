import { ITask } from '@/entities/task/types/task.interface'
import { TaskCard } from '@/entities/task/ui/TaskCard'
import { TaskModal } from '@/feautures/task/add-task/ui/AddTaskModal'
import { Draggable, Droppable } from '@hello-pangea/dnd'

interface ITaskWrapperContent {
	columnId: string
	tasks: ITask[]
}

export function TaskWrapperContent({ columnId, tasks }: ITaskWrapperContent) {
	return (
		<Droppable droppableId={columnId} type='TASK'>
			{provided => (
				<div
					className='rounded-2xl shadow-inner'
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<TaskModal columnId={columnId} />

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
											title={task.title}
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
