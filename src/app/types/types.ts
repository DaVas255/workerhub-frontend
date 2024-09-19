import { UserRole } from '@/services/auth/auth.types'

export interface IUser {
	id: number
	email: string

	avatarPath?: string
	verificationToken?: string
	rights: UserRole[]
}

export interface IFormData {
	email: string
	password: string
	confirm_password: string
}

export interface ICity {
	id: number
	name: string
}