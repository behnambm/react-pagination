import { useEffect } from 'react'
import { paginate } from './utils'
import { useGlobalContext } from './context'

export const useFetch = () => {
  const { username, setData, setIsLoading, setUserNotFound, setNoFollowers } =
    useGlobalContext()

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url)

      if (!response.ok) {
        setUserNotFound(true)
        setNoFollowers(false) // reset to initial
      } else {
        const data = await response.json()
        if (data.length !== 0) {
          setData(paginate(data))
          setIsLoading(false)
          // reset to initial
          setUserNotFound(false)
          setNoFollowers(false)
        } else {
          setNoFollowers(true)
          setUserNotFound(false) // reset to initial
        }
      }
    }

    const url = `https://api.github.com/users/${username}/followers?per_page=96`
    fetchData(url)
  }, [username, setData, setIsLoading, setUserNotFound, setNoFollowers])
}
