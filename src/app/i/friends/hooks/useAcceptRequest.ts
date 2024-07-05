import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'



import { userService } from '@/services/user.service'

export function useAcceptRequestToFriend() {
	const queryClient = useQueryClient()

	const { mutate: acceptRequest, isPending, isSuccess: isAdded  } = useMutation({
		mutationKey: ['create user'],
		mutationFn: ({idSender, requestId} : {idSender: string, requestId: string}) => userService.acceptFriendRequest(idSender, requestId),
		onSuccess: data => {
			toast.success(`You are friends now :)`)
			queryClient.invalidateQueries({ queryKey: ['profile'] })
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

	return { acceptRequest, isAdded }
}
