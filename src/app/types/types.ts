export interface IUser {
	id: number
	name: string
	email: string
	phoneNumber: string
	cityId: number
}

export interface IFormData extends IUser {
	password: string
}

export interface ICity {
	id: number
	name: string
}