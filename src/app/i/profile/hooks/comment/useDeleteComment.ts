import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'


import { commentService } from '@/services/comments.service'

export function useDeleteComment() {
	const queryClient = useQueryClient()

	const { mutate: deleteComment, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete comment'],
		mutationFn: (id: string) => commentService.deleteComment(id),
		onSuccess: data => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ['posts'] }),
					toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		}
	})

	return { deleteComment, isDeletePending }
}
