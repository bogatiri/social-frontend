import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { IUser } from '@/types/auth.types'

interface IUserProps {
	userToAvatar: IUser
	user?: IUser
}

const UserAvatar = ({ userToAvatar, user }: IUserProps) => {
	return (
		<>
			{userToAvatar.avatar ? (
				<Avatar className='h-8 w-8 border border-border'>
					<AvatarImage src={userToAvatar.avatar}></AvatarImage>
				</Avatar>
			) : (
				<Avatar className='h-8 w-8 border border-border'>
					<AvatarFallback>
						{userToAvatar.name
							? userToAvatar.name.charAt(0).toUpperCase()
							: userToAvatar.email?.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			)}
			{user?.name ? (
				<p className='font-semibold  text-white text-sm'>{user?.name}</p>
			) : (
				<p className='font-semibold text-sm text-white'>{user?.email}</p>
			)}
		</>
	)
}

export default UserAvatar
