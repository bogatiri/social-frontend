import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface IFriends {
	isOnline?: boolean
}

const Friends = ({ isOnline }: IFriends) => {
	return (
		<div className='p-3  rounded-lg flex flex-col gap-3'>
			<div>
				<span>Friends {isOnline && 'online'}</span>
				<span className='opacity-70 text-md'> 54</span>
			</div>
			<div className='flex items-center gap-2'>
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className='flex flex-col gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted'
					>
						<Avatar className='size-16'>
							<AvatarImage
								src='https://github.com/shadcn.png'
								alt='@shadcn'
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<span className='text-xs self-center'>Alexey</span>
					</div>
				))}
				<div className='hidden md:flex flex-col gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted'>
					<Avatar className='size-16'>
						<AvatarImage
							src='https://kartinki.pibig.info/uploads/posts/2023-04/1682147084_kartinki-pibig-info-p-kartinka-tri-tochki-arti-instagram-2.jpg'
							alt='@shadcn'
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<span className='text-xs self-center'>...</span>
				</div>
			</div>
		</div>
	)
}

export default Friends
