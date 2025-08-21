import { Check, Plus, X } from 'lucide-react'
import { useState } from 'react'

import { Button, Input } from '@/shared/components/ui'

import { useAddColumn } from '@/feautures/projectColumn/add-column/model/useAddColumn'
import { useParams } from 'next/navigation'

interface IAddColumnButtonProps {
	columnsLength: number
}

export const AddColumnButton = ({ columnsLength }: IAddColumnButtonProps) => {
	const params = useParams<{ projectId: string }>()

	const [isAdding, setIsAdding] = useState<boolean>(false)
	const [title, setTitle] = useState<string>('')

	const { addColumn, isColumnAdding } = useAddColumn()

	const handleSave = () => {
		addColumn({
			order: columnsLength,
			title,
			projectId: params.projectId
		})

		setIsAdding(false)
		setTitle('')
	}

	const handleCancel = () => {
		setIsAdding(false)
		setTitle('')
	}

	const handleAddColumn = () => {
		setIsAdding(true)
	}

	return (
		<>
			{isAdding ? (
				<div className='flex w-full flex-col gap-2'>
					<Input
						className='min-w-[200px]'
						placeholder='Название колонки'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<div className='flex justify-end gap-2'>
						<Button
							size='icon'
							variant='secondary'
							onClick={handleSave}
						>
							<Check className='h-4 w-4' />
						</Button>
						<Button
							size='icon'
							variant='ghost'
							onClick={handleCancel}
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
					onClick={handleAddColumn}
				>
					<Plus className='h-6 w-6' />
				</Button>
			)}
		</>
	)
}
