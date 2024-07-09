import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger
} from '@/components/ui/context-menu'
import User from '@/components/ui/items-options/user'

import { IMessageResponse } from '@/types/message.types'

import SocketApi from '@/api/socket-api'

import ChatMessage from './chat-message'

interface IChatMesageFormProps {
	message: IMessageResponse
}

const ChatMessageForm = ({ message }: IChatMesageFormProps) => {
	const currentUser = localStorage.getItem('userId')
	const [editingMessageId, setEditingMessageId] = useState('')
	const [textUpdatedMessage, setTextUpdatedMessage] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const deleteMessage = (id: string) => {
		SocketApi.socket?.emit('delete-message', { id })
	}

	const copyToClipboard = async (text: string) => {
		if (!navigator.clipboard) {
			toast.error('Clipboard API not available')
			return
		}
		try {
			await navigator.clipboard.writeText(text)
			toast.success('Text copied to clipboard')
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	const updateMessage = (id: string) => {
		SocketApi.socket?.emit('update-message', { id, textUpdatedMessage })
		setTextUpdatedMessage('')
		setEditingMessageId('')
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [editingMessageId, updateMessage])

	const handleClickOutside = (event: MouseEvent) => {
		if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
			updateMessage(editingMessageId)
		}
	}

	return (
		<div className='flex mb-1'>
			{message.userId !== currentUser && (
				<User userToAvatar={message.creator} />
			)}

			<div className='w-full flex flex-col'>


			{message.userId !== currentUser && (
				<div className='flex mb-1 mt-2 justify-start items-center '>
					{message.creator.name ? (
						<span className='font-bold text-xs font-mono'>
							{message.creator.name}
						</span>
					) : (
						<span className='font-bold text-xs font-mono'>
							{message.creator.email}
						</span>
					)}
				</div>
			)}
			<ContextMenu>
				<ContextMenuTrigger
					className={`rounded-b-xl px-4 max-w-xs ${message.userId === currentUser ? 'ml-auto rounded-tl-xl bg-blue-500/50 text-white' : 'mr-auto rounded-tr-xl bg-gray-600/40'} `}
				>
					<div>
						<ChatMessage
							updateMessage={updateMessage}
							message={message}
							editingMessageId={editingMessageId}
							textUpdatedMessage={textUpdatedMessage}
							setTextUpdatedMessage={setTextUpdatedMessage}
						/>
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent>
					{message.userId === currentUser && (
						<>
							<ContextMenuItem onClick={() => deleteMessage(message.id)}>
								Delete
							</ContextMenuItem>
							<ContextMenuItem
								onClick={() => {
									setEditingMessageId(message.id)
									setTextUpdatedMessage(message.text)
								}}
							>
								Edit
							</ContextMenuItem>
						</>
					)}
					<ContextMenuItem
						onClick={() => {
							copyToClipboard(message.text)
						}}
					>
						Copy
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			</div>
		</div>
	)
}

export default ChatMessageForm
