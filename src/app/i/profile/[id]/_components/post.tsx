import { Heart, MessageSquare, MoreHorizontal, Reply } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

import { IPosts } from '@/types/post.types'

import { formatDate } from '../../hooks/formatDate'
import { useCreateLike } from '../../hooks/likes/useCreateLike'
import { useDeleteLike } from '../../hooks/likes/useDeleteLike'

import Comment from './comment'
import PostForm from './post-form'

interface IPostProps {
	post: IPosts
}

const Post = ({ post }: IPostProps) => {
	const [currentUser, setCurrentUser] = useState('')
	useEffect(() => {
		const localUserId = localStorage.getItem('userId')
		setCurrentUser(localUserId ?? '')
	}, [])

	const { createLike } = useCreateLike()
	const { deleteLike } = useDeleteLike()

	const myLikeId = post.likes.find(like => like.userId === currentUser)

	return (
		<div className='flex mb-4 flex-col border border-border rounded-lg h-auto p-3 gap-3'>
			<div className='flex gap-3 justify-between'>
				<div className='flex gap-3'>
					<Avatar className='size-12'>
						<AvatarImage
							src='https://github.com/shadcn.png'
							alt='@shadcn'
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className='flex flex-col gap-1'>
						<span className='font-bold font-mono self-center'>
							{/* {post.creator.name?}{' '}{post.creator?.lastName} */}
						</span>
						<span className='flex gap-1 text-sm items-center hover:underline cursor-pointer'>
							{formatDate(post.createdAt)}
						</span>
					</div>
				</div>
				<div>
					<MoreHorizontal className='hover:bg-accent hover:text-accent-foreground h-6 w-6 rounded-lg p-1 cursor-pointer' />
				</div>
			</div>
			<div>
				<p>{post.text}</p>
			</div>
			<div className='flex gap-3'>
				<div
					className={`w-14 flex gap-1 bg-accent/70 hover:bg-accent/100 rounded-3xl p-1 justify-center cursor-pointer transition ${myLikeId && 'bg-red-500/20 text-red-500 hover:text-red-500 hover:bg-red-500/40'}`}
					onClick={
						myLikeId
							? () => deleteLike(myLikeId.id)
							: () => createLike({ postId: post.id })
					}
				>
					<Heart />
					{post.likes.length > 0 && (
						<span className='select-none'>{post.likes.length}</span>
					)}
				</div>
				<div className='w-14 flex gap-1 bg-accent/70 hover:bg-accent/100 rounded-3xl p-1 justify-center cursor-pointer transition'>
					<MessageSquare />
					{post.comments.length > 0 && (
						<span className='select-none'>{post.comments.length}</span>
					)}
				</div>
				<div className='w-14 flex gap-1 bg-accent/70 hover:bg-accent/100 rounded-3xl p-1 justify-center cursor-pointer transition'>
					<Reply />
				</div>
			</div>
			<Separator />
			<div>
				{post.comments.map((comment, index) => (
					<Comment
						key={index}
						currentUser={currentUser}
						comment={comment}
					/>
				))}
				<PostForm postId={post.id} />
			</div>
		</div>
	)
}

export default Post
