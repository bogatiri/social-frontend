import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'


import { userService } from '@/services/user.service'

export function useDeleteUser() {
	const queryClient = useQueryClient()

	const { mutate: deleteUser, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: string) => userService.deleteUser(id),
		onSuccess: data => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ['user'] }),
					toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		}
	})

	return { deleteUser, isDeletePending }
}
