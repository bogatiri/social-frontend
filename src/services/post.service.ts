import type { IPosts, TypePostFormState } from '@/types/post.types'

import { axiosWithAuth } from '@/api/interceptors'

class PostService {
	private BASE_URL = 'post'

	async findById(id: string) {
		const response = await axiosWithAuth.get<IPosts[]>(
			`${this.BASE_URL}/${id}`
		)
		return response.data
	}


	async create(data: TypePostFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updatePost(id: string, data: TypePostFormState) {
		try {
			const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
			if (response.data.success === true) {
				return response.data
			} else {
				return response.data
			}
		} catch (error) {
			throw error
		}
	}

	async deletePost(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		if (response.data.success === true) {
			return response.data
		} else {
			return response.data
		}
	}
}

export const postService = new PostService()
