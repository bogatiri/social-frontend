import { usePathname } from 'next/navigation'

import { usePostById } from './usePosts'

export const usePostId = () => {
	const pathname = usePathname()
	const id = pathname.split('/')[3]
	const { posts, isLoading, error } = usePostById(id)
	return { posts, isLoading, error }
}
