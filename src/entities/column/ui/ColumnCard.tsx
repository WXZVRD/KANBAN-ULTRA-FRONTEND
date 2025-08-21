import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/shared/components/ui'

interface ColumnCardProps {
	title: string
	children?: React.ReactNode
}

export const ColumnCard = ({ title, children }: ColumnCardProps) => {
	return (
		<Card className='w-80 flex-shrink-0'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	)
}
