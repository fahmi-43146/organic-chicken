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

export default function RegisterPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { language } = useLanguage()
  const { signUp } = useAuth()
  const t = (key: string) => getTranslation(key as any, language)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError(
        language === "ar"
          ? "كلمات المرور غير متطابقة"
          : language === "fr"
            ? "Les mots de passe ne correspondent pas"
            : "Passwords do not match",
      )
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError(
        language === "ar"
          ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
          : language === "fr"
            ? "Le mot de passe doit contenir au moins 6 caractères"
            : "Password must be at least 6 characters",
      )
      setIsLoading(false)
      return
    }

    const result = await signUp(email, password, fullName)

    if (result.error) {
      setError(result.error)
    } else {
      router.push("/login")
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
            {language === "ar" ? "إنشاء حساب" : language === "fr" ? "S'inscrire" : "Sign Up"}
          </CardTitle>
          <CardDescription>
            {language === "ar"
              ? "انضم إلى مزرعة هادي مشعب"
              : language === "fr"
                ? "Rejoignez la Ferme Hedi Mchaab"
                : "Join Hedi Mchaab Farm"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                {language === "ar" ? "الاسم الكامل" : language === "fr" ? "Nom complet" : "Full Name"}
              </Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={
                  language === "ar"
                    ? "أدخل اسمك الكامل"
                    : language === "fr"
                      ? "Entrez votre nom complet"
                      : "Enter your full name"
                }
                required
                disabled={isLoading}
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {language === "ar"
                  ? "تأكيد كلمة المرور"
                  : language === "fr"
                    ? "Confirmer le mot de passe"
                    : "Confirm Password"}
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={
                    language === "ar"
                      ? "أعد إدخال كلمة المرور"
                      : language === "fr"
                        ? "Confirmez le mot de passe"
                        : "Confirm your password"
                  }
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                  {language === "ar"
                    ? "جاري إنشاء الحساب..."
                    : language === "fr"
                      ? "Création..."
                      : "Creating account..."}
                </>
              ) : language === "ar" ? (
                "إنشاء حساب"
              ) : language === "fr" ? (
                "S'inscrire"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {language === "ar"
                ? "لديك حساب بالفعل؟"
                : language === "fr"
                  ? "Vous avez déjà un compte?"
                  : "Already have an account?"}{" "}
              <Link href="/login" className="text-green-600 hover:underline font-medium">
                {language === "ar" ? "تسجيل الدخول" : language === "fr" ? "Se connecter" : "Sign in"}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
