'use client'

import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle, Loader } from '@/shared/components/ui'

import { useFullProjectStatistic } from '@/feautures/statistic/model/useFullProjectStatistic'

const COLORS = ['#6366f1', '#22c55e', '#f97316', '#ef4444', '#14b8a6']

interface IStatisticWrapper {
	projectId: string
}

export function StatisticWrapper({ projectId }: IStatisticWrapper) {
	const { projectStatistic, isProjectStatsticLoading } =
		useFullProjectStatistic(projectId)

	return (
		<div className='grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-2'>
			<Card>
				<CardHeader>
					<CardTitle>Workload by Members</CardTitle>
				</CardHeader>
				<CardContent>
					{isProjectStatsticLoading ? (
						<Loader />
					) : (
						<ResponsiveContainer width='100%' height={250}>
							<PieChart>
								<Pie
									data={projectStatistic?.workload}
									dataKey='percent'
									nameKey={d =>
										d.assignee?.displayName ?? 'Unassigned'
									}
									outerRadius={100}
									label
								>
									{projectStatistic?.workload.map(
										(_, idx) => (
											<Cell
												key={idx}
												fill={
													COLORS[idx % COLORS.length]
												}
											/>
										)
									)}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Task Priorities</CardTitle>
				</CardHeader>
				<CardContent>
					{isProjectStatsticLoading ? (
						<Loader />
					) : (
						<ResponsiveContainer width='100%' height={250}>
							<BarChart data={projectStatistic?.priorities}>
								<XAxis dataKey='priority' />
								<YAxis />
								<Tooltip />
								<Bar dataKey='count' radius={[6, 6, 0, 0]}>
									{projectStatistic?.priorities.map(
										(_, idx) => (
											<Cell
												key={idx}
												fill={
													COLORS[idx % COLORS.length]
												}
											/>
										)
									)}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Statuses</CardTitle>
				</CardHeader>
				<CardContent>
					{isProjectStatsticLoading ? (
						<Loader />
					) : (
						<ResponsiveContainer width='100%' height={250}>
							<BarChart
								layout='vertical'
								data={projectStatistic?.statuses}
							>
								<XAxis type='number' />
								<YAxis type='category' dataKey='title' />
								<Tooltip />
								<Bar dataKey='taskCount' radius={[0, 6, 6, 0]}>
									{projectStatistic?.statuses.map(
										(_, idx) => (
											<Cell
												key={idx}
												fill={
													COLORS[idx % COLORS.length]
												}
											/>
										)
									)}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Project Progress</CardTitle>
				</CardHeader>
				<CardContent>
					{isProjectStatsticLoading ? (
						<Loader />
					) : (
						<ResponsiveContainer width='100%' height={250}>
							<PieChart>
								<Pie
									data={[
										{
											name: 'Done',
											value: projectStatistic?.progress
												.doneTasks
										},
										{
											name: 'Remaining',
											value:
												projectStatistic!.progress
													.totalTasks -
												projectStatistic!.progress
													.doneTasks
										}
									]}
									dataKey='value'
									outerRadius={100}
									innerRadius={60}
									label
								>
									<Cell fill='#22c55e' />
									<Cell fill='#e5e7eb' />
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					)}
					<div className='mt-2 text-center text-lg font-semibold'>
						{projectStatistic?.progress.percent.toFixed(0)}% Done
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
