import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeCommentFormState } from '@/types/comment.types'

import { commentService } from '@/services/comments.service'

export function useUpdateComment(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateComment } = useMutation({
		mutationKey: ['update comment', key],
		mutationFn: ({ id, data }: { id: string; data: TypeCommentFormState }) =>
			commentService.updateComment(id, data),
		onSuccess: data => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ['comment'] }),
					toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		}
	})

	return { updateComment }
}
