"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Leaf, Eye, EyeOff, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { language } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Demo credentials check
      if (email === "admin@hedimchaab.com" && password === "admin123") {
        // Set admin session
        localStorage.setItem("adminAuth", "true")
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            id: "1",
            email: "admin@hedimchaab.com",
            name: "Hedi Mchaab",
            role: "admin",
          }),
        )

        router.push("/admin")
      } else {
        setError(
          language === "ar"
            ? "بيانات الدخول غير صحيحة"
            : language === "fr"
              ? "Identifiants incorrects"
              : "Invalid credentials",
        )
      }
    } catch (err) {
      setError(
        language === "ar"
          ? "حدث خطأ أثناء تسجيل الدخول"
          : language === "fr"
            ? "Erreur lors de la connexion"
            : "Login error occurred",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {language === "ar" ? "تسجيل دخول الإدارة" : language === "fr" ? "Connexion Admin" : "Admin Login"}
          </CardTitle>
          <CardDescription>
            {language === "ar"
              ? "مزرعة هادي مشعب - لوحة الإدارة"
              : language === "fr"
                ? "Ferme Hedi Mchaab - Panneau d'administration"
                : "Hedi Mchaab Farm - Admin Panel"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                {language === "ar" ? "البريد الإلكتروني" : language === "fr" ? "Email" : "Email"}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === "ar" ? "admin@hedimchaab.com" : "admin@hedimchaab.com"}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                {language === "ar" ? "كلمة المرور" : language === "fr" ? "Mot de passe" : "Password"}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    language === "ar"
                      ? "أدخل كلمة المرور"
                      : language === "fr"
                        ? "Entrez le mot de passe"
                        : "Enter password"
                  }
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {language === "ar" ? "جاري تسجيل الدخول..." : language === "fr" ? "Connexion..." : "Signing in..."}
                </>
              ) : language === "ar" ? (
                "تسجيل الدخول"
              ) : language === "fr" ? (
                "Se connecter"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">
              {language === "ar"
                ? "بيانات تجريبية:"
                : language === "fr"
                  ? "Identifiants de démonstration:"
                  : "Demo Credentials:"}
            </h4>
            <p className="text-sm text-blue-700">
              <strong>Email:</strong> admin@hedimchaab.com
              <br />
              <strong>Password:</strong> admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
