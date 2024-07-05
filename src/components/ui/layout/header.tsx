import React from 'react'

const Header = ({children} : {children:React.ReactNode}) => {
	return (
		<header className='sticky top-0 z-10 pl-20 flex h-[57px] items-center justify-between gap-1 border-b border-input px-4'>
		<h1 className='text-xl font-semibold'>EvoSocial</h1>
		<div className='flex justify-between items-center gap-2'>
			{children}
		</div>
	</header>
	)
}

export default Header