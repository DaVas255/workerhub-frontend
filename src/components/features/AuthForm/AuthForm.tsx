import clsx from 'clsx'
import ReCAPTCHA from 'react-google-recaptcha'
import styles from './AuthForm.module.scss'
import { AuthToggle } from './AuthToggle'
import { getServerUrl } from '@/config/get-server-url'
import { useAuthForm } from '@/hooks/useAuthForm'
import GoogleIcon from '@/app/assets/icons/google.svg?react'

interface AuthFormProps {
  isLogin: boolean
}

export function AuthForm({ isLogin }: AuthFormProps) {
  const {
    handleSubmit,
    isLoadingAuthForm,
    onSubmit,
    recaptchaRef,
    register,
    watch
  } = useAuthForm(isLogin)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
      <label className={styles.authForm__field}>
        Email
        <input
          type='email'
          placeholder='Введите email'
          {...register('email', { required: true })}
          className={clsx(styles.authForm__input)}
        />
      </label>

      <label className={styles.authForm__field}>
        Пароль
        <input
          type='password'
          placeholder='Пароль'
          {...register('password', { required: true })}
          className={clsx(styles.authForm__input)}
        />
      </label>

      {!isLogin && (
        <label className={styles.authForm__field}>
          <input
            type='password'
            placeholder='Повторите пароль'
            {...register('confirm_password', {
              required: true,
              validate: value => value === watch('password')
            })}
            className={clsx(styles.authForm__input)}
          />
        </label>
      )}

      <button
        type='submit'
        className={clsx(
          styles['authForm__submit'],
          isLogin ? '' : '',
          isLoadingAuthForm ? '' : ''
        )}
        disabled={isLoadingAuthForm}
      >
        {isLoadingAuthForm
          ? 'Загрузка...'
          : isLogin
            ? 'Войти'
            : 'Зарегистрироваться'}
      </button>

      {/* <button
        onClick={() => (window.location.href = getServerUrl('/auth/google'))}
        type='button'
        className={styles.authForm__google}
      >
        <GoogleIcon />
      </button> */}

      <ReCAPTCHA
        ref={recaptchaRef}
        size='normal'
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY as string}
        theme='dark'
        className={styles.authForm__recaptcha}
      />

      <AuthToggle isLogin={isLogin} />
    </form>
  )
}
