export function setLSData(key: string, value: unknown) {
	localStorage.setItem(key, JSON.stringify(value))
}

export function getLSData<T>(key: string): T | null {
	const item = localStorage.getItem(key)
	if (!item) return null

	try {
		return JSON.parse(item) as T
	} catch {
		return item as unknown as T
	}
}

export function delLSData(key: string) {
	localStorage.removeItem(key)
}
