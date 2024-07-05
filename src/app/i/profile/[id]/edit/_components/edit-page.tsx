'use client'

import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { SingleSelect } from '@/components/ui/custom/SingleSelect'
import { Field } from '@/components/ui/fields/Field'
import { Skeleton } from '@/components/ui/skeleton'

import { TypeUserUpdateForm } from '@/types/auth.types'

import { useInitialData } from '../../../hooks/user/useInitialData'
import { useUpdateUser } from '../../../hooks/user/useUpdateUser'
import { useUserId } from '../../../hooks/user/useUserId'

const status = [
	'not_married',
	'married',
	'dating',
	'in_love',
	'actively_looking'
]

const EditPage = () => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')

	const { register, handleSubmit, control, reset } =
		useForm<TypeUserUpdateForm>({
			mode: 'onChange'
		})

	const { user, isLoading } = useUserId()

	useInitialData(reset, user!)

	const { updateUser, isPending } = useUpdateUser()

	const onSubmit: SubmitHandler<TypeUserUpdateForm> = data => {
		const { password, ...rest } = data

		updateUser({
			...rest,
			password: password || undefined
		})
	}

	if (isLoading) {
		return (
			<div className='w-1/4 mx-auto h-full'>
				<div className='grid gap-4'>
					{Array.from({ length: 5 }).map((_, index) => (
						<div
						key={index}
						
						>
							<label className={`text-sm  ml-1.5 font-medium`}></label>
							<Skeleton
							>
								<input className='mt-2 flex w-full items-center justify-center rounded-lg border border-border  bg-white/0 p-3 text-base outline-none  placeholder:font-normal duration-500 transition-colors focus:border-primary' />
							</Skeleton>
						</div>
					))}
							<Button 
							disabled={true}>
								Save
							</Button>
				</div>
			</div>
		)
	}

	return (
		<div className='mx-auto '>
			<form
				className='w-1/4 mx-auto'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid'>
					<Field
						id='name'
						label='Name: '
						placeholder='Enter name: '
						{...register('name')}
						extra='mb-4'
					/>
					<Field
						id='lastName'
						label='Lastname'
						placeholder='Enter your lastname'
						{...register('lastName', {})}
						extra='mb-4'
					/>

					<Controller
						control={control}
						name='familyStatus'
						render={({ field: { value, onChange } }) => (
							<SingleSelect
								data={status.map(item => ({
									value: item,
									label: item
								}))}
								className='mb-4'
								onChange={onChange}
								value={value || ''}
							/>
						)}
					/>

					<Field
						id='homeTown'
						label='Hometown'
						placeholder='Enter enter your hometown'
						{...register('homeTown', {})}
						extra='mb-4'
					/>

					<Field
						id='password'
						label='Password: '
						placeholder='Enter password: '
						type='password'
						{...register('password')}
						extra='mb-10'
					/>
				</div>

				<Button
				className='w-full'
					type='submit'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</div>
	)
}

export default EditPage
