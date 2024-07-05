'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import { IFriendRequests, IUser } from '@/types/auth.types'

import { useProfile } from '@/hooks/useProfile'

import Friends from './friends'
import { findByName } from './hooks/useFindByName'
import { useAcceptRequestToFriend } from './hooks/useAcceptRequest'

const SearchFriends = () => {
	const [name, setName] = useState('')
	const { data, isLoading, isSuccess } = useProfile()
	const [myFriends, setMyFriends] = useState<IUser | undefined>(data)

	const { findFriends, isPending, friends } = findByName()
	const {acceptRequest, isAdded} = useAcceptRequestToFriend()

	const handleSearch = () => {
		findFriends(name)
		setName('')
	}

	const handleAccept = (request: IFriendRequests) => {
		const idSender = request.senderId
		const requestId = request.id
		acceptRequest({idSender, requestId})
		setName('')
	}

	useEffect(() => {
		setMyFriends(data)
	}, [data])

	return (
		<div className='my-4 w-full  grid grid-cols-[1fr_0.6fr] gap-4'>
			<div className='relative w-1/2 ml-auto'>
				<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
				<Input
					type='search'
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='Search friends...'
					className='w-full rounded-lg bg-background pl-8'
					onKeyDown={e => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault()
							handleSearch()
						}
					}}
				/>
				<Button
					className='absolute right-0 top-0 border-l rounded-l-none'
					variant='outline'
					onClick={() => handleSearch()}
				>
					<Search />
				</Button>
				{myFriends && (friends == undefined || friends?.length === 0) && (
					<Friends data={myFriends} />
				)}
				{!(friends == undefined || friends?.length === 0) && (
					<div className='bg- rounded-lg p-3 mt-4 border border-input'>
						<span className='text-lg font-semibold ml-2'>Other people</span>
						<Separator />
						{friends?.map((friend, index) => (
							<div
								key={index}
								className='flex  justify-start mx-auto w-full mt-4 p-2 rounded-lg cursor-pointer hover:bg-muted'
							>
								<Link href={`/i/profile/${friend.id}`}>
									<div className='flex gap-4'>
										<Avatar className='size-16'>
											<AvatarImage
												src={friend.avatar}
												alt='@shadcn'
											/>
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										<span className='text-lg self-start mt-4'>
											{friend.name} {friend.lastName}
										</span>
									</div>
								</Link>
							</div>
						))}
					</div>
				)}
			</div>
			<div>

		
			<div className='flex flex-col items-center justify-between'>
				{data!.senderFriendRequest.length > 0 && (
					<span>SendedRequests</span>
				)}
				{data?.senderFriendRequest.map(request => (
					<div
						key={request.id}
						className='flex justify-between  items-center mx-auto w-1/2 mt-4 p-2 rounded-lg cursor-pointer hover:bg-muted'
					>
						<Link href={`/i/profile/${request.recipient.id}`}>
							<div className='flex gap-4'>
								<Avatar className='size-16'>
									<AvatarImage
										src={request.recipient.avatar}
										alt='@shadcn'
									/>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<span className='text-lg self-start mt-4'>
									{request.recipient.name} {request.recipient.lastName}
								</span>
							</div>
						</Link>

					</div>
				))}
			</div>
			<div className='flex flex-col mt-4 items-center justify-between'>
			{data!.friendRequests.length > 0 && (
					<span>Friend Request</span>
				)}
				{data?.friendRequests.map(request => (
					<div
						key={request.id}
						className='flex  justify-between items-center mx-auto w-1/2 border border-input mt-4 p-2 rounded-lg cursor-pointer'
					>
						<Link href={`/i/profile/${request.sender.id}`}>
							<div className='flex gap-4'>
								<Avatar className='size-16'>
									<AvatarImage
										src={request.sender.avatar}
										alt='@shadcn'
									/>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<span className='text-lg self-start mt-4'>
									{request.sender.name} {request.sender.lastName}
								</span>
							</div>
						</Link>
						<Button
						variant='outline'
						onClick={() => handleAccept(request)}
						>
							Accept Request
						</Button>
					</div>
				))}
			</div>
	</div>
		</div>
	)
}

export default SearchFriends
