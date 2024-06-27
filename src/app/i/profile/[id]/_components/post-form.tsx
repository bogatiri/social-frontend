'use client'

import { Plus, X } from 'lucide-react'
import { ElementRef, useRef, useState } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'

import { PostWrapper } from './post-wrapper'
import { useCreatePost } from '../../hooks/post/useCreatePost'
import { usePathname } from 'next/navigation'
import { useCreateComment } from '../../hooks/comment/useCreateComment'

interface IPostForm{
	groupId?: string
	postId?: string
}


const PostForm = ({groupId, postId}: IPostForm) => {
	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const [isEditing, setIsEditing] = useState(false)

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
		}
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef, disableEditing)
	const { createPost } = useCreatePost()
	const { createComment } = useCreateComment()

	const pathname = usePathname()
	const pageOwnerId = pathname.split('/')[3]

	const onSubmit = (formData: FormData) => {
		const text = formData.get('text') as string
		postId ?
		createComment({
			text,
			postId
		}) :
		groupId
			? createPost({
					text,
					groupId
				})
			: createPost({
					text,
					pageOwnerId
				})
		disableEditing()
	}

	if (isEditing) {
		return (
			<PostWrapper>
				<form
					action={onSubmit}
					ref={formRef}
					className={`w-full p-3 rounded-lg mt-2 bg-primary-foreground/70 space-y-4 shadow-md mr-20 ${postId && 'bg-transparent'}`}
				>
					<FormInput
						ref={inputRef}
						id='text'
						className='text-sm px-2 py-1 h-12 font-medium border-transparent hover:border-none focus:border-none transition'
						placeholder='Anything new?'
					/>
					<input
						hidden
						name='post'
					/>
					<div className='flex items-center gap-x-1'>
						<FormSubmit>Add {postId ? 'comment' : 'post'}</FormSubmit>
							<X
							onClick={disableEditing}
							className='h-7 w-7 cursor-pointer text-primary hover:bg-primary-foreground/100 rounded-lg p-1' />
					</div>
				</form>
			</PostWrapper>
		)
	}

	return (
		<PostWrapper>
			<button
				onClick={enableEditing}
				className={`w-full h-full rounded-lg bg-primary/70 hover:bg-primary/100 transition-opacity p-3 text-primary-foreground  flex items-center font-medium text-sm mr-20z ${postId && 'bg-primary/20 text-card hover:bg-primary/50 '}`}
			>
				<Plus className='h-4 w-4 mr-2' />
				Add a new {postId ? 'comment' : 'post'}
			</button>
		</PostWrapper>
	)
}

export default PostForm
