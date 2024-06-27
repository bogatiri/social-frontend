import { Search } from 'lucide-react'

import { Separator } from '@/components/ui/separator'

import Friends from './_components/friends'
import Photos from './_components/photos'
import Posts from './_components/posts'
import PostForm from './_components/post-form'
import ProfileHeader from './_components/profile-header'

const Profile = () => {
	return (
		<div className='flex ml-14 px-16 lg:px-52 p-4 flex-col gap-10 h-screen'>
			<ProfileHeader />
			<div className='grid lg:grid-cols-[1fr_0.3fr] justify-between gap-6 h-full w-full'>
				<div className='flex flex-col rounded-lg gap-4 '>
					<Photos />
					<div className='flex rounded-lg  h-auto w-full items-center'>
						<PostForm />
					</div>
					<div className='rounded-lg h-full'>
						<div className='border border-border rounded-lg mb-4'>
							<div className='flex justify-between p-2'>
								<span className='self-center'>All posts</span>
								<Search className='hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-lg p-1 cursor-pointer' />
							</div>
						</div>
							<Posts />
					</div>
				</div>
				<div className='flex flex-col rounded-lg gap-4 w-full order-first lg:order-last'>
					<div className='flex w-full flex-col gap-4 border border-border rounded-lg p-4'>
						<Friends isOnline={true} />
						<Separator />
						<Friends />
					</div>
					<div className='bg-slate-800 rounded-lg p-4'>Groups</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
