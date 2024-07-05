import { IUser, TypeUserUpdateForm } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

class UserService {
	private BASE_URL = '/user/profile'

	async getProfile() {
		const response = await axiosWithAuth.get<IUser>(this.BASE_URL)
		return response.data
	}

	async getUserById(id: string) {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/${id}`)
		return response.data
	}

	async findByName(name: string) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/name`, {name})
		return response.data
	}

	async update(data: TypeUserUpdateForm) {
		try {
			const response = await axiosWithAuth.put(this.BASE_URL, data)
			return response.data
		} catch (error) {
			console.error(error)
		}
	}

	async deleteUser(id: string){
		try {
			const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`)
			return response.data
		} catch (error) {
			console.error(error)
		}
	}

	async sendRequestToFriends(idRecipient: string) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/sendRequest`, {idRecipient})
		return response.data
	}

	async acceptFriendRequest(idSender: string, requestId: string) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/acceptRequest`, {idSender, requestId})
		return response.data
	}

	async rejectFriendRequest(id: string){
		try {
			const response = await axiosWithAuth.delete(`${this.BASE_URL}/deleteRequest/${id}`)
			return response.data
		} catch (error) {
			console.error(error)
		}
	}

}

export const userService = new UserService()

