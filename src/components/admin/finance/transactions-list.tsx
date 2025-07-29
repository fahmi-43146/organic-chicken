"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Search,
  Download,
  Edit,
  Trash2,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import {
  getFinancialTransactions,
  createFinancialTransaction,
  updateFinancialTransaction,
  deleteFinancialTransaction,
} from "@/lib/financial"
import type { FinancialTransaction, TransactionType, PaymentMethodType, ExpenseCategoryType } from "@/lib/types"

export function TransactionsList() {
  const { language } = useLanguage()
  const { toast } = useToast()

  const [transactions, setTransactions] = useState<FinancialTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<TransactionType | "all">("all")
  const [sortBy, setSortBy] = useState<"date" | "amount">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<FinancialTransaction | null>(null)

  const [formData, setFormData] = useState({
    transaction_type: "income" as TransactionType,
    amount: "",
    description: "",
    category: "" as ExpenseCategoryType | "",
    payment_method: "cash" as PaymentMethodType,
    transaction_date: new Date().toISOString().split("T")[0],
    notes: "",
    is_recurring: false,
    tax_amount: "0",
  })

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    setLoading(true)
    try {
      const data = await getFinancialTransactions(100, 0, filterType === "all" ? undefined : filterType)
      setTransactions(data)
    } catch (error) {
      console.error("Error loading transactions:", error)
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "فشل في تحميل المعاملات" : "Failed to load transactions",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.amount || !formData.description) {
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const transactionData = {
        ...formData,
        amount: Number.parseFloat(formData.amount),
        tax_amount: Number.parseFloat(formData.tax_amount),
        category: formData.category || undefined,
      }

      if (editingTransaction) {
        await updateFinancialTransaction(editingTransaction.id, transactionData)
        toast({
          title: language === "ar" ? "تم التحديث" : "Updated",
          description: language === "ar" ? "تم تحديث المعاملة بنجاح" : "Transaction updated successfully",
        })
      } else {
        await createFinancialTransaction(transactionData)
        toast({
          title: language === "ar" ? "تم الإنشاء" : "Created",
          description: language === "ar" ? "تم إنشاء المعاملة بنجاح" : "Transaction created successfully",
        })
      }

      setShowAddDialog(false)
      setEditingTransaction(null)
      resetForm()
      loadTransactions()
    } catch (error) {
      console.error("Error saving transaction:", error)
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "فشل في حفظ المعاملة" : "Failed to save transaction",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        language === "ar" ? "هل أنت متأكد من حذف هذه المعاملة؟" : "Are you sure you want to delete this transaction?",
      )
    ) {
      return
    }

    try {
      await deleteFinancialTransaction(id)
      toast({
        title: language === "ar" ? "تم الحذف" : "Deleted",
        description: language === "ar" ? "تم حذف المعاملة بنجاح" : "Transaction deleted successfully",
      })
      loadTransactions()
    } catch (error) {
      console.error("Error deleting transaction:", error)
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "فشل في حذف المعاملة" : "Failed to delete transaction",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      transaction_type: "income",
      amount: "",
      description: "",
      category: "",
      payment_method: "cash",
      transaction_date: new Date().toISOString().split("T")[0],
      notes: "",
      is_recurring: false,
      tax_amount: "0",
    })
  }

  const handleEdit = (transaction: FinancialTransaction) => {
    setEditingTransaction(transaction)
    setFormData({
      transaction_type: transaction.transaction_type,
      amount: transaction.amount.toString(),
      description: transaction.description,
      category: transaction.category || "",
      payment_method: transaction.payment_method || "cash",
      transaction_date: transaction.transaction_date.split("T")[0],
      notes: transaction.notes || "",
      is_recurring: transaction.is_recurring,
      tax_amount: transaction.tax_amount.toString(),
    })
    setShowAddDialog(true)
  }

  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === "all" || transaction.transaction_type === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.transaction_date).getTime()
        const dateB = new Date(b.transaction_date).getTime()
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA
      } else {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
      }
    })

  const getTransactionTypeIcon = (type: TransactionType) => {
    switch (type) {
      case "income":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "expense":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "refund":
        return <DollarSign className="h-4 w-4 text-blue-600" />
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />
    }
  }

  const getTransactionTypeBadge = (type: TransactionType) => {
    switch (type) {
      case "income":
        return <Badge className="bg-green-100 text-green-800">{language === "ar" ? "دخل" : "Income"}</Badge>
      case "expense":
        return <Badge className="bg-red-100 text-red-800">{language === "ar" ? "مصروف" : "Expense"}</Badge>
      case "refund":
        return <Badge className="bg-blue-100 text-blue-800">{language === "ar" ? "استرداد" : "Refund"}</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const expenseCategories = [
    { value: "feed", label: language === "ar" ? "علف" : "Feed" },
    { value: "veterinary", label: language === "ar" ? "بيطري" : "Veterinary" },
    { value: "equipment", label: language === "ar" ? "معدات" : "Equipment" },
    { value: "utilities", label: language === "ar" ? "مرافق" : "Utilities" },
    { value: "labor", label: language === "ar" ? "عمالة" : "Labor" },
    { value: "transport", label: language === "ar" ? "نقل" : "Transport" },
    { value: "marketing", label: language === "ar" ? "تسويق" : "Marketing" },
    { value: "maintenance", label: language === "ar" ? "صيانة" : "Maintenance" },
    { value: "insurance", label: language === "ar" ? "تأمين" : "Insurance" },
    { value: "other", label: language === "ar" ? "أخرى" : "Other" },
  ]

  const paymentMethods = [
    { value: "cash", label: language === "ar" ? "نقدي" : "Cash" },
    { value: "card", label: language === "ar" ? "بطاقة" : "Card" },
    { value: "bank_transfer", label: language === "ar" ? "تحويل بنكي" : "Bank Transfer" },
    { value: "mobile_payment", label: language === "ar" ? "دفع محمول" : "Mobile Payment" },
    { value: "check", label: language === "ar" ? "شيك" : "Check" },
  ]

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{language === "ar" ? "المعاملات المالية" : "Financial Transactions"}</h2>
          <p className="text-muted-foreground">
            {language === "ar" ? "إدارة جميع المعاملات المالية" : "Manage all financial transactions"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {language === "ar" ? "تصدير" : "Export"}
          </Button>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                onClick={() => {
                  setEditingTransaction(null)
                  resetForm()
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                {language === "ar" ? "معاملة جديدة" : "New Transaction"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingTransaction
                    ? language === "ar"
                      ? "تعديل المعاملة"
                      : "Edit Transaction"
                    : language === "ar"
                      ? "معاملة جديدة"
                      : "New Transaction"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">{language === "ar" ? "النوع" : "Type"}</Label>
                    <Select
                      value={formData.transaction_type}
                      onValueChange={(value: TransactionType) => setFormData({ ...formData, transaction_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">{language === "ar" ? "دخل" : "Income"}</SelectItem>
                        <SelectItem value="expense">{language === "ar" ? "مصروف" : "Expense"}</SelectItem>
                        <SelectItem value="refund">{language === "ar" ? "استرداد" : "Refund"}</SelectItem>
                        <SelectItem value="adjustment">{language === "ar" ? "تعديل" : "Adjustment"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="amount">{language === "ar" ? "المبلغ" : "Amount"}</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">{language === "ar" ? "الوصف" : "Description"}</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={language === "ar" ? "وصف المعاملة" : "Transaction description"}
                    required
                  />
                </div>

                {formData.transaction_type === "expense" && (
                  <div>
                    <Label htmlFor="category">{language === "ar" ? "الفئة" : "Category"}</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: ExpenseCategoryType) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={language === "ar" ? "اختر الفئة" : "Select category"} />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="payment_method">{language === "ar" ? "طريقة الدفع" : "Payment Method"}</Label>
                    <Select
                      value={formData.payment_method}
                      onValueChange={(value: PaymentMethodType) => setFormData({ ...formData, payment_method: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="date">{language === "ar" ? "التاريخ" : "Date"}</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.transaction_date}
                      onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">{language === "ar" ? "ملاحظات" : "Notes"}</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={language === "ar" ? "ملاحظات إضافية" : "Additional notes"}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                    {language === "ar" ? "إلغاء" : "Cancel"}
                  </Button>
                  <Button type="submit">
                    {editingTransaction
                      ? language === "ar"
                        ? "تحديث"
                        : "Update"
                      : language === "ar"
                        ? "إنشاء"
                        : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={language === "ar" ? "البحث في المعاملات..." : "Search transactions..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterType} onValueChange={(value: TransactionType | "all") => setFilterType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "ar" ? "جميع الأنواع" : "All Types"}</SelectItem>
                <SelectItem value="income">{language === "ar" ? "دخل" : "Income"}</SelectItem>
                <SelectItem value="expense">{language === "ar" ? "مصروف" : "Expense"}</SelectItem>
                <SelectItem value="refund">{language === "ar" ? "استرداد" : "Refund"}</SelectItem>
                <SelectItem value="adjustment">{language === "ar" ? "تعديل" : "Adjustment"}</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc")
              }}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              {sortOrder === "asc"
                ? language === "ar"
                  ? "تصاعدي"
                  : "Ascending"
                : language === "ar"
                  ? "تنازلي"
                  : "Descending"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {language === "ar" ? "قائمة المعاملات" : "Transactions List"}
            <Badge variant="secondary">{filteredTransactions.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === "ar" ? "النوع" : "Type"}</TableHead>
                  <TableHead>{language === "ar" ? "الوصف" : "Description"}</TableHead>
                  <TableHead>{language === "ar" ? "المبلغ" : "Amount"}</TableHead>
                  <TableHead>{language === "ar" ? "الفئة" : "Category"}</TableHead>
                  <TableHead>{language === "ar" ? "طريقة الدفع" : "Payment"}</TableHead>
                  <TableHead>{language === "ar" ? "التاريخ" : "Date"}</TableHead>
                  <TableHead>{language === "ar" ? "الإجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTransactionTypeIcon(transaction.transaction_type)}
                        {getTransactionTypeBadge(transaction.transaction_type)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        {transaction.notes && <div className="text-sm text-muted-foreground">{transaction.notes}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`font-medium ${
                          transaction.transaction_type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.transaction_type === "income" ? "+" : "-"}
                        {transaction.amount.toLocaleString()} TND
                      </div>
                    </TableCell>
                    <TableCell>
                      {transaction.category ? (
                        <Badge variant="outline">
                          {expenseCategories.find((c) => c.value === transaction.category)?.label ||
                            transaction.category}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {transaction.payment_method ? (
                        <Badge variant="secondary">
                          {paymentMethods.find((p) => p.value === transaction.payment_method)?.label ||
                            transaction.payment_method}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.transaction_date).toLocaleDateString(language === "ar" ? "ar-TN" : "en-US")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(transaction)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(transaction.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {!loading && filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {language === "ar" ? "لا توجد معاملات" : "No transactions found"}
              </h3>
              <p className="text-muted-foreground">
                {language === "ar" ? "ابدأ بإضافة معاملة جديدة" : "Start by adding a new transaction"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
