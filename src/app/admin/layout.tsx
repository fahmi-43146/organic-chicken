"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  LogOut,
  BarChart3,
  Tags,
  User,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { AuthGuard } from "@/components/admin/auth-guard"
import { getAdminUser, signOutAdmin } from "@/lib/admin-auth"

const sidebarItems = [
  {
    title: "dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "manageProducts",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "manageOrders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "manageCategories",
    href: "/admin/categories",
    icon: Tags,
  },
  {
    title: "customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { language, isRTL } = useLanguage()
  const t = (key: string) => getTranslation(key as any, language)

  // Don't show auth guard for login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const adminUser = getAdminUser()

  const Sidebar = ({ className = "" }: { className?: string }) => (
    <div className={`flex h-full flex-col bg-gray-900 text-white ${className}`}>
      <div className="flex h-16 items-center border-b border-gray-800 px-6">
        <Link href="/admin" className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-lg">{language === "ar" ? "لوحة الإدارة" : "Admin Panel"}</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 rtl:space-x-reverse rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{t(item.title)}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-800 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
          onClick={signOutAdmin}
        >
          <LogOut className="h-5 w-5 mr-3 rtl:mr-0 rtl:ml-3" />
          {language === "ar" ? "تسجيل الخروج" : "Sign Out"}
        </Button>
      </div>
    </div>
  )

  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="sm" className="fixed top-4 left-4 z-50">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isRTL ? "right" : "left"} className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-900 shadow-sm border-b">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold">{t("dashboard")}</h1>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">{language === "ar" ? "العودة للموقع" : "Back to Site"}</Link>
                </Button>

                {/* Admin User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-600 text-white">
                          {adminUser?.name?.charAt(0) || "A"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{adminUser?.name || "Admin"}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{adminUser?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/settings" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        {language === "ar" ? "الإعدادات" : "Settings"}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOutAdmin} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      {language === "ar" ? "تسجيل الخروج" : "Sign Out"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
