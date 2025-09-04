import { PropsWithChildren } from 'react'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/shared/components/ui'

interface IBaseStatCard {
	title: string
}

export function BaseStatCard({
	children,
	title
}: PropsWithChildren & IBaseStatCard) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	)
}
