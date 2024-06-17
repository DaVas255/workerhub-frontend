import { LoginForm } from '@/app/components/features/LoginForm/LoginForm'
import { RegisterForm } from '@/app/components/features/RegisterForm/RegisterForm'
import { MainLayout } from '@/app/components/layouts/MainLayout/MainLayout'
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
      <h1>AuthPage</h1>
      {isAuth ? <LoginForm /> : <RegisterForm />}
      <button onClick={() => setIsAuth(!isAuth)}>{isAuth ? <span>Do you have an account? Login</span> : <span>You do not have an account?</span>}</button>
    </MainLayout>
  )
}