"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, ShoppingCart, Leaf, User, LogIn } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { CartDrawer } from "./cart/cart-drawer"
import { UserDropdown } from "./user-dropdown"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { getTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()
  const { language, isRTL } = useLanguage()
  const { user, profile, loading } = useAuth()
  const { items } = useCart()
  const t = (key: string) => getTranslation(key as any, language)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("products"), href: "/products" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-green-800">
              {language === "ar" ? "مزرعة هادي مشعب" : language === "fr" ? "Ferme Hedi Mchaab" : "Hedi Mchaab Farm"}
            </h1>
            <p className="text-xs text-green-600">
              {language === "ar"
                ? "دجاج عضوي طبيعي"
                : language === "fr"
                  ? "Poulet bio naturel"
                  : "Natural Organic Chicken"}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                isActive(item.href) ? "text-green-600" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <LanguageSwitcher />

          {/* Cart Button - Optimized */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative h-9 w-9 p-0" 
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs font-medium"
              >
                {totalItems > 99 ? "99+" : totalItems}
              </Badge>
            )}
            <span className="sr-only">
              {language === "ar" ? "سلة التسوق" : language === "fr" ? "Panier" : "Shopping cart"}
            </span>
          </Button>

          {/* Authentication */}
          {loading ? (
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
          ) : user && profile ? (
            <UserDropdown />
          ) : (
            <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "دخول" : language === "fr" ? "Connexion" : "Login"}
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">
                  <User className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "تسجيل" : language === "fr" ? "S'inscrire" : "Register"}
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden h-9 w-9 p-0">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isRTL ? "left" : "right"} className="w-80">
              <SheetHeader className="sr-only">
                <SheetTitle>
                  {language === "ar" ? "قائمة التنقل" : language === "fr" ? "Menu de navigation" : "Navigation Menu"}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-8">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
                  <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-green-800">
                      {language === "ar"
                        ? "مزرعة هادي مشعب"
                        : language === "fr"
                          ? "Ferme Hedi Mchaab"
                          : "Hedi Mchaab Farm"}
                    </h2>
                    <p className="text-xs text-green-600">
                      {language === "ar"
                        ? "دجاج عضوي طبيعي"
                        : language === "fr"
                          ? "Poulet bio naturel"
                          : "Natural Organic Chicken"}
                    </p>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-green-600 py-2 px-3 rounded-md",
                        isActive(item.href) ? "text-green-600 bg-green-50" : "text-muted-foreground hover:bg-gray-50",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Authentication */}
                {!loading && (
                  <div className="pt-4 border-t">
                    {user && profile ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-green-50 rounded-md">
                          <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
                            {profile.full_name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{profile.full_name || "User"}</p>
                            <p className="text-xs text-muted-foreground">{profile.email}</p>
                          </div>
                        </div>
                        <Link
                          href="/profile"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-2 rtl:space-x-reverse text-sm py-2 px-3 rounded-md hover:bg-gray-50"
                        >
                          <User className="h-4 w-4" />
                          <span>{language === "ar" ? "الملف الشخصي" : language === "fr" ? "Profil" : "Profile"}</span>
                        </Link>
                        {profile.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-2 rtl:space-x-reverse text-sm py-2 px-3 rounded-md hover:bg-gray-50"
                          >
                            <User className="h-4 w-4" />
                            <span>
                              {language === "ar" ? "لوحة الإدارة" : language === "fr" ? "Admin" : "Admin Panel"}
                            </span>
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                          <Link href="/login" onClick={() => setIsOpen(false)}>
                            <LogIn className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                            {language === "ar" ? "تسجيل الدخول" : language === "fr" ? "Se connecter" : "Sign In"}
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" asChild>
                          <Link href="/register" onClick={() => setIsOpen(false)}>
                            <User className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                            {language === "ar" ? "إنشاء حساب" : language === "fr" ? "S'inscrire" : "Sign Up"}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  )
}
