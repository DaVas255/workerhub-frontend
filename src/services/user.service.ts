import { instance } from '@/app/api/axios'
import { IUser } from '@/app/types/types'

class UserService {
	private _BASE_URL = '/users'

	async fetchProfile() {
		return instance.get<IUser>(`${this._BASE_URL}/profile`)
	}

	async fetchPremium() {
		return instance.get<{ text: string }>(`${this._BASE_URL}/premium`)
	}

	async fetchManagerContent() {
		return instance.get<{ text: string }>(`${this._BASE_URL}/manager`)
	}

	async fetchList() {
		return instance.get<IUser[]>(`${this._BASE_URL}/list`)
	}
}

export default new UserService()
