import { useTranslations } from 'next-intl'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { Loader } from '@/shared/components/ui'

import { BaseStatCard } from '@/entities/statistic'
import { IProgressStat } from '@/feautures/statistic'

const COLORS: string[] = ['#22c55e', '#e5e7eb']

interface IProgressChart {
	data: IProgressStat
	isLoading: boolean
}

export function ProgressChart({ isLoading, data }: IProgressChart) {
	const isEmpty = data.totalTasks === 0

	const t = useTranslations()

	const pieData = [
		{ name: 'Done', value: data.doneTasks },
		{ name: 'Remaining', value: data.totalTasks - data.doneTasks }
	]

	return (
		<BaseStatCard title={t('Statistic.progress.title')}>
			{isLoading ? (
				<Loader />
			) : isEmpty ? (
				<div className='text-muted-foreground flex h-[250px] items-center justify-center text-sm'>
					{t('Statistic.progress.noData')}
				</div>
			) : (
				<ResponsiveContainer width='100%' height={250}>
					<PieChart>
						<Pie
							data={pieData}
							dataKey='value'
							outerRadius={100}
							innerRadius={60}
							label
						>
							{COLORS.map((color, i) => (
								<Cell key={i} fill={color} />
							))}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			)}

			<div className='mt-2 text-center text-lg font-semibold'>
				{Number.isFinite(data.percent)
					? `${data.percent.toFixed(0)}% Done`
					: '0% Done'}
			</div>
		</BaseStatCard>
	)
}
