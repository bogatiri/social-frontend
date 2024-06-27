import type { TypeCommentFormState } from '@/types/comment.types'

import { axiosWithAuth } from '@/api/interceptors'

class CommentService {
	private BASE_URL = 'comment'

	async create(data: TypeCommentFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateComment(id: string, data: TypeCommentFormState) {
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

	async deleteComment(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		if (response.data.success === true) {
			return response.data
		} else {
			return response.data
		}
	}
}

export const commentService = new CommentService()
