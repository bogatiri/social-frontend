'use client'

import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

import { usePostId } from '../../hooks/post/usePostId'

import Post from './post'

const Posts = () => {
	const { posts, isLoading, error } = usePostId()

	if (isLoading) {
		return (
			<>
			{Array.from({ length: 3 }).map((_, index) => (
				<div
				key={index}
				className='flex mb-4 flex-col border border-border rounded-lg h-auto p-3 gap-3'>
				<div className='flex gap-3 justify-between'>
					<div className='flex gap-3'>
						<Skeleton className='h-12 w-12 rounded-full' />
						<div className='flex flex-col gap-1'>
							<span className='font-bold font-mono self-center'>
								<Skeleton className='h-4 w-[250px]' />
							</span>
							<span className='flex gap-1 text-sm items-center hover:underline cursor-pointer'>
								<Skeleton className='h-4 w-[250px]' />
							</span>
						</div>
					</div>
					<div>
						<Skeleton className='hover:bg-accent hover:text-accent-foreground h-6 w-6 rounded-lg p-1 cursor-pointer' />
					</div>
				</div>
				<div>
					<Skeleton className='h-14 w-full' />
				</div>
				<div className='flex gap-3'>
					<Skeleton
						className={`w-14 flex gap-1 bg-accent/70 hover:bg-accent/100 rounded-3xl p-1 justify-center cursor-pointer transition $`}
					></Skeleton>
					<Skeleton className='w-14 h-8 flex gap-1 bg-accent/70 hover:bg-accent/100 rounded-3xl p-1 justify-center cursor-pointer transition'></Skeleton>
					<Skeleton className='w-14 flex gap-1 bg-accent/70 hover:bg-accent/100 rounded-3xl p-1 justify-center cursor-pointer transition'></Skeleton>
				</div>
				<Separator />
			</div>
			))}
	</>
			
		)
	}

	return posts?.map((post, index) => (
		<Post
			key={index}
			post={post}
		/>
	))
}

export default Posts
