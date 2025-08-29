import { supabase } from './supabase'

export async function getCurrentUser(email) {
  try {
    // Get user from Supabase auth based on email
    const { data: authUser, error: authError } = await supabase.auth.getUser()
    
    if (authError || !authUser.user) {
      return null
    }

    // If email is provided, verify it matches the authenticated user
    if (email && authUser.user.email !== email) {
      return null
    }

    return authUser.user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}
// Alternative helper to get user by email from Supabase database
export async function getUserByEmail(email) {
  try {
    const { data: student, error } = await supabase
      .from('students')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error) {
      console.error('Error fetching user by email:', error)
      return null
    }
    
    return student
  } catch (error) {
    console.error('Error in getUserByEmail:', error)
    return null
  }
}