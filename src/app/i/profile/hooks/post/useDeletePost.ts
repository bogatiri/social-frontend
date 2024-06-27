import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'


import { postService } from '@/services/post.service'

export function useDeletePost() {
	const queryClient = useQueryClient()

	const { mutate: deletePost, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete post'],
		mutationFn: (id: string) => postService.deletePost(id),
		onSuccess: data => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ['post'] }),
					toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		}
	})

	return { deletePost, isDeletePending }
}
