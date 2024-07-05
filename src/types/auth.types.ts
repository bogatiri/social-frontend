import { IPosts } from './post.types'
import { IBase } from './root.types'

export enum FamilyStatus {
  notMarried= 'notMarried',
  Married ='Married',
  Dating ='Dating',
  InLove = 'InLove',
  ActivelyLooking = 'ActivelyLooking',
}

export enum RequestStatus {
  pending= 'notMarried',
  accepted ='accepted',
  reject ='rejected',
}

export interface IFriendships{
	id: string
	friendId: string
	userId: string
	friend: IUser
}
export interface IFriendRequests{
	id: string
	recipientId: string
	senderId: string
	status: RequestStatus
	sender: IUser
	recipient: IUser
}

export interface IAuthForm {
	email: string
	password: string
	name: string
	lastName: string
	code: string,
	accessToken: string
}

export interface IUser extends IBase {
	name?: string
	about?: string
	email?: string
	lastName?:string
	avatar?: string
	lastSeen?: Date
	homeTown?: string
	friendRequests: IFriendRequests[]
	senderFriendRequest: IFriendRequests[]
	friendships: IFriendships[]
	familyStatus?: FamilyStatus
	posts: IPosts[]
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export interface IUserResponse extends IBase{
	email?: string
  name?: string
	about?: string
	lastName?: string
  avatar?: string   
  lastSeen?: Date
  familyStatus?: FamilyStatus
  homeTown?: string
}


export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
export type TypeUserUpdateForm = Omit<IUserResponse, 'id'> & { password?: string }
export type TypeUserFormState = Partial<IUser>

