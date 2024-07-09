import Chat from './_components/chat'

export const Dashboard = () => {
	return (
		<div className='grid h-[calc(100vh-57px)] w-full pl-[56px] overflow-hidden'>
			<div className='flex h-full flex-col'>
				<div className='grid h-full flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3'>
					<Chat />
				</div>
			</div>
		</div>
	)
}

export default Dashboard
