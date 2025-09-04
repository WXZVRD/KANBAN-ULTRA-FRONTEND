import { useTranslations } from 'next-intl'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Loader } from '@/shared/components/ui'

import { BaseStatCard } from '@/entities/statistic'
import { IPriorityStat } from '@/feautures/statistic/priority-chart'

const COLORS = ['#6366f1', '#22c55e', '#f97316', '#ef4444', '#14b8a6']

interface IPriorityChart {
	data: IPriorityStat[]
	isLoading: boolean
}

export function PriorityChart({ isLoading, data }: IPriorityChart) {
	const isEmpty = data.length === 0

	const t = useTranslations()

	return (
		<BaseStatCard title={t('Statistic.taskPriority.title')}>
			{isLoading ? (
				<Loader />
			) : isEmpty ? (
				<div className='text-muted-foreground flex h-[250px] items-center justify-center text-sm'>
					{t('Statistic.taskPriority.noData')}
				</div>
			) : (
				<ResponsiveContainer width='100%' height={250}>
					<BarChart data={data}>
						<XAxis dataKey='priority' />
						<YAxis allowDecimals={false} />
						<Tooltip />
						<Bar dataKey='count' radius={[6, 6, 0, 0]}>
							{data.map((stat, idx) => (
								<Cell
									key={stat.priority}
									fill={COLORS[idx % COLORS.length]}
								/>
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			)}
		</BaseStatCard>
	)
}
