import { API_URL } from '@/app/constants'

interface ICityResponse {
  id: number
  city: string
}

class CityService {
  async getCities() {
    const response = await fetch(`${API_URL}/city`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Cities error')
    }

    const responseData: ICityResponse[] = await response.json()
    return responseData
  }
}
export default new CityService()