import type { IChat, IChatResponse, TypeChatFormState } from '@/types/chat.types'

import { axiosWithAuth } from '@/api/interceptors'

class ChatService {
	private BASE_URL = 'chats'

	async getAllChats() {
		const response = await axiosWithAuth.get<IChat>(this.BASE_URL)
		return response.data
	}

	async getorCreateChat(recipientId: string) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/get-or-create`, {recipientId})
		return response
	}

	async getChatById(id: string) {
    const response = await axiosWithAuth.get<IChatResponse>(`${this.BASE_URL}/${id}`)
    return response.data
  }

	async updateChat(id: string, data: TypeChatFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteChat(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const chatService = new ChatService()
