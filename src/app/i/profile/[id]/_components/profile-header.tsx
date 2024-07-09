'use client'

import { Info, MapPin } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { useUserId } from '../../hooks/user/useUserId'

import { useSendRequestToFriend } from '@/app/i/friends/hooks/useSendRequestToFriend'
import { useRejectRequest } from '@/app/i/friends/hooks/useRejectRequest'
import { IFriendRequests } from '@/types/auth.types'
import { useCreateChat } from '@/app/i/chats/hooks/useCreateChat'

const ProfileHeader = () => {
	const { user, isLoading, error } = useUserId()
	const [currentUser, setCurrentUser] = useState('')
	const [isMyFriend, setIsMyFriend] = useState(false)
	const [isRequestSended, setIsRequestSended] = useState<IFriendRequests | undefined>(undefined)
	const [my, setMy] = useState(false)


	useEffect(() => {
		const localUserId = localStorage.getItem('userId')
		setCurrentUser(localUserId ?? '')
	}, [])

	const pathname = usePathname()

	const userId = pathname.split('/')[3]
	useEffect(() => {
		if(user){
			const checkIsMyFriend = user?.friendships.filter(
				friendships => friendships.friendId  === currentUser
			)

			setIsMyFriend(checkIsMyFriend.length > 0 ? true: false)
		}
	}, [isLoading])

	const { sendRequest } = useSendRequestToFriend()

	const {createChat} = useCreateChat()

	const {rejectFriendRequest} = useRejectRequest()

		useEffect(() => {
			if (user && user?.friendRequests) {
				const isSended = user?.friendRequests.find((request) => currentUser === request.senderId)
				setIsRequestSended(isSended ?? undefined)
				const isMy = currentUser === user?.id.toString()
				setMy(isMy)
			}
	}, [user])


	return (
		<div className='grid grid-cols-[0.9fr_0.1fr] bg-gradient-to-r from-slate-500 to-stone-800 w-full h-64 md:h-56 rounded-lg p-4'>
			<div className='flex flex-col items-center md:flex-row gap-4'>
				<Avatar className='size-24 md:size-48'>
					<AvatarImage
						src={user?.avatar}
						alt='@shadcn'
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className='flex flex-col items-center md:mt-10 justify-end gap-2 p-4'>
					<span className='text-lg md:text-3xl font-bold font-mono self-center'>
						{user?.name} {user?.lastName}
					</span>
					<div className='flex flex-col md:flex-row self-start gap-3 md:gap-4'>
						<span className='flex gap-1 text-sm items-center hover:underline cursor-pointer'>
							<MapPin size={21} />
							Hometown
						</span>
						<span className='flex gap-1 text-sm items-center self-end hover:underline cursor-pointer'>
							<Info size={21} />
							More details
						</span>
					</div>
				</div>
			</div>
			<div className='flex items-start justify-end'>
				{isLoading ? (
					<Skeleton className='inline-flex items-center justify-center whitespace-nowrap rounded-md  font-medium' />
				) : my ? (
					<Link href={`${userId}/edit`}>
						<Button variant='default'>Edit Profile</Button>
					</Link>
				) : isMyFriend ? (
					<div className='flex flex-col gap-3'>
					<Button>Delete Friend</Button>
					<Button
					onClick={() => createChat(userId)}
					>
						Create chat
					</Button>
					</div>
				) : isRequestSended ? (
					<div className='flex flex-col gap-3'>
					<Button
					variant='outline'
					onClick={() => rejectFriendRequest(isRequestSended.id)}
					>
						Reject request
					</Button>
					<Button
					onClick={() => createChat(userId)}
					>
						Create chat
					</Button>
						</div>
				) 
				: (
					<div className='flex flex-col gap-3'>
					<Button onClick={() => sendRequest(userId)}>Add Friend</Button>
					<Button
					onClick={() => createChat(userId)}
					>
						Create chat
					</Button>
					</div>
					
				)}
			</div>
		</div>
	)
}

export default ProfileHeader
