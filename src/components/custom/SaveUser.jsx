"use client";
import { useEffect } from "react";

const SyncUser = () => {
  useEffect(() => {
    const sync = async () => {
      const email = localStorage.getItem("userEmail")
      if (!email) return

      await fetch(`/api/save-user?email=${encodeURIComponent(email)}`)
    }
    sync()
  }, [])

  return null
}

export default SyncUser
