"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, AlertCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { getAdminUser } from "@/lib/admin-auth"

export default function AdminDashboard() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key as any, language)
  const adminUser = getAdminUser()

  const stats = [
    {
      title: language === "ar" ? "إجمالي المنتجات" : language === "fr" ? "Total Produits" : "Total Products",
      value: "24",
      change: "+2",
      changeType: "positive" as const,
      icon: Package,
    },
    {
      title: language === "ar" ? "الطلبات الجديدة" : language === "fr" ? "Nouvelles Commandes" : "New Orders",
      value: "12",
      change: "+5",
      changeType: "positive" as const,
      icon: ShoppingCart,
    },
    {
      title: language === "ar" ? "العملاء النشطون" : language === "fr" ? "Clients Actifs" : "Active Customers",
      value: "156",
      change: "+12",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: language === "ar" ? "المبيعات اليوم" : language === "fr" ? "Ventes Aujourd'hui" : "Today's Sales",
      value: "2,450 TND",
      change: "+15%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
  ]

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "أحمد محمد",
      amount: "125.50 TND",
      status: "pending",
      time: "10 دقائق",
    },
    {
      id: "#ORD-002",
      customer: "فاطمة علي",
      amount: "89.00 TND",
      status: "confirmed",
      time: "25 دقيقة",
    },
    {
      id: "#ORD-003",
      customer: "محمد الصالح",
      amount: "156.75 TND",
      status: "preparing",
      time: "45 دقيقة",
    },
  ]

  const lowStockProducts = [
    { name: "دجاج كامل عضوي", stock: 3, threshold: 10 },
    { name: "صدور دجاج", stock: 5, threshold: 15 },
    { name: "أجنحة دجاج", stock: 2, threshold: 20 },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: language === "ar" ? "قيد الانتظار" : "Pending",
        variant: "secondary" as const,
      },
      confirmed: {
        label: language === "ar" ? "مؤكد" : "Confirmed",
        variant: "default" as const,
      },
      preparing: {
        label: language === "ar" ? "قيد التحضير" : "Preparing",
        variant: "outline" as const,
      },
    }

    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {language === "ar"
            ? `مرحباً ${adminUser?.name || "هادي مشعب"}`
            : language === "fr"
              ? `Bienvenue ${adminUser?.name || "Hedi Mchaab"}`
              : `Welcome ${adminUser?.name || "Hedi Mchaab"}`}
        </h1>
        <p className="text-green-100">
          {language === "ar"
            ? "إليك نظرة عامة على أداء مزرعتك اليوم"
            : language === "fr"
              ? "Voici un aperçu des performances de votre ferme aujourd'hui"
              : "Here's an overview of your farm's performance today"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">{stat.change}</span>
                <span className="ml-1">
                  {language === "ar" ? "من الأمس" : language === "fr" ? "d'hier" : "from yesterday"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {language === "ar" ? "الطلبات الأخيرة" : language === "fr" ? "Commandes Récentes" : "Recent Orders"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.customer}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{order.amount}</div>
                    <Badge variant={getStatusBadge(order.status).variant}>{getStatusBadge(order.status).label}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {language === "ar" ? "منذ" : "Since"} {order.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="h-5 w-5" />
              {language === "ar"
                ? "تنبيه المخزون المنخفض"
                : language === "fr"
                  ? "Alerte Stock Faible"
                  : "Low Stock Alert"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
                >
                  <div className="flex-1">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {language === "ar" ? "الحد الأدنى:" : "Threshold:"} {product.threshold}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">{product.stock}</div>
                    <div className="text-xs text-muted-foreground">
                      {language === "ar" ? "متبقي" : language === "fr" ? "restant" : "remaining"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
