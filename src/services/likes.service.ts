import type { TypeLikeFormState } from '@/types/like.types'

import { axiosWithAuth } from '@/api/interceptors'

class LikeService {
	private BASE_URL = 'likes'

	async create(data: TypeLikeFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async deleteLike(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		if (response.data.success === true) {
			return response.data
		} else {
			return response.data
		}
	}
}

export const likeService = new LikeService()
