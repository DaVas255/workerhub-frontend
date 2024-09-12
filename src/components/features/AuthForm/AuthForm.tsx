import clsx from 'clsx'
import ReCAPTCHA from 'react-google-recaptcha'

import styles from './AuthForm.module.scss'
import { AuthToggle } from './AuthToggle'
import { getServerUrl } from '@/config/get-server-url'
import { useAuthForm } from './useAuthForm'
import GoogleIcon from '@/app/assets/icons/google.svg?react';
import cityService from '@/services/city.service'
import { useQuery } from "@tanstack/react-query"

interface AuthFormProps {
	isLogin: boolean
}

export function AuthForm({ isLogin }: AuthFormProps) {
	const { handleSubmit, isLoadingAuthForm, onSubmit, recaptchaRef, register } =
		useAuthForm(isLogin)

	const { data, isLoading } = useQuery({
		queryKey: ['cities'],
		queryFn: () => cityService.getCities(),
	})

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.authForm}
		>
			<label className={styles.authForm__field}>
				Email
				<input
					type="email"
					placeholder="Enter email: "
					{...register('email', { required: true })}
					className={clsx(
						styles.authForm__input
					)}
				/>
			</label>

			<label className={styles.authForm__field}>
				Пароль
				<input
					type="passw"
					placeholder="Enter password: "
					{...register('password', { required: true })}
					className={clsx(
						styles.authForm__input
					)}
				/>
			</label>

			{isLogin ? '' :
				<label className={styles.authForm__field}>
					Имя
					<input
						type="name"
						placeholder="Enter name: "
						{...register('name', { required: true })}
						className={clsx(
							styles.authForm__input
						)}
					/>
				</label>
			}

			{isLogin ? '' :
				<label className={styles.authForm__field}>
					Город
					<select
						{...register('cityId', { required: true, valueAsNumber: true })}
						className={clsx(styles.authForm__input)}>
						{isLoading ?
							(<option>Loading...</option>)
							: data
								? data.map((city: any) => <option key={city.id} value={city.id}>{city.name}</option>) : ""}
					</select>
				</label>
			}

			{isLogin ? '' :
				<label className={styles.authForm__field}>
					Номер телефона
					<input
						type="tel"
						placeholder="8 123 456 78-90"
						{...register('phoneNumber', { required: true, pattern: { value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, message: "Invalid phone number", } })}
						className={clsx(styles.authForm__input)}
					/>
				</label>
			}

			<button
				type="submit"
				className={clsx(
					styles['authForm__submit'],
					isLogin ? '' : '',
					isLoading ? '' : ''
				)}
				disabled={isLoading}
			>
				{isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
			</button>

			<button
				onClick={() => (window.location.href = getServerUrl('/auth/google'))}
				type="button"
				className={styles.authForm__google}
			>
				<GoogleIcon />
			</button>

			<ReCAPTCHA
				ref={recaptchaRef}
				size="normal"
				sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY as string}
				theme="dark"
				className={styles.authForm__recaptcha}
			/>

			<AuthToggle isLogin={isLogin} />
		</form>
	)
}
