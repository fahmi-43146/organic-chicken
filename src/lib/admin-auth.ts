"use client"

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
}

export function getAdminUser(): AdminUser | null {
  if (typeof window === "undefined") return null

  try {
    const isAuth = localStorage.getItem("adminAuth")
    const userStr = localStorage.getItem("adminUser")

    if (isAuth === "true" && userStr) {
      return JSON.parse(userStr)
    }
  } catch (error) {
    console.error("Error getting admin user:", error)
  }

  return null
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("adminAuth") === "true"
}

export function signOutAdmin(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("adminAuth")
  localStorage.removeItem("adminUser")
  window.location.href = "/admin/login"
}

export function requireAdminAuth(): AdminUser {
  const user = getAdminUser()
  if (!user) {
    window.location.href = "/admin/login"
    throw new Error("Admin authentication required")
  }
  return user
}
