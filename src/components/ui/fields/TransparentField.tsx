import cn from 'clsx'
import { type InputHTMLAttributes, forwardRef } from 'react'

type TypeTransparentField = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<
	HTMLInputElement,
	TypeTransparentField
>(({ className,type, ...rest }, ref) => {

	return (
		<input
			autoComplete='off'
			autoFocus={false}
			className={cn(
				' bg-transparent  border-none focus:outline-0 focus:shadow-transparent w-full',
				className
			)}
			ref={ref}
			{...rest}
		/>
	)
})

TransparentField.displayName = 'TransparentField'
