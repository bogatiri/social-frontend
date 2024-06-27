import { useQuery } from '@tanstack/react-query'

import { IPosts } from '@/types/post.types'

import { postService } from '@/services/post.service'

export function usePostById(postId: string) {
  const { data: posts, isLoading, error,   } = useQuery<IPosts[]>({
    queryKey: ['posts', postId], 
    queryFn: () => postService.findById(postId) 
  })
  return { posts, isLoading, error }
}
