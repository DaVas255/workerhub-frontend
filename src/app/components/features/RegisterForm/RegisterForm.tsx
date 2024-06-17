import { IFormData } from "@/app/types/types"
import authService from "@/services/auth.service"
import cityService from "@/services/city.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export const RegisterForm = () => {
  const { register, handleSubmit, reset, formState } = useForm<IFormData>({
    mode: 'onChange',
  })

  const { errors } = formState

  const navigate = useNavigate()

  const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: IFormData) => authService.register(data),
    onSuccess(data) {
      localStorage.setItem('token', data.accessToken)
      reset()
      navigate('/profile')
    },
    onError: () => {
      console.log('error')
    }
  })

  const { data, isLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: () => cityService.getCities(),
  })

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    mutateRegister(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name
        <input
          type="text"
          placeholder="Name"
          {...register('name', { required: true })}
          style={{ color: 'red' }}
        />
      </label>

      <label>
        Email
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address", } })}
          style={{ color: 'red' }}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </label>

      <label>
        Password
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true, minLength: 6 })}
          style={{ color: 'red' }}
        />
      </label>

      <label>
        Phone number
        <input
          type="tel"
          placeholder="8 123 456 78-90"
          {...register('phoneNumber', { required: true, pattern: { value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, message: "Invalid phone number", } })}
          style={{ color: 'red' }}
        />
        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
      </label>

      <label>
        City
        <select {...register('cityId', { required: true, valueAsNumber: true })}>
          {isLoading ? (<option>Loading...</option>) : data ? data.map((city: any) => <option key={city.id} value={city.id}>{city.name}</option>) : ""}
        </select>
      </label>

      <button
        type="submit"
        disabled={isRegisterPending}
      >
        Register
      </button>

    </form >
  )
}