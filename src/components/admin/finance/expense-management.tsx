"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, AlertTriangle, Target, DollarSign } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getExpenseCategories, getFinancialTransactions } from "@/lib/financial"
import type { ExpenseCategory, FinancialTransaction } from "@/lib/types"

export function ExpenseManagement() {
  const { language } = useLanguage()
  const { toast } = useToast()

  const [categories, setCategories] = useState<ExpenseCategory[]>([])
  const [expenses, setExpenses] = useState<FinancialTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [categoriesData, expensesData] = await Promise.all([
        getExpenseCategories(),
        getFinancialTransactions(100, 0, "expense"),
      ])
      setCategories(categoriesData)
      setExpenses(expensesData)
    } catch (error) {
      console.error("Error loading expense data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate spending by category
  const categorySpending = categories.map((category) => {
    const categoryExpenses = expenses.filter((expense) => expense.category === category.name_en.toLowerCase())
    const totalSpent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const budgetUsed = category.budget_limit ? (totalSpent / category.budget_limit) * 100 : 0

    return {
      ...category,
      totalSpent,
      budgetUsed,
      transactionCount: categoryExpenses.length,
      status: budgetUsed > 100 ? "over" : budgetUsed > 80 ? "warning" : "good",
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "over":
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
      case "over":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
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
          <h2 className="text-2xl font-bold">{language === "ar" ? "إدارة المصروفات" : "Expense Management"}</h2>
          <p className="text-muted-foreground">
            {language === "ar"
              ? "تتبع وإدارة فئات المصروفات والميزانيات"
              : "Track and manage expense categories and budgets"}
          </p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {language === "ar" ? "فئة جديدة" : "New Category"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{language === "ar" ? "إضافة فئة مصروفات جديدة" : "Add New Expense Category"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{language === "ar" ? "اسم الفئة (عربي)" : "Category Name (Arabic)"}</Label>
                <Input placeholder={language === "ar" ? "مثال: علف" : "Example: علف"} />
              </div>
              <div>
                <Label>{language === "ar" ? "اسم الفئة (إنجليزي)" : "Category Name (English)"}</Label>
                <Input placeholder="Example: Feed" />
              </div>
              <div>
                <Label>{language === "ar" ? "حد الميزانية" : "Budget Limit"}</Label>
                <Input type="number" placeholder="5000.00" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </Button>
                <Button>{language === "ar" ? "إضافة" : "Add"}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categorySpending.slice(0, 4).map((category, index) => (
          <Card key={category.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {language === "ar" ? category.name_ar : category.name_en}
                  </p>
                  <p className="text-2xl font-bold">{category.totalSpent.toLocaleString()} TND</p>
                </div>
                <div
                  className={`p-2 rounded-full ${
                    category.status === "good"
                      ? "bg-green-100"
                      : category.status === "warning"
                        ? "bg-yellow-100"
                        : "bg-red-100"
                  }`}
                >
                  <DollarSign className={`h-4 w-4 ${getStatusColor(category.status)}`} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{language === "ar" ? "الميزانية" : "Budget"}</span>
                  <span>{category.budget_limit?.toLocaleString() || 0} TND</span>
                </div>
                <Progress value={Math.min(category.budgetUsed, 100)} className="h-2" />
                <div className="flex justify-between items-center text-xs">
                  <span className={getStatusColor(category.status)}>
                    {category.budgetUsed.toFixed(1)}% {language === "ar" ? "مستخدم" : "used"}
                  </span>
                  <span className="text-muted-foreground">
                    {category.transactionCount} {language === "ar" ? "معاملة" : "transactions"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {language === "ar" ? "تفاصيل فئات المصروفات" : "Expense Categories Details"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === "ar" ? "الفئة" : "Category"}</TableHead>
                <TableHead>{language === "ar" ? "المبلغ المنفق" : "Amount Spent"}</TableHead>
                <TableHead>{language === "ar" ? "الميزانية" : "Budget"}</TableHead>
                <TableHead>{language === "ar" ? "النسبة المستخدمة" : "Usage %"}</TableHead>
                <TableHead>{language === "ar" ? "المعاملات" : "Transactions"}</TableHead>
                <TableHead>{language === "ar" ? "الحالة" : "Status"}</TableHead>
                <TableHead>{language === "ar" ? "الإجراءات" : "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categorySpending.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{language === "ar" ? category.name_ar : category.name_en}</div>
                      <div className="text-sm text-muted-foreground">
                        {language === "ar" ? category.description_ar : category.description_en}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{category.totalSpent.toLocaleString()} TND</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{category.budget_limit?.toLocaleString() || 0} TND</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min(category.budgetUsed, 100)} className="h-2 w-16" />
                      <span className={`text-sm font-medium ${getStatusColor(category.status)}`}>
                        {category.budgetUsed.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{category.transactionCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(category.status) as any}>
                      {category.status === "good"
                        ? language === "ar"
                          ? "جيد"
                          : "Good"
                        : category.status === "warning"
                          ? language === "ar"
                            ? "تحذير"
                            : "Warning"
                          : language === "ar"
                            ? "تجاوز"
                            : "Over Budget"}
                    </Badge>
                    {category.status === "over" && (
                      <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                        <AlertTriangle className="h-3 w-3" />
                        {language === "ar" ? "تجاوز الميزانية" : "Budget exceeded"}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Budget Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            {language === "ar" ? "تنبيهات الميزانية" : "Budget Alerts"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categorySpending
              .filter((category) => category.status !== "good")
              .map((category) => (
                <div
                  key={category.id}
                  className={`p-4 rounded-lg border ${
                    category.status === "over" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle
                        className={`h-5 w-5 ${category.status === "over" ? "text-red-600" : "text-yellow-600"}`}
                      />
                      <div>
                        <div className="font-medium">{language === "ar" ? category.name_ar : category.name_en}</div>
                        <div className="text-sm text-muted-foreground">
                          {category.status === "over"
                            ? language === "ar"
                              ? "تجاوز الميزانية المحددة"
                              : "Budget limit exceeded"
                            : language === "ar"
                              ? "اقتراب من حد الميزانية"
                              : "Approaching budget limit"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {category.totalSpent.toLocaleString()} / {category.budget_limit?.toLocaleString()} TND
                      </div>
                      <div className={`text-sm ${getStatusColor(category.status)}`}>
                        {category.budgetUsed.toFixed(1)}% {language === "ar" ? "مستخدم" : "used"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {categorySpending.filter((category) => category.status !== "good").length === 0 && (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-green-600 mb-2">
                  {language === "ar" ? "جميع الميزانيات ضمن الحدود المسموحة" : "All budgets are within limits"}
                </h3>
                <p className="text-muted-foreground">
                  {language === "ar" ? "لا توجد تنبيهات ميزانية حالياً" : "No budget alerts at this time"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
