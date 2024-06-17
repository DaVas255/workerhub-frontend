import { MainLayout } from "@/app/components/layouts/MainLayout/MainLayout"
import authService from "@/services/auth.service"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ProfilePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/auth')
    }
  }, [])

  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.profile(),
  })

  return (
    <MainLayout>
      <div>ProfilePage</div>
      {isLoading ? (<div>Loading...</div>) : data ? (<ul><li>{data.name}</li><li>{data.email}</li><li>{data.phoneNumber}</li></ul>) : (<div>No data</div>)}
      <button onClick={() => {
        localStorage.removeItem('token')
        navigate('/auth')
      }}>logout</button>
    </MainLayout>
  )
}