import { IFormData } from "@/app/types/types"
import authService from "@/services/auth.service"
import { Input } from "@/app/components/ui/Input/Input"
import styles from "./LoginForm.module.scss"

import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm<IFormData>()

  const navigate = useNavigate()

  const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: IFormData) => authService.login(data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken)
      reset()
      navigate('/profile')
    },
    onError: () => {
      console.log('error')
    }
  })

  // const isPending = isLoginPending || isRegisterPending

  const onSubmit: SubmitHandler<IFormData> = (data) => mutateLogin(data)
  return (
    <div className={styles.loginForm}>
      <h2 className={styles.loginForm__title}>welcome back!</h2>
      <h3 className={styles.loginForm__subtitle}>Enter your email and password to access your account</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input />
        <label>
          Email
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
            style={{ color: 'red' }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
            style={{ color: 'red' }}
          />
        </label>

        <button
          type="submit"
          disabled={isLoginPending}
        >
          Login
        </button>

      </form>
    </div>
  )
}