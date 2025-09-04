import { Metadata } from 'next'

import { SITE_NAME } from '@/shared/consts'

import { StatisticWrapper } from '@/widgets/statistic/ui/StatisticWrapper'

export const metadata: Metadata = {
	title: `Статистика | ${SITE_NAME}`,
	description: 'Статистика проекта и его анализ.'
}

interface IStatisticPage {
	params: {
		projectId: string
	}
}

export default async function StatisticPage({ params }: IStatisticPage) {
	return <StatisticWrapper projectId={params.projectId} />
}
