"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Shield, LogOut } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"

export function UserDropdown() {
  const { user, profile, signOut } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()

  if (!user || !profile) return null

  const getInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-green-600 text-white">{getInitials(profile.full_name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile.full_name || (language === "ar" ? "مستخدم" : language === "fr" ? "Utilisateur" : "User")}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{profile.email}</p>
            <div className="pt-1">
              <Badge variant={profile.role === "admin" ? "default" : "secondary"} className="text-xs">
                {profile.role === "admin"
                  ? language === "ar"
                    ? "مدير"
                    : language === "fr"
                      ? "Admin"
                      : "Admin"
                  : language === "ar"
                    ? "مستخدم"
                    : language === "fr"
                      ? "Utilisateur"
                      : "User"}
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>{language === "ar" ? "الملف الشخصي" : language === "fr" ? "Profil" : "Profile"}</span>
          </Link>
        </DropdownMenuItem>
        {profile.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="cursor-pointer">
              <Shield className="mr-2 h-4 w-4" />
              <span>{language === "ar" ? "لوحة الإدارة" : language === "fr" ? "Admin" : "Admin Panel"}</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{language === "ar" ? "تسجيل الخروج" : language === "fr" ? "Se déconnecter" : "Sign out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
