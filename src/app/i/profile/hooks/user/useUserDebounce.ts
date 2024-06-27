// import debounce from 'lodash.debounce'
// import { useCallback, useEffect } from 'react'
// import { UseFormWatch } from 'react-hook-form'

// import { TypeUserUpdateForm } from '@/types/auth.types'

// import { useUpdateUser } from './useUpdateUser'

// interface IUseUserDebounce {
// 	watch: UseFormWatch<TypeUserUpdateForm>
// 	userId: string
// }

// export function useUserDebounce({ watch, userId }: IUseUserDebounce) {
// 	const { updateUser } = useUpdateUser()

// 	const debouncedUpdateUser = useCallback(
// 		debounce((formData: TypeUserUpdateForm) => {
// 			updateUser({ data: formData })
// 		}, 700),
// 		[]
// 	)

// 	useEffect(() => {
// 		const { unsubscribe } = watch(formData => {
// 			if (userId) {
// 				debouncedUpdateUser({
// 					...formData
// 				})
// 			} else {
// 			}
// 		})

// 		return () => {
// 			unsubscribe()
// 		}
// 	}, [watch(), debouncedUpdateUser])
// }
