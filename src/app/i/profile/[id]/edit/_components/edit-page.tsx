'use client'

import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { SingleSelect } from '@/components/ui/custom/SingleSelect'
import { Field } from '@/components/ui/fields/Field'

import { TypeUserUpdateForm } from '@/types/auth.types'

import { useInitialData } from '../../../hooks/user/useInitialData'
import { useUpdateUser } from '../../../hooks/user/useUpdateUser'
import { useUserId } from '../../../hooks/user/useUserId'

const status = ['not_married', 'married', 'dating', 'in_love', 'actively_looking']

const EditPage = () => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')

	const { register, handleSubmit, control, reset } =
		useForm<TypeUserUpdateForm>({
			mode: 'onChange'
		})

	const { user } = useUserId()

	useInitialData(reset, user!)

	const { updateUser, isPending } = useUpdateUser()

	const onSubmit: SubmitHandler<TypeUserUpdateForm> = data => {
		const { password, ...rest } = data

		updateUser({
			...rest,
			password: password || undefined
		})
	}


	return (
		<div className='mx-auto'>
			<form
				className='w-2/4 mx-auto'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 gap-10'>
					<div>
						<Field
							id='name'
							label='Name: '
							placeholder='Enter name: '
							{...register('name')}
							extra='mb-4'
						/>
						<Field
							id='email'
							label='Email: '
							placeholder='Enter email: '
							{...register('email')}
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

					<Controller
						control={control}
						name='familyStatus'
						render={({ field: { value, onChange } }) => (
							<SingleSelect
								data={status.map(item => ({
									value: item,
									label: item
								}))}
								onChange={onChange}
								value={value || ''}
							/>
						)}
					/>

					<div>
						<Field
							id='lastName'
							label='Lastname'
							placeholder='Enter your lastname'
							{...register('lastName', {})}
							extra='mb-4'
						/>

						<Field
							id='homeTown'
							label='Hometown'
							placeholder='Enter enter your hometown'
							{...register('homeTown', {})}
							extra='mb-4'
						/>
					</div>
				</div>

				<Button
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
