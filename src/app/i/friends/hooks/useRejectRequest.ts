import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'



import { userService } from '@/services/user.service'

export function useRejectRequest() {
	const queryClient = useQueryClient()

	const { mutate: rejectFriendRequest, isPending,  } = useMutation({
		mutationKey: ['create user'],
		mutationFn: (idRecipient: string) => userService.rejectFriendRequest(idRecipient),
		onSuccess: data => {
			toast.success(`Request was deleted`)
			queryClient.invalidateQueries({ queryKey: ['user', data.recipientId] })
		},
		onError(error: unknown) {
			if (isAxiosError(error)) {
				const message = error.response?.data?.message || 'An error occurred'
				toast.error(message)
			} else {
				toast.error('An error occurred')
			}
		}
	})

	return { rejectFriendRequest }
}
