interface IListView {
	columns: any[]
}

export function ListView({ columns }: IListView) {
	return (
		<>
			<table className='w-full border'>
				<thead>
					<tr>
						<th>Задача</th>
						<th>Статус</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</>
	)
}
