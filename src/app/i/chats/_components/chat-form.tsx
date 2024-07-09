import { Mic, Paperclip, SendHorizonal } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { IMessageResponse } from '@/types/message.types'

import SocketApi from '@/api/socket-api'

import { Button } from '../../../../components/ui/button'
import { Label } from '../../../../components/ui/label'
import { Textarea } from '../../../../components/ui/textarea'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '../../../../components/ui/tooltip'

import ChatMessageForm from './chat-message-form'

interface IChatMessages {
	[chatId: string]: IMessageResponse[]
}

interface ChatComponentProps {
	chatId: string
	socketMessages: IChatMessages
}

const ChatForm = ({ chatId, socketMessages }: ChatComponentProps) => {
	const [text, setText] = useState('')
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const sendMessage = () => {
		console.log('sendMessage called');
		if (text.length > 0) {
			SocketApi.socket?.emit('send-message', { text, chatId })
			setText('')
			setTimeout(() => {
				if (messagesEndRef.current) {
					messagesEndRef.current.scrollIntoView({
						behavior: 'smooth',
						block: 'end',
						inline: 'nearest'
					})
				}
			}, 100)
			console.log('Message sent');
		} else {
			toast.warning('Text of message must be more than 0 symbols')
		}
	}

	return (
		<div className='relative flex h-full min-h-[50vh] max-h-[90vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2'>
			<div className='flex-1 max-h-[75vh] border border-input rounded-t-lg overflow-auto custom-scrollbar'>
				<h2 className='text-lg font-bold mb-4'></h2>
				<ul>
					{socketMessages[chatId] &&
						socketMessages[chatId].map((message, index) => (
							<ChatMessageForm
								message={message}
								key={index}
							/>
						))}
					<div ref={messagesEndRef}></div>
				</ul>
			</div>
			<form
				className='relative overflow-hidden py-2 rounded-b-lg border bg-background border-input border-t-0'
				onSubmit={(e) => {
					e.preventDefault();
					sendMessage();
				}}
			>
				<Label
					htmlFor='message'
					className='sr-only'
				>
					Message
				</Label>
				<div className='flex items-center w-full gap-2 relative'>
					<Textarea
						maxLength={500}
						value={text}
						onChange={e => {
							console.log('Text changed:', e.currentTarget.value);
							setText(e.currentTarget.value);
						}}
						className='resize-none custom-scrollbar border-none focus-visible:ring-offset-0 focus-visible:ring-0'
						onKeyDown={e => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault();
								sendMessage();
							}
						}}
					/>
					<Button
						type='submit'
						size='sm'
						variant='outline'
						className='ml-auto mr-3 gap-1.5'
					>	
						<SendHorizonal className='size-3.5' />
					</Button>
					<span className='absolute -bottom-2 right-2 mr-2 mb-2 text-xs text-gray-600'>
						{text.length} / 500
					</span>
				</div>
			</form>
		</div>
	)
}

export default ChatForm
