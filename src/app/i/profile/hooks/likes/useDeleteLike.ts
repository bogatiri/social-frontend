import { useMutation, useQueryClient } from '@tanstack/react-query'

import { likeService } from '@/services/likes.service'

export function useDeleteLike() {
	const queryClient = useQueryClient()

	const { mutate: deleteLike, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete like'],
		mutationFn: (id: string) => likeService.deleteLike(id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
		}
	})

	return { deleteLike, isDeletePending }
}
