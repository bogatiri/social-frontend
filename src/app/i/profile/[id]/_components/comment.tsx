import { Heart, Trash } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

import { IComment } from '@/types/comment.types'

import { useDeleteComment } from '../../hooks/comment/useDeleteComment'
import { formatDate } from '../../hooks/formatDate'
import { useCreateLike } from '../../hooks/likes/useCreateLike'
import { useDeleteLike } from '../../hooks/likes/useDeleteLike'

interface ICommentProps {
	comment: IComment
	currentUser: string
}

const Comment = ({ comment, currentUser }: ICommentProps) => {
	const myLikeId = comment.likes.find(like => like.userId === currentUser)

	const { createLike } = useCreateLike()
	const { deleteLike } = useDeleteLike()
	const { deleteComment } = useDeleteComment()

	return (
		<>
			<div className='flex gap-3 w-full items-center mx-2'>
				<Avatar className='size-12 mb-5'>
					<AvatarImage
						src='https://github.com/shadcn.png'
						alt='@shadcn'
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className='flex flex-col gap-1 w-full'>
					<div className='flex justify-between mt-2'>
						<span className='font-bold text-blue-700 font-mono self-start'>
							{/* {post.creator.name}{' '}{post.creator?.lastName} */}
							Alexey Rochev
						</span>
						<div className='p-1'>

						<Trash
							className=' size-4 opacity-50 hover:opacity-100 cursor-pointer'
							onClick={() => deleteComment(comment.id)}
							/>
							</div>
					</div>
					<p>{comment.text}</p>
					<div className='flex justify-between mb-1'>
						<span className='flex gap-1 text-xs items-center hover:underline cursor-pointer'>
							{formatDate(comment.createdAt)}
						</span>
						<div
							className={` flex gap-1  text-xs hover:bg-accent/100 rounded-3xl p-1  justify-center cursor-pointer transition ${myLikeId && 'bg-red-500/20 text-red-500 hover:text-red-500 hover:bg-red-500/40'}`}
							onClick={
								myLikeId
									? () => deleteLike(myLikeId.id)
									: () => createLike({ commentId: comment.id })
							}
						>
							<Heart className='size-4' />
							{comment.likes.length > 0 && (
								<span className='select-none'>{comment.likes?.length}</span>
							)}
						</div>
					</div>
					<Separator />
				</div>
			</div>
		</>
	)
}

export default Comment
