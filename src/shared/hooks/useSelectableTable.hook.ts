import { useState } from 'react'

export function useSelectableTableHook<T extends { id: string }>(items: T[]) {
	const [selectedIds, setSelectedIds] = useState<string[]>([])

	const toggleItem = (id: string) => {
		setSelectedIds(prev =>
			prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
		)
	}

	const selectAll = () => {
		if (selectedIds.length === items.length) {
			setSelectedIds([])
		} else {
			setSelectedIds(items.map(i => i.id))
		}
	}

	const isSelected = (id: string) => selectedIds.includes(id)
	const hasSelected = selectedIds.length > 0

	return {
		selectedIds,
		toggleItem,
		selectAll,
		isSelected,
		hasSelected,
		setSelectedIds
	}
}
