import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeUserUpdateForm } from '@/types/auth.types'

import { userService } from '@/services/user.service'

export function useUpdateUser(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateUser, isPending } = useMutation({
		mutationKey: ['update user', key],
		mutationFn: (data: TypeUserUpdateForm ) =>
			userService.update(data),
		onSuccess: data => {

				queryClient.invalidateQueries({ queryKey: ['user'] }),
					toast.success('User updated successfully')
			
				toast.error(data.message)
			
		}
	})

	return { updateUser, isPending }
}
