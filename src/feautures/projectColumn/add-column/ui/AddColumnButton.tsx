import { Check, Plus, X } from 'lucide-react'

import { Button, Input } from '@/shared/components/ui'
import { useInputWithControls } from '@/shared/hooks/useInputWithControls.hook'

import { useAddColumn } from '@/feautures/projectColumn/add-column/model/useAddColumn'
import { useParams } from 'next/navigation'

interface IAddColumnButtonProps {
	columnsLength: number
}

export const AddColumnButton = ({ columnsLength }: IAddColumnButtonProps) => {
	const params = useParams<{ projectId: string }>()
	const { addColumn, isColumnAdding } = useAddColumn()

	const {
		value: title,
		setValue: setTitle,
		isEditing: isAdding,
		startEditing: startAdding,
		handleSave,
		handleCancel
	} = useInputWithControls({
		onSave: (title: string): void => {
			addColumn({
				order: columnsLength,
				title,
				projectId: params.projectId
			})
		},
		onCancel: () => setTitle('')
	})

	return (
		<>
			{isAdding ? (
				<div className='flex w-full flex-col gap-2'>
					<Input
						className='min-w-[200px]'
						placeholder='Название колонки'
						value={title}
						onChange={e => setTitle(e.target.value)}
						autoFocus
					/>
					<div className='flex justify-end gap-2'>
						<Button
							size='icon'
							variant='secondary'
							onClick={handleSave}
							disabled={!title.trim() || isColumnAdding}
						>
							<Check className='h-4 w-4' />
						</Button>
						<Button
							size='icon'
							variant='ghost'
							onClick={handleCancel}
							disabled={isColumnAdding}
						>
							<X className='h-4 w-4' />
						</Button>
					</div>
				</div>
			) : (
				<Button
					variant='outline'
					size='icon'
					className='h-12 w-12 rounded-full'
					onClick={startAdding}
				>
					<Plus className='h-6 w-6' />
				</Button>
			)}
		</>
	)
}
