"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, DollarSign, ShoppingCart, Calendar, Download, Target } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getFinancialTransactions } from "@/lib/financial"
import type { FinancialTransaction } from "@/lib/types"

const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"]

export function RevenueAnalytics() {
  const { language } = useLanguage()

  const [revenues, setRevenues] = useState<FinancialTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("6months")

  useEffect(() => {
    loadRevenueData()
  }, [timeRange])

  const loadRevenueData = async () => {
    setLoading(true)
    try {
      const data = await getFinancialTransactions(200, 0, "income")
      setRevenues(data)
    } catch (error) {
      console.error("Error loading revenue data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate revenue metrics
  const totalRevenue = revenues.reduce((sum, rev) => sum + rev.amount, 0)
  const averageTransaction = revenues.length > 0 ? totalRevenue / revenues.length : 0
  const transactionCount = revenues.length

  // Group revenue by month
  const monthlyRevenue = revenues.reduce(
    (acc, transaction) => {
      const month = new Date(transaction.transaction_date).toLocaleDateString("en", { month: "short", year: "numeric" })
      acc[month] = (acc[month] || 0) + transaction.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const monthlyData = Object.entries(monthlyRevenue).map(([month, amount]) => ({
    month,
    amount,
    transactions: revenues.filter(
      (r) => new Date(r.transaction_date).toLocaleDateString("en", { month: "short", year: "numeric" }) === month,
    ).length,
  }))

  // Group by payment method
  const paymentMethodData = revenues.reduce(
    (acc, transaction) => {
      const method = transaction.payment_method || "unknown"
      acc[method] = (acc[method] || 0) + transaction.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const paymentChartData = Object.entries(paymentMethodData).map(([method, amount]) => ({
    name:
      method === "cash"
        ? language === "ar"
          ? "نقدي"
          : "Cash"
        : method === "card"
          ? language === "ar"
            ? "بطاقة"
            : "Card"
          : method === "bank_transfer"
            ? language === "ar"
              ? "تحويل بنكي"
              : "Bank Transfer"
            : method === "mobile_payment"
              ? language === "ar"
                ? "دفع محمول"
                : "Mobile Payment"
              : language === "ar"
                ? "غير محدد"
                : "Unknown",
    value: amount,
  }))

  // Revenue growth calculation
  const currentMonth = monthlyData[monthlyData.length - 1]?.amount || 0
  const previousMonth = monthlyData[monthlyData.length - 2]?.amount || 0
  const growthRate = previousMonth > 0 ? ((currentMonth - previousMonth) / previousMonth) * 100 : 0

  // Top revenue days
  const dailyRevenue = revenues.reduce(
    (acc, transaction) => {
      const day = new Date(transaction.transaction_date).toLocaleDateString()
      acc[day] = (acc[day] || 0) + transaction.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const topDays = Object.entries(dailyRevenue)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([day, amount]) => ({ day, amount }))

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{language === "ar" ? "تحليلات الإيرادات" : "Revenue Analytics"}</h2>
          <p className="text-muted-foreground">
            {language === "ar"
              ? "تحليل مفصل لمصادر الإيرادات والأداء"
              : "Detailed analysis of revenue sources and performance"}
          </p>
        </div>

        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">{language === "ar" ? "3 أشهر" : "3 Months"}</SelectItem>
              <SelectItem value="6months">{language === "ar" ? "6 أشهر" : "6 Months"}</SelectItem>
              <SelectItem value="12months">{language === "ar" ? "12 شهر" : "12 Months"}</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {language === "ar" ? "تصدير" : "Export"}
          </Button>
        </div>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === "ar" ? "إجمالي الإيرادات" : "Total Revenue"}
                </p>
                <p className="text-2xl font-bold">{totalRevenue.toLocaleString()} TND</p>
                <div className="flex items-center text-xs mt-1">
                  <TrendingUp className={`h-3 w-3 mr-1 ${growthRate >= 0 ? "text-green-600" : "text-red-600"}`} />
                  <span className={growthRate >= 0 ? "text-green-600" : "text-red-600"}>
                    {growthRate >= 0 ? "+" : ""}
                    {growthRate.toFixed(1)}%
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {language === "ar" ? "من الشهر الماضي" : "from last month"}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === "ar" ? "متوسط المعاملة" : "Average Transaction"}
                </p>
                <p className="text-2xl font-bold">{averageTransaction.toLocaleString()} TND</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === "ar" ? "لكل معاملة" : "per transaction"}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === "ar" ? "عدد المعاملات" : "Total Transactions"}
                </p>
                <p className="text-2xl font-bold">{transactionCount}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === "ar" ? "معاملة دخل" : "income transactions"}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === "ar" ? "أعلى يوم" : "Best Day"}
                </p>
                <p className="text-2xl font-bold">{topDays[0]?.amount.toLocaleString() || 0} TND</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {topDays[0]?.day || (language === "ar" ? "لا يوجد" : "No data")}
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-50">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {language === "ar" ? "اتجاه الإيرادات الشهرية" : "Monthly Revenue Trend"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toLocaleString()} TND`,
                    language === "ar" ? "الإيرادات" : "Revenue",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Methods Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {language === "ar" ? "توزيع طرق الدفع" : "Payment Methods Distribution"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} TND`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transaction Volume by Month */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {language === "ar" ? "حجم المعاملات الشهرية" : "Monthly Transaction Volume"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`${value}`, language === "ar" ? "المعاملات" : "Transactions"]}
                />
                <Bar dataKey="transactions" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Revenue Days */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {language === "ar" ? "أفضل أيام الإيرادات" : "Top Revenue Days"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDays.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-800"
                        : index === 1
                          ? "bg-gray-100 text-gray-800"
                          : index === 2
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{day.day}</div>
                    <div className="text-sm text-muted-foreground">
                      {language === "ar" ? "يوم عالي الإيرادات" : "High revenue day"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{day.amount.toLocaleString()} TND</div>
                  <div className="text-sm text-muted-foreground">
                    {((day.amount / totalRevenue) * 100).toFixed(1)}% {language === "ar" ? "من الإجمالي" : "of total"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
