import cn from 'clsx'
import { ChevronDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

import { useOutside } from '@/hooks/useOutside'

export interface IOption {
	label: string
	value: string
}

interface ISingleSelect {
	data: IOption[]
	onChange: (value: string) => void
	value: string
	isColorSelect?: boolean
	text?: string
}

export function SingleSelect({
	data,
	onChange,
	value,
	text,
	isColorSelect
}: ISingleSelect) {
	const { isShow, setIsShow, ref } = useOutside(false)
	const getValue = () => data.find(item => item.value === value)?.value
	return (
		<div
			className={cn('relative cursor-pointer ', {
				'w-max': isColorSelect
			})}
			ref={ref}
		>
			<label
				className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
			>
				Family Status
			</label>
			<div
				className='flex left-0'
				onClick={e => {
					e.preventDefault()
					setIsShow(!isShow)
					e.stopPropagation()
				}}
			>
				{getValue() ? (
					<div
						className={`flex w-full items-center justify-center border border-border rounded-t-lg mt-2 duration-500 hover:duration-0 text-primary-foreground text-white hover:bg-primary/80 px-4 ${!isShow && 'rounded-lg duration-500'}`}
					>
						<Badge
							className='capitalize flex w-full items-center justify-center   text-white bg-white/0 p-3 text-xs outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors'
							style={isColorSelect ? { backgroundColor: value } : {}}
						>
							{getValue()}
						</Badge>
						<ChevronDown />
					</div>
				) : text ? (
					<>
						<Badge>{text === 'InLove' && 'In love'}</Badge>
					</>
				) : (
					<div
						className={`flex w-full items-center justify-center border border-border rounded-t-lg mt-2 duration-500 hover:duration-0 text-primary-foreground text-white hover:bg-primary/80 px-4 ${!isShow && 'rounded-lg duration-500'}`}
					>
						<Badge
							className='capitalize flex w-full items-center justify-center   text-white bg-white/0 p-3 text-xs outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors'
							style={isColorSelect ? { backgroundColor: value } : {}}
						>
							Click for select...
						</Badge>
						<ChevronDown />
					</div>
				)}
			</div>
			{isShow && (
				<div
					className={cn(
						'absolute flex border border-border flex-col w-full  slide bg-sidebar z-10 shadow rounded-b-lg'
					)}
				>
					{data
						.filter(item => item.value !== value)
						.map((item, index) => (
							<div
								key={item.value}
								onClick={e => {
									e.preventDefault()
									onChange(item.value)
									setIsShow(false)
								}}
								className={`block border-b border-border  last:border-none last:mb-0 capitalize`}
								style={
									isColorSelect
										? {
												backgroundColor: item.value
											}
										: {}
								}
							>
								<Badge
									className={`hover:bg-primary/80  h-10 text-xs flex w-full items-center justify-center rounded-none text-white bg-white/0 p-1 outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors focus:border-primary ${index === data.length - 1 && 'rounded-b-lg'}`}
								>
									{(item.label === 'in_love' && 'In love') ||
										(item.label === 'married' && 'Married') ||
										(item.label === 'not_married' && 'Not Married') ||
										(item.label === 'actively_looking' && 'Actively Looking') ||
										(item.label === 'dating' && 'Dating')}
								</Badge>
							</div>
						))}
				</div>
			)}
		</div>
	)
}
