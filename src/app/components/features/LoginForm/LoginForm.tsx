import { IFormData } from "@/app/types/types"
import authService from "@/services/auth.service"
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          Email
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
            style={{ color: 'red' }}
          />
        </label>
      </div>

      <div>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
            style={{ color: 'red' }}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoginPending}
      >
        Login
      </button>

    </form>
  )
}