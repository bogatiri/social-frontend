import { useQuery } from '@tanstack/react-query'

import { IUser } from '@/types/auth.types'

import { userService } from '@/services/user.service'

export function useUserById(userId: string) {
	const {
		data: user,
		isLoading,
		error
	} = useQuery<IUser>({
		queryKey: ['user', userId],
		queryFn: () => userService.getUserById(userId)
	})
	return { user, isLoading, error }
}
