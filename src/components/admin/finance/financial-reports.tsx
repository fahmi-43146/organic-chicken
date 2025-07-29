"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Printer } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getFinancialStats, getMonthlySummaries, getFinancialTransactions } from "@/lib/financial"
import type { FinancialStats, MonthlySummary, FinancialTransaction } from "@/lib/types"

export function FinancialReports() {
  const { language } = useLanguage()

  const [stats, setStats] = useState<FinancialStats | null>(null)
  const [monthlySummaries, setMonthlySummaries] = useState<MonthlySummary[]>([])
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [reportType, setReportType] = useState("monthly")
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth() - 5, 1).toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    loadReportData()
  }, [reportType, dateRange])

  const loadReportData = async () => {
    setLoading(true)
    try {
      const [statsData, summariesData, transactionsData] = await Promise.all([
        getFinancialStats(dateRange.start, dateRange.end),
        getMonthlySummaries(12),
        getFinancialTransactions(100, 0),
      ])

      setStats(statsData)
      setMonthlySummaries(summariesData)
      setTransactions(transactionsData)
    } catch (error) {
      console.error("Error loading report data:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = (format: "pdf" | "excel" | "csv") => {
    // This would implement actual export functionality
    console.log(`Exporting ${reportType} report as ${format}`)
  }

  const printReport = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{language === "ar" ? "التقارير المالية" : "Financial Reports"}</h2>
          <p className="text-muted-foreground">
            {language === "ar" ? "تقارير مفصلة وقابلة للتصدير" : "Detailed and exportable financial reports"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={printReport}>
            <Printer className="h-4 w-4 mr-2" />
            {language === "ar" ? "طباعة" : "Print"}
          </Button>

          <Select defaultValue="pdf" onValueChange={(value: "pdf" | "excel" | "csv") => exportReport(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  PDF
                </div>
              </SelectItem>
              <SelectItem value="excel">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Excel
                </div>
              </SelectItem>
              <SelectItem value="csv">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  CSV
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Report Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div>
              <Label>{language === "ar" ? "نوع التقرير" : "Report Type"}</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">{language === "ar" ? "تقرير شهري" : "Monthly Report"}</SelectItem>
                  <SelectItem value="quarterly">{language === "ar" ? "تقرير ربع سنوي" : "Quarterly Report"}</SelectItem>
                  <SelectItem value="yearly">{language === "ar" ? "تقرير سنوي" : "Yearly Report"}</SelectItem>
                  <SelectItem value="custom">{language === "ar" ? "تقرير مخصص" : "Custom Report"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{language === "ar" ? "من تاريخ" : "From Date"}</Label>
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>

            <div>
              <Label>{language === "ar" ? "إلى تاريخ" : "To Date"}</Label>
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>

            <Button onClick={loadReportData} className="mt-6">
              {language === "ar" ? "تحديث التقرير" : "Update Report"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">{language === "ar" ? "الملخص" : "Summary"}</TabsTrigger>
          <TabsTrigger value="detailed">{language === "ar" ? "مفصل" : "Detailed"}</TabsTrigger>
          <TabsTrigger value="comparison">{language === "ar" ? "مقارنة" : "Comparison"}</TabsTrigger>
          <TabsTrigger value="analysis">{language === "ar" ? "تحليل" : "Analysis"}</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="space-y-6">
            {/* Executive Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {language === "ar" ? "الملخص التنفيذي" : "Executive Summary"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {stats?.totalRevenue?.toLocaleString() || 0} TND
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === "ar" ? "إجمالي الإيرادات" : "Total Revenue"}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {stats?.totalExpenses?.toLocaleString() || 0} TND
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === "ar" ? "إجمالي المصروفات" : "Total Expenses"}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {stats?.netProfit?.toLocaleString() || 0} TND
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === "ar" ? "صافي الربح" : "Net Profit"}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">{language === "ar" ? "النقاط الرئيسية" : "Key Highlights"}</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>
                      •{" "}
                      {language === "ar"
                        ? `هامش الربح: ${stats?.profitMargin?.toFixed(1) || 0}%`
                        : `Profit Margin: ${stats?.profitMargin?.toFixed(1) || 0}%`}
                    </li>
                    <li>
                      •{" "}
                      {language === "ar"
                        ? `النمو الشهري: +${stats?.monthlyGrowth?.toFixed(1) || 0}%`
                        : `Monthly Growth: +${stats?.monthlyGrowth?.toFixed(1) || 0}%`}
                    </li>
                    <li>
                      •{" "}
                      {language === "ar"
                        ? `متوسط قيمة المعاملة: ${stats?.averageTransactionValue?.toLocaleString() || 0} TND`
                        : `Average Transaction: ${stats?.averageTransactionValue?.toLocaleString() || 0} TND`}
                    </li>
                    <li>
                      •{" "}
                      {language === "ar"
                        ? `إجمالي المعاملات: ${stats?.totalTransactions || 0}`
                        : `Total Transactions: ${stats?.totalTransactions || 0}`}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {language === "ar" ? "الأداء الشهري" : "Monthly Performance"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === "ar" ? "الشهر" : "Month"}</TableHead>
                      <TableHead>{language === "ar" ? "الإيرادات" : "Revenue"}</TableHead>
                      <TableHead>{language === "ar" ? "المصروفات" : "Expenses"}</TableHead>
                      <TableHead>{language === "ar" ? "الربح" : "Profit"}</TableHead>
                      <TableHead>{language === "ar" ? "الطلبات" : "Orders"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlySummaries.slice(0, 6).map((summary) => (
                      <TableRow key={summary.id}>
                        <TableCell>
                          {new Date(summary.year, summary.month - 1).toLocaleDateString(
                            language === "ar" ? "ar-TN" : "en-US",
                            { month: "long", year: "numeric" },
                          )}
                        </TableCell>
                        <TableCell className="text-green-600 font-medium">
                          {summary.total_revenue.toLocaleString()} TND
                        </TableCell>
                        <TableCell className="text-red-600 font-medium">
                          {summary.total_expenses.toLocaleString()} TND
                        </TableCell>
                        <TableCell
                          className={`font-medium ${summary.net_profit >= 0 ? "text-blue-600" : "text-red-600"}`}
                        >
                          {summary.net_profit.toLocaleString()} TND
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{summary.total_orders}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {language === "ar" ? "التقرير المفصل" : "Detailed Report"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === "ar" ? "التاريخ" : "Date"}</TableHead>
                    <TableHead>{language === "ar" ? "النوع" : "Type"}</TableHead>
                    <TableHead>{language === "ar" ? "الوصف" : "Description"}</TableHead>
                    <TableHead>{language === "ar" ? "المبلغ" : "Amount"}</TableHead>
                    <TableHead>{language === "ar" ? "طريقة الدفع" : "Payment Method"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(0, 20).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.transaction_date).toLocaleDateString(
                          language === "ar" ? "ar-TN" : "en-US",
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={transaction.transaction_type === "income" ? "default" : "secondary"}>
                          {transaction.transaction_type === "income"
                            ? language === "ar"
                              ? "دخل"
                              : "Income"
                            : language === "ar"
                              ? "مصروف"
                              : "Expense"}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell
                        className={`font-medium ${
                          transaction.transaction_type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.transaction_type === "income" ? "+" : "-"}
                        {transaction.amount.toLocaleString()} TND
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {transaction.payment_method === "cash"
                            ? language === "ar"
                              ? "نقدي"
                              : "Cash"
                            : transaction.payment_method === "card"
                              ? language === "ar"
                                ? "بطاقة"
                                : "Card"
                              : transaction.payment_method === "bank_transfer"
                                ? language === "ar"
                                  ? "تحويل بنكي"
                                  : "Bank Transfer"
                                : transaction.payment_method || "N/A"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {language === "ar" ? "مقارنة الفترات" : "Period Comparison"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">{language === "ar" ? "الفترة الحالية" : "Current Period"}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{language === "ar" ? "الإيرادات:" : "Revenue:"}</span>
                        <span className="font-medium text-green-600">
                          {stats?.totalRevenue?.toLocaleString() || 0} TND
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === "ar" ? "المصروفات:" : "Expenses:"}</span>
                        <span className="font-medium text-red-600">
                          {stats?.totalExpenses?.toLocaleString() || 0} TND
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">{language === "ar" ? "صافي الربح:" : "Net Profit:"}</span>
                        <span className="font-bold text-blue-600">{stats?.netProfit?.toLocaleString() || 0} TND</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">{language === "ar" ? "الفترة السابقة" : "Previous Period"}</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>{language === "ar" ? "الإيرادات:" : "Revenue:"}</span>
                        <span>13,250 TND</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === "ar" ? "المصروفات:" : "Expenses:"}</span>
                        <span>8,100 TND</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">{language === "ar" ? "صافي الربح:" : "Net Profit:"}</span>
                        <span className="font-bold">5,150 TND</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                    {language === "ar" ? "التغيير" : "Change"}
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-green-600">+16.4%</div>
                      <div className="text-muted-foreground">{language === "ar" ? "الإيرادات" : "Revenue"}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-red-600">+10.5%</div>
                      <div className="text-muted-foreground">{language === "ar" ? "المصروفات" : "Expenses"}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-600">+25.6%</div>
                      <div className="text-muted-foreground">{language === "ar" ? "الربح" : "Profit"}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  {language === "ar" ? "التحليل المالي" : "Financial Analysis"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">{language === "ar" ? "نقاط القوة" : "Strengths"}</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        {language === "ar" ? "نمو مستمر في الإيرادات الشهرية" : "Consistent monthly revenue growth"}
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        {language === "ar" ? "هامش ربح صحي يزيد عن 40%" : "Healthy profit margin above 40%"}
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        {language === "ar"
                          ? "تنوع في طرق الدفع يقلل المخاطر"
                          : "Diversified payment methods reduce risk"}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">{language === "ar" ? "نقاط التحسين" : "Areas for Improvement"}</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-orange-600" />
                        {language === "ar"
                          ? "بعض فئات المصروفات تتجاوز الميزانية"
                          : "Some expense categories exceed budget"}
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-orange-600" />
                        {language === "ar" ? "الحاجة لتحسين كفاءة التكاليف" : "Need to improve cost efficiency"}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">{language === "ar" ? "التوصيات" : "Recommendations"}</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        {language === "ar"
                          ? "مراجعة ميزانيات فئات المصروفات المتجاوزة"
                          : "Review budgets for over-spending categories"}
                      </li>
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        {language === "ar"
                          ? "تطوير استراتيجيات لزيادة متوسط قيمة المعاملة"
                          : "Develop strategies to increase average transaction value"}
                      </li>
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        {language === "ar"
                          ? "تحسين عمليات التحصيل والدفع"
                          : "Optimize collection and payment processes"}
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
