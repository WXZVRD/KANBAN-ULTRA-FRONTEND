import { IUser } from '@/entities/user/types/user.interface'
import { findProfile } from '@/feautures/profile/api/profile.api'
import { useQuery } from '@tanstack/react-query'

export function useProfileHook() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: async (): Promise<IUser> => await findProfile(),
		refetchOnWindowFocus: false
	})

	return { user: data ?? null, isLoading }
}
