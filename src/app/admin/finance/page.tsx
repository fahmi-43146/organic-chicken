"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, TrendingDown, Plus, Download, Filter, Wallet } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { getFinancialStats, getRevenueExpenseChart, getExpenseCategoryChart } from "@/lib/financial"
import type { FinancialStats, ChartData } from "@/lib/types"
import { FinancialOverview } from "@/components/admin/finance/financial-overview"
import { TransactionsList } from "@/components/admin/finance/transactions-list"
import { FinancialCharts } from "@/components/admin/finance/financial-charts"
import { ExpenseManagement } from "@/components/admin/finance/expense-management"
import { RevenueAnalytics } from "@/components/admin/finance/revenue-analytics"
import { FinancialReports } from "@/components/admin/finance/financial-reports"

export default function FinancePage() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key as any, language)

  const [stats, setStats] = useState<FinancialStats | null>(null)
  const [revenueChart, setRevenueChart] = useState<ChartData[]>([])
  const [expenseChart, setExpenseChart] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<{ start?: string; end?: string }>({})

  useEffect(() => {
    loadFinancialData()
  }, [dateRange])

  const loadFinancialData = async () => {
    setLoading(true)
    try {
      const [statsData, revenueData, expenseData] = await Promise.all([
        getFinancialStats(dateRange.start, dateRange.end),
        getRevenueExpenseChart(6),
        getExpenseCategoryChart(),
      ])

      setStats(statsData)
      setRevenueChart(revenueData)
      setExpenseChart(expenseData)
    } catch (error) {
      console.error("Error loading financial data:", error)
    } finally {
      setLoading(false)
    }
  }

  const quickStats = [
    {
      title: language === "ar" ? "إجمالي الإيرادات" : language === "fr" ? "Revenus Totaux" : "Total Revenue",
      value: `${stats?.totalRevenue?.toLocaleString() || "0"} TND`,
      change: `+${stats?.monthlyGrowth || 0}%`,
      changeType: "positive" as const,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: language === "ar" ? "إجمالي المصروفات" : language === "fr" ? "Dépenses Totales" : "Total Expenses",
      value: `${stats?.totalExpenses?.toLocaleString() || "0"} TND`,
      change: "+8.2%",
      changeType: "negative" as const,
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: language === "ar" ? "صافي الربح" : language === "fr" ? "Bénéfice Net" : "Net Profit",
      value: `${stats?.netProfit?.toLocaleString() || "0"} TND`,
      change: `+${stats?.profitMargin?.toFixed(1) || 0}%`,
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: language === "ar" ? "التدفق النقدي" : language === "fr" ? "Flux de Trésorerie" : "Cash Flow",
      value: `${stats?.cashFlow?.toLocaleString() || "0"} TND`,
      change: "+15.3%",
      changeType: "positive" as const,
      icon: Wallet,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {language === "ar" ? "إدارة الأموال" : language === "fr" ? "Gestion Financière" : "Financial Management"}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
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
          <h1 className="text-3xl font-bold">
            {language === "ar" ? "إدارة الأموال" : language === "fr" ? "Gestion Financière" : "Financial Management"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === "ar"
              ? "تتبع الإيرادات والمصروفات والأرباح"
              : language === "fr"
                ? "Suivez les revenus, dépenses et bénéfices"
                : "Track revenue, expenses, and profits"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {language === "ar" ? "تصفية" : language === "fr" ? "Filtrer" : "Filter"}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {language === "ar" ? "تصدير" : language === "fr" ? "Exporter" : "Export"}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            {language === "ar" ? "معاملة جديدة" : language === "fr" ? "Nouvelle Transaction" : "New Transaction"}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center text-xs mt-1">
                    <TrendingUp
                      className={`h-3 w-3 mr-1 ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
                    />
                    <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {language === "ar"
                        ? "من الشهر الماضي"
                        : language === "fr"
                          ? "du mois dernier"
                          : "from last month"}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            {language === "ar" ? "نظرة عامة" : language === "fr" ? "Aperçu" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="transactions">
            {language === "ar" ? "المعاملات" : language === "fr" ? "Transactions" : "Transactions"}
          </TabsTrigger>
          <TabsTrigger value="expenses">
            {language === "ar" ? "المصروفات" : language === "fr" ? "Dépenses" : "Expenses"}
          </TabsTrigger>
          <TabsTrigger value="revenue">
            {language === "ar" ? "الإيرادات" : language === "fr" ? "Revenus" : "Revenue"}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === "ar" ? "التحليلات" : language === "fr" ? "Analyses" : "Analytics"}
          </TabsTrigger>
          <TabsTrigger value="reports">
            {language === "ar" ? "التقارير" : language === "fr" ? "Rapports" : "Reports"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <FinancialOverview stats={stats} revenueChart={revenueChart} expenseChart={expenseChart} />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionsList />
        </TabsContent>

        <TabsContent value="expenses">
          <ExpenseManagement />
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueAnalytics />
        </TabsContent>

        <TabsContent value="analytics">
          <FinancialCharts revenueChart={revenueChart} expenseChart={expenseChart} />
        </TabsContent>

        <TabsContent value="reports">
          <FinancialReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}
