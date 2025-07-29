"use client"

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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  ComposedChart,
} from "recharts"
import { TrendingUp, Download, Calendar, BarChart3, TrendingDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { ChartData } from "@/lib/types"

interface FinancialChartsProps {
  revenueChart: ChartData[]
  expenseChart: ChartData[]
}

const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16", "#F97316", "#EC4899"]

export function FinancialCharts({ revenueChart, expenseChart }: FinancialChartsProps) {
  const { language } = useLanguage()

  const profitMarginData = revenueChart.map((item) => ({
    ...item,
    margin: item.income && item.expense ? ((item.income - item.expense) / item.income) * 100 : 0,
  }))

  const cashFlowData = revenueChart.map((item, index) => ({
    name: item.name,
    cashFlow:
      index === 0
        ? item.profit || 0
        : revenueChart.slice(0, index + 1).reduce((sum, curr) => sum + (curr.profit || 0), 0),
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{language === "ar" ? "التحليلات المالية" : "Financial Analytics"}</h2>
          <p className="text-muted-foreground">
            {language === "ar" ? "رسوم بيانية مفصلة للأداء المالي" : "Detailed charts for financial performance"}
          </p>
        </div>

        <div className="flex gap-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">{language === "ar" ? "3 أشهر" : "3 Months"}</SelectItem>
              <SelectItem value="6months">{language === "ar" ? "6 أشهر" : "6 Months"}</SelectItem>
              <SelectItem value="12months">{language === "ar" ? "12 شهر" : "12 Months"}</SelectItem>
              <SelectItem value="24months">{language === "ar" ? "24 شهر" : "24 Months"}</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {language === "ar" ? "تصدير" : "Export"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {language === "ar" ? "اتجاه الإيرادات والمصروفات" : "Revenue vs Expenses Trend"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={revenueChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value.toLocaleString()} TND`,
                    name === "income"
                      ? language === "ar"
                        ? "الإيرادات"
                        : "Revenue"
                      : name === "expense"
                        ? language === "ar"
                          ? "المصروفات"
                          : "Expenses"
                        : language === "ar"
                          ? "الربح"
                          : "Profit",
                  ]}
                />
                <Bar yAxisId="left" dataKey="income" fill="#10B981" name="income" />
                <Bar yAxisId="left" dataKey="expense" fill="#EF4444" name="expense" />
                <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#8B5CF6" strokeWidth={3} name="profit" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Categories Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {language === "ar" ? "توزيع فئات المصروفات" : "Expense Categories Distribution"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} TND`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Profit Margin Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {language === "ar" ? "اتجاه هامش الربح" : "Profit Margin Trend"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={profitMarginData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toFixed(1)}%`,
                    language === "ar" ? "هامش الربح" : "Profit Margin",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="margin"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Revenue Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {language === "ar" ? "تفصيل الإيرادات الشهرية" : "Monthly Revenue Breakdown"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value.toLocaleString()} TND`, ""]} />
                <Area type="monotone" dataKey="income" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cumulative Cash Flow */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {language === "ar" ? "التدفق النقدي التراكمي" : "Cumulative Cash Flow"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toLocaleString()} TND`,
                    language === "ar" ? "التدفق النقدي" : "Cash Flow",
                  ]}
                />
                <Area type="monotone" dataKey="cashFlow" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              {language === "ar" ? "اتجاه المصروفات" : "Expense Trend"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toLocaleString()} TND`,
                    language === "ar" ? "المصروفات" : "Expenses",
                  ]}
                />
                <Bar dataKey="expense" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
