import { useTranslations } from 'next-intl'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { Loader } from '@/shared/components/ui'

import { BaseStatCard } from '@/entities/statistic/ui/BaseStatCard'
import { IWorkloadStat } from '@/feautures/statistic/workload-chart/types/workload.interface'

const COLORS = ['#6366f1', '#22c55e', '#f97316', '#ef4444', '#14b8a6']

interface IWorkLoadChart {
	data: IWorkloadStat[]
	isLoading: boolean
}

export function WorkLoadChart({ isLoading, data }: IWorkLoadChart) {
	const t = useTranslations()

	const isEmpty: boolean = data.length === 0

	return (
		<BaseStatCard title={t('Statistic.workload.title')}>
			{isLoading ? (
				<Loader />
			) : isEmpty ? (
				<div className='text-muted-foreground flex h-[250px] items-center justify-center text-sm'>
					{t('Statistic.workload.noData')}
				</div>
			) : (
				<ResponsiveContainer width='100%' height={250}>
					<PieChart>
						<Pie
							data={data}
							dataKey='percent'
							nameKey={d =>
								d.assignee?.displayName ?? t('User.unassigned')
							}
							outerRadius={100}
							label
						>
							{data.map((stat, idx) => (
								<Cell
									key={idx}
									fill={COLORS[idx % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			)}
		</BaseStatCard>
	)
}
