'use client'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

import { IUser } from '@/types/auth.types'

interface IFriendsProps {
	data: IUser
}

const Friends = ({ data }: IFriendsProps) => {

	return (
		<div className='flex flex-col gap-4 mt-4'>
			<div className='bg- rounded-lg p-3 mt-4 border border-input'>
				{data.friendships.length > 0 ? (
					<>
						<span className='text-lg font-semibold ml-2'>My friends</span>
						<Separator />
					</>
				) : (
					<span className='text-lg font-semibold ml-2'>No Friends</span>
				)}
				{data?.friendships.map((friend, index) => (
					<div
						key={index}
						className='flex  justify-start mx-auto w-full mt-4 p-2 rounded-lg cursor-pointer hover:bg-muted'
					>
						<Link href={`/i/profile/${friend.friend.id}`}>
							<div className='flex gap-4'>
								<Avatar className='size-16'>
									<AvatarImage
										src={friend.friend.avatar}
										alt='@shadcn'
									/>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<span className='text-lg self-start mt-4'>
									{friend.friend.name} {friend.friend.lastName}
								</span>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

export default Friends
