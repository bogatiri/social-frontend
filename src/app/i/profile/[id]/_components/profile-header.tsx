'use client'

import { Info, MapPin, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'


const ProfileHeader = () => {

	const pathname = usePathname()

	const userId = pathname.split('/')[3]

	return (
		<div className='grid grid-cols-[0.9fr_0.1fr] bg-gradient-to-r from-slate-500 to-stone-800 w-full h-64 md:h-56 rounded-lg p-4'>
		<div className='flex flex-col items-center md:flex-row gap-4'>
			<Avatar className='size-24 md:size-48'>
				<AvatarImage
					src='https://github.com/shadcn.png'
					alt='@shadcn'
				/>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div className='flex flex-col items-center md:mt-10 justify-end gap-2 p-4'>
				<span className='text-lg md:text-3xl font-bold font-mono self-center'>
					Alexey Rochev
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
			<Link href={`${userId}/edit`}>
				<Button variant='default'>Edit Profile</Button>
			</Link>
		</div>
	</div>
	)
}

export default ProfileHeader