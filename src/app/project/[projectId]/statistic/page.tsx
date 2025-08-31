import { Metadata } from 'next'

import { StatisticWrapper } from '@/widgets/StatisticWrapper/ui/StatisticWrapper'

const metadata: Metadata = {
	title: 'Statistics'
}

interface IStatisticPage {
	params: {
		projectId: string
	}
}

export default function StatisticPage({ params }: IStatisticPage) {
	return <StatisticWrapper projectId={params.projectId} />
}
