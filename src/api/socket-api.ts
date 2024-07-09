'use client'
import { Socket, io } from 'socket.io-client'


class SocketApi{
	static socket: null | Socket = null


	static createConnection() : void{
		const userId = localStorage.getItem('userId')
		this.socket = io(`http://localhost:4200`, {
			query: {
				userId
			}
		})

		
		this.socket.on('connect', () => {
			console.log('WebSocket connected')
		})

		this.socket.on('disconnect', (e) => {
			console.log('WebSocket disconnected')
		})
	}
}

export default SocketApi