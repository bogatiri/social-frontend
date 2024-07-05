import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'



import { userService } from '@/services/user.service'

export function useSendRequestToFriend() {
	const queryClient = useQueryClient()

	const { mutate: sendRequest, isPending,  } = useMutation({
		mutationKey: ['create user'],
		mutationFn: (idRecipient: string) => userService.sendRequestToFriends(idRecipient),
		onSuccess: data => {
			toast.success(`Request was sended`)
			queryClient.invalidateQueries({ queryKey: ['user', data[0].recipientId] })
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

	return { sendRequest }
}
