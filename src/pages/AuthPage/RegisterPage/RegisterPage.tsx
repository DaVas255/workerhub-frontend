import { AuthForm } from '@/components/features/AuthForm/AuthForm'
import styles from './RegisterPage.module.scss'

export function RegisterPage() {
  return (
    <div className={styles.registerPage}>
      <AuthForm isLogin={false} />
    </div>
  )
}
