import { MainLayout } from "@/components/layouts/MainLayout/MainLayout"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const OrdersPage = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/auth')
    }
  }, [])

  return (
    <MainLayout>
      <div>OrdersPage</div>
    </MainLayout>
  )
}