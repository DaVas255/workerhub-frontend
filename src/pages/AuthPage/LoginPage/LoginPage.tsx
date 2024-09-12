import { AuthForm } from '@/components/features/AuthForm/AuthForm'
import styles from './LoginPage.module.scss'

export function LoginPage() {
	return (
		<div className={styles.loginPage}>
			<AuthForm isLogin />
		</div>
	)
}
