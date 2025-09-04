import { useTranslations } from 'next-intl'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Loader } from '@/shared/components/ui'

import { BaseStatCard } from '@/entities/statistic'
import { IStatusStat } from '@/feautures/statistic/status-chart'

const COLORS = ['#6366f1', '#22c55e', '#f97316', '#ef4444', '#14b8a6']

interface IStatusChart {
	data: IStatusStat[]
	isLoading: boolean
}

export function StatusChart({ isLoading, data }: IStatusChart) {
	const isEmpty: boolean = data.length === 0

	const t = useTranslations()

	return (
		<BaseStatCard title={t('Statistic.status.title')}>
			{isLoading ? (
				<Loader />
			) : isEmpty ? (
				<div className='text-muted-foreground flex h-[250px] items-center justify-center text-sm'>
					{t('Statistic.status.noData')}
				</div>
			) : (
				<ResponsiveContainer width='100%' height={250}>
					<BarChart layout='vertical' data={data}>
						<XAxis type='number' />
						<YAxis type='category' dataKey='title' />
						<Tooltip />
						<Bar dataKey='taskCount' radius={[0, 6, 6, 0]}>
							{data.map((stat, idx) => (
								<Cell
									key={idx}
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
