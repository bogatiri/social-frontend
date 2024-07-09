import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'



import { chatService } from '@/services/chat.service'

export function useCreateChat() {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { mutate: createChat, isPending } = useMutation({
		mutationKey: ['create chat'],
		mutationFn: (recipientid: string) => chatService.getorCreateChat(recipientid),
		onSuccess() {
			toast.success(`Chat created`)
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			router.push('/i/chats')
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

	return { createChat }
}
