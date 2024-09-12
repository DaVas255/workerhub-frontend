import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { useNavigate } from 'react-router-dom'
import styles from './AuthForm.module.scss'

export function AuthToggle({ isLogin }: { isLogin: boolean }) {
	const navigate = useNavigate()

	return (
		<div className="">
			{isLogin ? (
				<p>
					Нет аккаунта?{' '}
					<button
						type="button"
						className={styles.authForm__toggleButton}
						onClick={() => navigate(PUBLIC_PAGES.REGISTER)}
					>
						Зарегистрироваться
					</button>
				</p>
			) : (
				<p>
					Уже есть аккаунт?{' '}
					<button
						type="button"
						className={styles.authForm__toggleButton}
						onClick={() => navigate(PUBLIC_PAGES.LOGIN)}
					>
						Войти
					</button>
				</p>
			)}
		</div>
	)
}
