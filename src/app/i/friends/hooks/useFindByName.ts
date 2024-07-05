import { useMutation } from '@tanstack/react-query'

import { userService } from '@/services/user.service'
import { IUser } from '@/types/auth.types'

export function findByName() {

	const { mutate: findFriends, isPending, data: friends } = useMutation<IUser[], Error, string>({
		mutationKey: ['find friend'],
		mutationFn: (name: string) => userService.findByName( name )
	})

	return { findFriends, isPending, friends }
}
