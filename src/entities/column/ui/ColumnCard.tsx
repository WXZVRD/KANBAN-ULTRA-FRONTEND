import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui'

import { ColumnCardSettings } from '@/entities/column/ui/ColumnCardSettings'

interface ColumnCardProps {
	title: string
	projectId: string
	children?: React.ReactNode
}

export const ColumnCard = ({ title, projectId, children }: ColumnCardProps) => {
	return (
		<Card className='w-80 flex-shrink-0'>
			<CardHeader className='flex justify-between'>
				<CardTitle>{title}</CardTitle>
				<div className=''>
					<ColumnCardSettings title={title} projectId={projectId} />
				</div>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	)
}
