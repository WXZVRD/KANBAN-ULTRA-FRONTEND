import { useAuth } from '@/feautures/auth/hooks/useAuth'
import { userService } from '@/feautures/user/services'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
	const { setUser } = useAuth()
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => {
			const res = await userService.findProfile()
			setUser(res)
			return res
		}
	})

	return { user, isLoading }
}
