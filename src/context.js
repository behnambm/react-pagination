import React, { useContext, useState } from 'react'

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState('torvalds')
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [userNotFound, setUserNotFound] = useState(false)
  const [noFollowers, setNoFollowers] = useState(false)

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        data,
        setData,
        isLoading,
        setIsLoading,
        userNotFound,
        setUserNotFound,
        noFollowers,
        setNoFollowers,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
