import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypeCommentFormState } from '@/types/comment.types'

import { useCreateComment } from './useCreateComment'
import { useUpdateComment } from './useUpdateComment'

interface IUseCommentDebounce {
	watch: UseFormWatch<TypeCommentFormState>
	commentId: string
}

export function useCommentDebounce({ watch, commentId }: IUseCommentDebounce) {
	const { createComment } = useCreateComment()
	const { updateComment } = useUpdateComment()

	const debouncedCreateComment = useCallback(
		debounce((formData: TypeCommentFormState) => {
			createComment(formData)
		}, 444),
		[]
	)

	// Теперь debouncedUpdateComment будет сохраняться между рендерами, и debounce будет работать как ожидается.
	const debouncedUpdateComment = useCallback(
		debounce((formData: TypeCommentFormState) => {
			updateComment({ id: commentId, data: formData })
		}, 700),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (commentId) {
				debouncedUpdateComment({
					...formData,
				})
			} else {

			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateComment, debouncedCreateComment])
}
