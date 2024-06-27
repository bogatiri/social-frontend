import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { TypeLikeFormState } from '@/types/like.types'


import { likeService } from '@/services/likes.service'

export function useCreateLike() {
	const queryClient = useQueryClient()

	const { mutate: createLike, isPending } = useMutation({
		mutationKey: ['create like'],
		mutationFn: (data: TypeLikeFormState) => likeService.create(data),
		onSuccess() {
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

	return { createLike }
}
