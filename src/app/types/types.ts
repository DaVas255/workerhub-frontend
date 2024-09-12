import { UserRole } from '@/services/auth/auth.types'

export interface IUser {
	id: number
	name: string
	email: string
	phoneNumber: string
	cityId: number

	avatarPath?: string
	verificationToken?: string
	rights: UserRole[]
}

export interface IFormData extends IUser {
	password: string
}

export interface ICity {
	id: number
	name: string
}