import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { TypePostFormState } from '@/types/post.types'


import { postService } from '@/services/post.service'

export function useCreatePost() {
	const queryClient = useQueryClient()

	const { mutate: createPost, isPending } = useMutation({
		mutationKey: ['create post'],
		mutationFn: (data: TypePostFormState) => postService.create(data),
		onSuccess() {
			toast.success(`Post created`)
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

	return { createPost }
}
