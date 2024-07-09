import { forwardRef } from 'react'

import { Input } from '@/components/ui/input'

import { IMessageResponse } from '@/types/message.types'

interface iChatMessageProps {
	updateMessage: (id: string) => void
	message: IMessageResponse
	editingMessageId: string
	textUpdatedMessage: string
	setTextUpdatedMessage: (value: string) => void
}

const ChatMessage = forwardRef<HTMLInputElement, iChatMessageProps>(
	(
		{
			editingMessageId,
			textUpdatedMessage,
			setTextUpdatedMessage,
			message,
			updateMessage
		},
		inputRef
	) => {
		const handleInputMessageEdited = (
			event: React.ChangeEvent<HTMLInputElement>
		) => {
			setTextUpdatedMessage(event.target.value)
		}

		const formatDate = (isoString: string) => {
			const date = new Date(isoString)
			date.setHours(date.getHours())
			return date.toLocaleTimeString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			})
		}

		const urlPattern = new RegExp(
			'^(https?:\\/\\/)' + 
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,6}|' + 
				'((\\d{1,3}\\.){3}\\d{1,3}))' + 
				'(\\:\\d+)?' + 
				'(\\/[-a-z\\d%_.~+]*)*' + 
				'(\\?[;&a-z\\d%_.~+=-]*)?' + 
				'(\\#[-a-z\\d_]*)?$', 
			'i'
		)

		const isUrl = (textMessage: string) => {
			return urlPattern.test(textMessage)
		}

		return (
			<div className='flex isolate justify-between gap-2 mt-2'>
				{editingMessageId === message.id ? (
					<Input
						ref={inputRef}
						type='text'
						value={textUpdatedMessage}
						onChange={handleInputMessageEdited}
						className='bg-blue-500 w-auto h-6 px-0 py-0 text-white border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-none underline break-all max-w-[200px] text-sm'
						onKeyDown={e => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault()
								updateMessage(message.id)
							}
						}}
						onBlur={() => updateMessage(message.id)}
					/>
				) : isUrl(message.text) ? (
					<a
						href={message.text}
						target='_blank'
						rel='noopener noreferrer'
						className='text-black underline break-all max-w-[200px] text-xs'
					>
						{message.text}
					</a>
				) : (
					<span
						lang='ru'
						className='block break-words hyphens-manual max-w-[250px] text-sm'
					>
						{message.text}
					</span>
				)}
				<div className='flex gap-1 mb-1 mt-2'>
					{message.createdAt !== message.updatedAt &&
						editingMessageId !== message.id && (
							<span className='block text-xs font-mono text-right text-gray-300/80 self-end'>
								edited
							</span>
						)}
					<span className='block text-xs text-right text-gray-300/50  self-end'>
						{formatDate(message.createdAt)}
					</span>
				</div>
			</div>
		)
	}
)

export default ChatMessage
