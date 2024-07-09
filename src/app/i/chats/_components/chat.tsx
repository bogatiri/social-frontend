'use client'

import { useChats } from '../hooks/useChat'

import Govno from './chat-list'

const Chat = () => {
	const { chats, isPending } = useChats()

	return <>{!isPending && chats && <Govno chats={chats} />}</>
}

export default Chat
