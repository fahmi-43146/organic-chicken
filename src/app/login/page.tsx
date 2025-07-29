"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Leaf, Eye, EyeOff, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { getTranslation } from "@/lib/i18n"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { language } = useLanguage()
  const { signIn } = useAuth()
  const t = (key: string) => getTranslation(key as any, language)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await signIn(email, password)

    if (result.error) {
      setError(result.error)
    } else {
      router.push("/")
    }

    setIsLoading(false)
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
            {language === "ar" ? "تسجيل الدخول" : language === "fr" ? "Se connecter" : "Sign In"}
          </CardTitle>
          <CardDescription>
            {language === "ar"
              ? "مرحباً بك في مزرعة هادي مشعب"
              : language === "fr"
                ? "Bienvenue à la Ferme Hedi Mchaab"
                : "Welcome to Hedi Mchaab Farm"}
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
                placeholder={
                  language === "ar"
                    ? "أدخل بريدك الإلكتروني"
                    : language === "fr"
                      ? "Entrez votre email"
                      : "Enter your email"
                }
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

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {language === "ar"
                ? "ليس لديك حساب؟"
                : language === "fr"
                  ? "Vous n'avez pas de compte?"
                  : "Don't have an account?"}{" "}
              <Link href="/register" className="text-green-600 hover:underline font-medium">
                {language === "ar" ? "إنشاء حساب" : language === "fr" ? "S'inscrire" : "Sign up"}
              </Link>
            </p>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-blue-600">
              Email: demo@hedimchaab.com
              <br />
              Password: demo123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
