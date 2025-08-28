import { userService } from '@/feautures/user/services'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
			const res = await userService.findProfile()
			return res
		},
		refetchOnWindowFocus: false
	})

	return { user: data ?? null, isLoading }
}
