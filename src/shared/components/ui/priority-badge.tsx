import { TaskPriority } from '@/entities/task/types/priority.enum'

type PriorityIndicatorProps = {
	priority: TaskPriority
}

const priorityStyles: Record<TaskPriority, string> = {
	[TaskPriority.LOW]: 'bg-green-400',
	[TaskPriority.MEDIUM]: 'bg-yellow-400',
	[TaskPriority.HIGH]: 'bg-orange-500',
	[TaskPriority.URGENT]: 'bg-red-500',
	[TaskPriority.CRITICAL]: 'bg-red-700'
}

export const PriorityBadge = ({ priority }: PriorityIndicatorProps) => {
	return (
		<div
			className={`h-3 w-3 rotate-45 ${priorityStyles[priority]} align-center flex items-center justify-center rounded-[2px]`}
		>
			{priority === TaskPriority.CRITICAL && (
				<span className='text-[10px] leading-none font-bold text-white'>
					!
				</span>
			)}
		</div>
	)
}
