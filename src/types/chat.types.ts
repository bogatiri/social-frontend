import { IUser } from './auth.types'
import { IMessageResponse } from './message.types'
import type { IBase } from './root.types'

export interface IChatMessages {
	[chatId: string]: IMessageResponse[]
}

export interface IChatResponse extends IBase {
	name: string
	cardId?: string
	boardId: string
	listId?: string
	userId: string
	users: IUser[]
	messages: IMessageResponse[]
}

export interface IChat {
	chatIds: string[]
	chats: IChatResponse[]
	messages: IChatMessages
}

export type TypeChatFormState = Partial<Omit<IChatResponse, 'id' | 'updatedAt'>>
