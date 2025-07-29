"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Edit, Ban, UserCheck, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import type { Profile } from "@/lib/types"

// Mock customers data
const mockCustomers: Profile[] = [
  {
    id: "user-1",
    email: "ahmed.mohamed@email.com",
    full_name: "أحمد محمد",
    phone: "+216 12 345 678",
    address: "شارع الحبيب بورقيبة، تونس",
    role: "customer",
    preferred_language: "ar",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "user-2",
    email: "fatima.ali@email.com",
    full_name: "فاطمة علي",
    phone: "+216 98 765 432",
    address: "حي النصر، صفاقس",
    role: "customer",
    preferred_language: "ar",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "admin-1",
    email: "hedi@organicchicken.tn",
    full_name: "هادي مشعب",
    phone: "+216 55 123 456",
    address: "مزرعة الخير، تونس",
    role: "admin",
    preferred_language: "ar",
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<Profile[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key as any, language)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm),
  )

  const handleToggleRole = (customerId: string) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              role: customer.role === "admin" ? "customer" : "admin",
              updated_at: new Date().toISOString(),
            }
          : customer,
      ),
    )
  }

  const getRoleBadge = (role: Profile["role"]) => {
    const roleConfig = {
      customer: { label: language === "ar" ? "عميل" : "Customer", variant: "default" as const },
      admin: { label: language === "ar" ? "مدير" : "Admin", variant: "secondary" as const },
    }
    return roleConfig[role]
  }

  const getLanguageBadge = (lang: string) => {
    const langConfig = {
      ar: { label: "العربية", flag: "🇹🇳" },
      en: { label: "English", flag: "🇺🇸" },
      fr: { label: "Français", flag: "🇫🇷" },
    }
    return langConfig[lang as keyof typeof langConfig] || langConfig.ar
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{language === "ar" ? "إدارة العملاء" : "Customer Management"}</h1>
          <p className="text-muted-foreground">
            {language === "ar"
              ? "إدارة ومتابعة جميع العملاء والمستخدمين"
              : "Manage and monitor all customers and users"}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "ar" ? "إجمالي العملاء" : "Total Customers"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((c) => c.role === "customer").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{language === "ar" ? "المديرون" : "Admins"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((c) => c.role === "admin").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "ar" ? "عملاء جدد هذا الشهر" : "New This Month"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                customers.filter((c) => {
                  const createdDate = new Date(c.created_at)
                  const monthAgo = new Date()
                  monthAgo.setMonth(monthAgo.getMonth() - 1)
                  return createdDate > monthAgo
                }).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "ar" ? "اللغة المفضلة" : "Preferred Language"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((c) => c.preferred_language === "ar").length} AR</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={language === "ar" ? "البحث في العملاء..." : "Search customers..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rtl:pl-3 rtl:pr-10"
        />
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "ar" ? "قائمة العملاء" : "Customers List"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === "ar" ? "العميل" : "Customer"}</TableHead>
                <TableHead>{language === "ar" ? "معلومات الاتصال" : "Contact Info"}</TableHead>
                <TableHead>{language === "ar" ? "الدور" : "Role"}</TableHead>
                <TableHead>{language === "ar" ? "اللغة" : "Language"}</TableHead>
                <TableHead>{language === "ar" ? "تاريخ التسجيل" : "Join Date"}</TableHead>
                <TableHead>{language === "ar" ? "الإجراءات" : "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600">
                          {customer.full_name?.charAt(0) || customer.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{customer.full_name || customer.email}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {customer.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                      )}
                      {customer.address && (
                        <div className="text-sm text-muted-foreground max-w-48 truncate">{customer.address}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadge(customer.role).variant}>{getRoleBadge(customer.role).label}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{getLanguageBadge(customer.preferred_language).flag}</span>
                      <span className="text-sm">{getLanguageBadge(customer.preferred_language).label}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(customer.created_at).toLocaleDateString(language === "ar" ? "ar-TN" : "en-US")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {language === "ar" ? "عرض الملف الشخصي" : "View Profile"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {language === "ar" ? "تعديل" : "Edit"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {language === "ar" ? "إرسال رسالة" : "Send Message"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleRole(customer.id)}>
                          <UserCheck className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {customer.role === "admin"
                            ? language === "ar"
                              ? "إلغاء صلاحية المدير"
                              : "Remove Admin"
                            : language === "ar"
                              ? "جعل مديراً"
                              : "Make Admin"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Ban className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {language === "ar" ? "حظر العميل" : "Ban Customer"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
