export function shortenerText(maxLength: number, text: string) {
	return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}
