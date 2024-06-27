import { IUser } from './auth.types'
import { IComment } from './comment.types'
import { ILikes } from './like.types'
import { IBase } from './root.types'

export enum PostStatus{
	current= 'current',
  archived ='archived',
}

export interface IPosts extends IBase{
	text: string
	creator: IUser,
	status?: PostStatus
	comments: IComment[]
	groupId?: string
	pageOwner?: IUser,
	likes: ILikes[]
	pageOwnerId?: string
}

export type TypePostFormState = Partial<Omit<IPosts, 'id' | 'creator' | 'pageOwner' | 'likes'| 'comments'>>
