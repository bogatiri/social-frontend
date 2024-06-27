import { IBase } from './root.types'

export interface ILikes extends IBase{
	commentId?: string
	postId?: string
	userId?: string
}

export type TypeLikeFormState = Partial<Omit<ILikes, 'id' | 'createdAt' >>
