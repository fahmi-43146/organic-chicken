"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, AlertTriangle, Target } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { FinancialStats, ChartData } from "@/lib/types"

interface FinancialOverviewProps {
  stats: FinancialStats | null
  revenueChart: ChartData[]
  expenseChart: ChartData[]
}

const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"]

export function FinancialOverview({ stats, revenueChart, expenseChart }: FinancialOverviewProps) {
  const { language } = useLanguage()

  const budgetCategories = [
    {
      name: language === "ar" ? "علف" : "Feed",
      budget: 5000,
      spent: 3200,
      percentage: 64,
      status: "good" as const,
    },
    {
      name: language === "ar" ? "عمالة" : "Labor",
      budget: 8000,
      spent: 7200,
      percentage: 90,
      status: "warning" as const,
    },
    {
      name: language === "ar" ? "بيطري" : "Veterinary",
      budget: 2000,
      spent: 1200,
      percentage: 60,
      status: "good" as const,
    },
    {
      name: language === "ar" ? "مرافق" : "Utilities",
      budget: 1500,
      spent: 1600,
      percentage: 107,
      status: "danger" as const,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "danger":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return "default"
      case "warning":
        return "secondary"
      case "danger":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue vs Expenses Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            {language === "ar" ? "الإيرادات مقابل المصروفات" : "Revenue vs Expenses"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value.toLocaleString()} TND`, ""]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="income"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
                name={language === "ar" ? "الإيرادات" : "Revenue"}
              />
              <Area
                type="monotone"
                dataKey="expense"
                stackId="2"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.6}
                name={language === "ar" ? "المصروفات" : "Expenses"}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Expense Categories Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {language === "ar" ? "توزيع المصروفات" : "Expense Distribution"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseChart}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {expenseChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value.toLocaleString()} TND`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {expenseChart.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value.toLocaleString()} TND</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Tracking */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            {language === "ar" ? "تتبع الميزانية" : "Budget Tracking"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{category.name}</span>
                    <Badge variant={getStatusBadge(category.status) as any}>{category.percentage}%</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {category.spent.toLocaleString()} / {category.budget.toLocaleString()} TND
                  </div>
                </div>
                <Progress value={Math.min(category.percentage, 100)} className="h-2" />
                {category.percentage > 100 && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {language === "ar" ? "تجاوز الميزانية" : "Budget exceeded"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "ar" ? "المؤشرات الرئيسية" : "Key Metrics"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{language === "ar" ? "هامش الربح" : "Profit Margin"}</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-medium">{stats?.profitMargin?.toFixed(1) || 0}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {language === "ar" ? "متوسط قيمة المعاملة" : "Avg Transaction"}
            </span>
            <span className="font-medium">{stats?.averageTransactionValue?.toLocaleString() || 0} TND</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {language === "ar" ? "إجمالي المعاملات" : "Total Transactions"}
            </span>
            <span className="font-medium">{stats?.totalTransactions || 0}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {language === "ar" ? "أعلى فئة مصروفات" : "Top Expense Category"}
            </span>
            <span className="font-medium">{stats?.topExpenseCategory || "N/A"}</span>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{language === "ar" ? "النمو الشهري" : "Monthly Growth"}</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-bold text-green-600">+{stats?.monthlyGrowth?.toFixed(1) || 0}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
