import { IUser } from './auth.types'
import { ILikes } from './like.types'
import { IBase } from './root.types'


export interface IComment extends IBase{
	text: string
	creator: IUser,
	likes: ILikes[]
	postId: string
}

export type TypeCommentFormState = Partial<Omit<IComment, 'id' | 'creator' | 'likes'>>
