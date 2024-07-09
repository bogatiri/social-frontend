'use client'

import {
	Book,
	Bot,
	Code2,
	LifeBuoy,
	LogOut,
	Settings2,
	SquareTerminal,
	SquareUser,
	Triangle,
	Users
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { useEffect, useState } from 'react'

const Sidebar = () => {

	const [currentUser, setCurrentUser] = useState('')
	const pathname = usePathname()
	
	
	useEffect(() => {
		const localUserId = localStorage.getItem('userId')
		setCurrentUser(localUserId ?? '')
	}, [])

	const currentPage = pathname.split('/')[2]

	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			router.push('/auth')
			localStorage.clear()
}})

	return (
		<TooltipProvider>
			<aside className='inset-y fixed left-0 z-20 flex h-full flex-col border-r border-input'>
				<div className='border-b border-input p-2'>
					<Button
						variant='outline'
						size='icon'
						aria-label='Home'
					>
						<Triangle className='size-5 fill-foreground' />
					</Button>
				</div>
				<nav className='grid gap-1 p-2'>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
							href={`/i/profile/${currentUser}`}>
							<Button
								variant='ghost'
								size='icon'
								className={`mt-auto rounded-lg ${currentPage === 'profile' && 'bg-muted'}`}
								aria-label='Account'
							>
								<SquareUser className='size-5' />
							</Button>
							</Link>
						</TooltipTrigger>
						<TooltipContent
							side='right'
							sideOffset={5}
						>
							Account
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
							href='/i/chats'
							>
							<Button
								variant='ghost'
								size='icon'
								className={`rounded-lg ${currentPage === undefined && 'bg-muted'}`}
								aria-label='Chats'
							>
								<SquareTerminal className='size-5' />
							</Button>
								</Link>
						</TooltipTrigger>
						<TooltipContent
							side='right'
							sideOffset={5}
						>
							Chats
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Link
							href='/i/friends'
							>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-lg'
								aria-label='Friends'
							>
								<Users className='size-5' />
							</Button>
								</Link>
						</TooltipTrigger>
						<TooltipContent
							side='right'
							sideOffset={5}
						>
							Friends
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-lg'
								aria-label='API'
							>
								<Code2 className='size-5' />
							</Button>
						</TooltipTrigger>
						<TooltipContent
							side='right'
							sideOffset={5}
						>
							API
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-lg'
								aria-label='Documentation'
							>
								<Book className='size-5' />
							</Button>
						</TooltipTrigger>
						<TooltipContent
							side='right'
							sideOffset={5}
						>
							Documentation
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-lg'
								aria-label='Settings'
							>
								<Settings2 className='size-5' />
							</Button>
						</TooltipTrigger>
						<TooltipContent
							side='right'
							sideOffset={5}
						>
							Settings
						</TooltipContent>
					</Tooltip>
				</nav>
				<nav className='mt-auto grid gap-1 p-2'>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='mt-auto rounded-lg'
								aria-label='Help'
							>
								<LifeBuoy className='size-5' />
							</Button>
						</TooltipTrigger>
						<TooltipContent
							side='right'
							sideOffset={5}
						>
							Help
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='mt-auto rounded-lg'
								aria-label='Help'
								onClick={() => mutate()}
							>
								<LogOut className='size-5' />
							</Button>
						</TooltipTrigger>
						<TooltipContent
							side='right'
							sideOffset={5}
						>
							Logout
						</TooltipContent>
					</Tooltip>
				</nav>
			</aside>
		</TooltipProvider>
	)
}

export default Sidebar
