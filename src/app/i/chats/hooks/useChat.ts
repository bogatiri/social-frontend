import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IChatResponse } from '@/types/chat.types'

import { chatService } from '@/services/chat.service'

export function useChats() {
	const { data: chats, isPending } = useQuery({
		queryKey: ['chats'],
		queryFn: () => chatService.getAllChats()
	})

	return { chats, isPending }
}



export function useChatById(chatId: string) {
  const { data: chat, isLoading, error,   } = useQuery<IChatResponse>({
    queryKey: ['chat', chatId], 
    queryFn: () => chatService.getChatById(chatId) 
  })

  return { chat, isLoading, error }
}
