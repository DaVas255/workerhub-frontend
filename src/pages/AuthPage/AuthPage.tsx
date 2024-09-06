import { LoginForm } from '@/components/features/LoginForm/LoginForm'
import { RegisterForm } from '@/components/features/RegisterForm/RegisterForm'
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout'
import styles from './AuthPage.module.scss'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthPage = () => {
  const [isAuth, setIsAuth] = useState(false);
  let navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/profile')
    }
  }, [])

  return (
    <MainLayout>
      <div className={styles.authPage}>
        {isAuth ? <LoginForm /> : <RegisterForm />}
        <button onClick={() => setIsAuth(!isAuth)}>{isAuth ? <div>Нет аккаунта? <span>Регистрация</span></div> : <div>Есть аккаунт? <span>Войти</span></div>}</button>
      </div>
    </MainLayout>
  )
}