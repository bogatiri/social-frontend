import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypePostFormState } from '@/types/post.types'

import { postService } from '@/services/post.service'

export function useUpdatePost(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updatePost } = useMutation({
		mutationKey: ['update post', key],
		mutationFn: ({ id, data }: { id: string; data: TypePostFormState }) =>
			postService.updatePost(id, data),
		onSuccess: data => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ['post'] }),
					toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		}
	})

	return { updatePost }
}
