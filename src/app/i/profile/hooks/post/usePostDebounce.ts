import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TypePostFormState } from '@/types/post.types'

import { useCreatePost } from './useCreatePost'
import { useUpdatePost } from './useUpdatePost'

interface IUsePostDebounce {
	watch: UseFormWatch<TypePostFormState>
	postId: string
}

export function usePostDebounce({ watch, postId }: IUsePostDebounce) {
	const { createPost } = useCreatePost()
	const { updatePost } = useUpdatePost()

	const debouncedCreatePost = useCallback(
		debounce((formData: TypePostFormState) => {
			createPost(formData)
		}, 444),
		[]
	)

	// Теперь debouncedUpdatePost будет сохраняться между рендерами, и debounce будет работать как ожидается.
	const debouncedUpdatePost = useCallback(
		debounce((formData: TypePostFormState) => {
			updatePost({ id: postId, data: formData })
		}, 700),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (postId) {
				debouncedUpdatePost({
					...formData,
				})
			} else {

			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdatePost, debouncedCreatePost])
}
