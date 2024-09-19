import { useEffect, useTransition } from 'react'
import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { useProfile } from '@/hooks/useProfile'
import authService from '@/services/auth/auth.service'
import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'

export const ProfileForm = () => {
  const { user, isLoading } = useProfile()

  const [isPending, startTransition] = useTransition()

  const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      startTransition(() => {
        window.location.href = PUBLIC_PAGES.LOGIN
      })
    }
  })

  const isLogoutLoading = isLogoutPending || isPending

  return (
    <div>
      <h1>Profile</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <p>
          {user.email || 'Not found!'} {user.rights}{' '}
        </p>
      )}
      <button
        onClick={() => mutateLogout()}
        disabled={isLogoutLoading}
        className={cn('', {
          '': isLogoutLoading
        })}
      >
        {isLogoutLoading ? 'Выходим...' : 'Выйти'}
      </button>
    </div>
  )
}
