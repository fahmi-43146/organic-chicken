"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Calendar, Shield, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { getTranslation } from "@/lib/i18n"

export default function ProfilePage() {
  const [fullName, setFullName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { language } = useLanguage()
  const { user, profile, updateProfile } = useAuth()
  const t = (key: string) => getTranslation(key as any, language)

  // React.useEffect(() => {
  //   if (profile?.full_name) {
  //     setFullName(profile.full_name)
  //   }
  // }, [profile])

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    const result = await updateProfile({ full_name: fullName })

    if (result?.error) {
      setError(result.error)
    } else {
      setSuccess(
        language === "ar"
          ? "تم تحديث الملف الشخصي بنجاح"
          : language === "fr"
            ? "Profil mis à jour avec succès"
            : "Profile updated successfully",
      )
    }

    setIsLoading(false)
  }

  const getInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-TN" : language === "fr" ? "fr-FR" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    )
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">
            {language === "ar" ? "جاري التحميل..." : language === "fr" ? "Chargement..." : "Loading..."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl bg-green-600 text-white">
                  {getInitials(profile.full_name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">
              {profile.full_name || (language === "ar" ? "مستخدم" : language === "fr" ? "Utilisateur" : "User")}
            </CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" />
              {profile.email}
            </CardDescription>
            <div className="flex justify-center mt-2">
              <Badge variant={profile.role === "admin" ? "default" : "secondary"}>
                {profile.role === "admin"
                  ? language === "ar"
                    ? "مدير"
                    : language === "fr"
                      ? "Administrateur"
                      : "Administrator"
                  : language === "ar"
                    ? "مستخدم"
                    : language === "fr"
                      ? "Utilisateur"
                      : "User"}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {language === "ar"
                ? "معلومات الحساب"
                : language === "fr"
                  ? "Informations du compte"
                  : "Account Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  {language === "ar" ? "البريد الإلكتروني" : language === "fr" ? "Email" : "Email"}
                </Label>
                <p className="text-sm">{profile.email}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  {language === "ar" ? "الدور" : language === "fr" ? "Rôle" : "Role"}
                </Label>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm capitalize">{profile.role}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {language === "ar" ? "عضو منذ" : language === "fr" ? "Membre depuis" : "Member since"}
              </Label>
              <p className="text-sm">{formatDate(profile.created_at)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Update Profile */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === "ar"
                ? "تحديث الملف الشخصي"
                : language === "fr"
                  ? "Mettre à jour le profil"
                  : "Update Profile"}
            </CardTitle>
            <CardDescription>
              {language === "ar"
                ? "قم بتحديث معلوماتك الشخصية"
                : language === "fr"
                  ? "Mettez à jour vos informations personnelles"
                  : "Update your personal information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
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
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {language === "ar" ? "جاري التحديث..." : language === "fr" ? "Mise à jour..." : "Updating..."}
                  </>
                ) : language === "ar" ? (
                  "تحديث الملف الشخصي"
                ) : language === "fr" ? (
                  "Mettre à jour le profil"
                ) : (
                  "Update Profile"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
