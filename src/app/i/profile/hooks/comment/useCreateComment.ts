import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { TypeCommentFormState } from '@/types/comment.types'


import { commentService } from '@/services/comments.service'

export function useCreateComment() {
	const queryClient = useQueryClient()

	const { mutate: createComment, isPending } = useMutation({
		mutationKey: ['create comment'],
		mutationFn: (data: TypeCommentFormState) => commentService.create(data),
		onSuccess() {
			toast.success(`Comment created`)
			queryClient.invalidateQueries({ queryKey: ['posts'] })
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

	return { createComment }
}
