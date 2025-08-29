'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState(null)

  useEffect(() => {
    // Get email from URL or localStorage
    const getEmailFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search)
      return urlParams.get('email')
    }

    const email = getEmailFromUrl() || localStorage.getItem('userEmail')
    
    if (email) {
      setUserEmail(email)
      localStorage.setItem('userEmail', email)
      fetchUser(email)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async (email) => {
    try {
      const res = await fetch(`/api/subjects/user?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      
      if (res.ok) {
        setUser(data)
      } else {
        console.error('Failed to fetch user:', data.error)
      }
    } catch (err) {
      console.error('Failed to fetch user', err)
    } finally {
      setLoading(false)
    }
  }

  const loginWithEmail = async (email) => {
    setLoading(true)
    setUserEmail(email)
    localStorage.setItem('userEmail', email)
    await fetchUser(email)
  }

  const logout = () => {
    setUser(null)
    setUserEmail(null)
    localStorage.removeItem('userEmail')
  }

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      loading, 
      userEmail, 
      loginWithEmail, 
      logout,
      refetchUser: () => userEmail && fetchUser(userEmail)
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)