interface PostWrapperProps {
	children: React.ReactNode
}

export const PostWrapper = ({ children }: PostWrapperProps) => {
	return (
		<li className='shrink-0 h-full w-full list-none select-none'>
			{children}
		</li>
	)
}
