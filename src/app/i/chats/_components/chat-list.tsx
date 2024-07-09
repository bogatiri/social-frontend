'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TooltipProvider } from '@/components/ui/tooltip'

import { IChat, IChatResponse } from '@/types/chat.types'
import { IMessageResponse } from '@/types/message.types'

import { useSocketConnect } from '@/hooks/useConnectSocket'

import ChatForm from './chat-form'

interface IChatListProps {
	chats: IChat
}

const ChatList = ({ chats }: IChatListProps) => {
	const [name, setName] = useState('')
	const { messages: socketMessages } = useSocketConnect(
		chats?.chatIds,
		chats?.messages
	)

	const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

	const selectedChat = chats.chats?.find(chat => chat.id === selectedChatId)

	const handleChatClick = (chatId: string) => {
		setSelectedChatId(chatId)
	}

	const currentUser = localStorage.getItem('userId')

	const isMyMessage = (messages: IMessageResponse[]) => {
		let last = '*Chat is empty*'
		if (messages.length > 0 && messages) {
			if (messages.at(-1)?.creator.id === currentUser) {
				last = 'You:'
			} else {
				last = `${messages.at(-1)?.creator.name}:`
			}
			if (last === undefined) {
				last = ''
			}
		}
		return last
	}

	const lastMessage = (messages: IMessageResponse[]) => {
		let last
		if (messages !== undefined) {
			last = messages.at(-1)?.text
			if (last === undefined) {
				last = ''
			}
		}
		return last
	}

	const chatMember = (chats: IChatResponse) => {
		let member = 'asd'
		console.log(chats)
		let amember = chats.users.find(user => user.id !== currentUser)
		member = `${amember?.name}  ${amember?.lastName ? amember?.lastName : ''}`
		return member
	}

	const handleSearch = () => {
		setName('')
	}

	return (
		<>
			<TooltipProvider>
				<div className='hidden overflow-auto h-[90vh] border rounded-lg border-input flex-col items-start md:flex'>
					<div className='relative w-full ml-auto'>
						<Search className='absolute left-2.5 top-3 h-4 w-4 text-muted-foreground ' />
						<Input
							type='search'
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='Search message...'
							className='w-full border-t-0 border-l-0 border-b rounded-lg rounded-b-none bg-background pl-8 focus-visible:border-none'
							onKeyDown={e => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault()
									handleSearch()
								}
							}}
						/>
						<Button
							className='absolute right-0 top-0 border-0 border-l rounded-l-none border-b rounded-br-none'
							variant='outline'
							onClick={() => handleSearch()}
						>
							<Search className='h-5 w-5' />
						</Button>
					</div>
					<ul className='w-full flex-grow overflow-auto custom-scrollbar'>
						{socketMessages &&
							Object.entries(socketMessages).map(
								([chatId, messages], index) => (
									<li
										key={index}
										onClick={() => handleChatClick(chatId)}
										className='flex w-full pl-2 cursor-pointer hover:bg-muted'
									>
										<div className='py-2'>
											<Avatar className='size-10'>
												<AvatarImage
													src='https://github.com/shadcn.png'
													alt='@shadcn'
												/>
												<AvatarFallback>CN</AvatarFallback>
											</Avatar>
										</div>
										<div className='border-b border-input ml-2 w-full'>
											<div>
												<span className='text-xs self-center'>
													{chatMember(chats.chats[index])}
												</span>
											</div>
											<div className=''>
												<span className='text-xs font-thin opacity-80'>
													<span className='opacity-60'>
														{isMyMessage(messages)}{' '}
													</span>
													{lastMessage(messages)}
												</span>
											</div>
										</div>
									</li>
								)
							)}
					</ul>
					<div className='py-2 flex justify-center items-center w-full border-t border-input'>
						<span className='text-xs opacity-60 font-thin'>
							All chats showed
						</span>
					</div>
				</div>
				{socketMessages && selectedChat ? (
					<ChatForm
						chatId={selectedChat.id}
						socketMessages={socketMessages || []}
					/>
				) : (
					<p>Select a chat to view messages</p>
				)}
			</TooltipProvider>
		</>
	)
}

export default ChatList
