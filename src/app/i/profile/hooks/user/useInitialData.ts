import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { IUser, TypeUserUpdateForm } from '@/types/auth.types'


export function useInitialData(reset: UseFormReset<TypeUserUpdateForm>, user: IUser) {


	useEffect(() => {
		if (user) {
			reset({
				name: user.name,
				email:user.email,
				lastName: user.lastName,
				homeTown: user.homeTown,
				familyStatus: user.familyStatus,
				about: user.about,
			})
		}
	},[user])
}
