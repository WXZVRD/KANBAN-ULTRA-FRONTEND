'use client'

import { Metadata } from 'next'

import { useProjectView } from '@/feautures/project/providers/ProjectView.provider'

const metadata: Metadata = {
	title: 'sad'
}

export default function ProjectPage() {
	const { view } = useProjectView()

	return (
		<div className='p-4'>
			{view === 'columns' ? (
				<div className='grid grid-cols-3 gap-4'></div>
			) : (
				<table className='w-full border'>
					<thead>
						<tr>
							<th>Задача</th>
							<th>Статус</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			)}
		</div>
	)
}
