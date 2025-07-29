"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, MoreHorizontal, Eye, Edit, Truck, Phone, MapPin, User, Package } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import type { Order } from "@/lib/types"

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key as any, language)

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders)
        setOrders(parsedOrders)
      } catch (error) {
        console.error("Error loading orders:", error)
      }
    }
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.delivery_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_info?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus, updated_at: new Date().toISOString() } : order,
    )
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
  }

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      pending: { label: language === "ar" ? "قيد الانتظار" : "Pending", variant: "secondary" as const },
      confirmed: { label: language === "ar" ? "مؤكد" : "Confirmed", variant: "default" as const },
      preparing: { label: language === "ar" ? "قيد التحضير" : "Preparing", variant: "outline" as const },
      ready: { label: language === "ar" ? "جاهز" : "Ready", variant: "default" as const },
      delivered: { label: language === "ar" ? "تم التوصيل" : "Delivered", variant: "default" as const },
      cancelled: { label: language === "ar" ? "ملغي" : "Cancelled", variant: "destructive" as const },
    }
    return statusConfig[status]
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: language === "ar" ? "في الانتظار" : "Pending", variant: "secondary" as const },
      paid: { label: language === "ar" ? "مدفوع" : "Paid", variant: "default" as const },
      failed: { label: language === "ar" ? "فشل" : "Failed", variant: "destructive" as const },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("manageOrders")}</h1>
          <p className="text-muted-foreground">
            {language === "ar" ? "إدارة ومتابعة جميع الطلبات" : "Manage and track all orders"}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "ar" ? "إجمالي الطلبات" : "Total Orders"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{language === "ar" ? "قيد الانتظار" : "Pending"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{language === "ar" ? "قيد التحضير" : "Preparing"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "preparing").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{language === "ar" ? "تم التوصيل" : "Delivered"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "delivered").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "ar" ? "إجمالي المبيعات" : "Total Sales"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.reduce((sum, order) => sum + order.total_amount, 0).toFixed(2)}{" "}
              {language === "ar" ? "د.ت" : "TND"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === "ar" ? "البحث في الطلبات..." : "Search orders..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rtl:pl-3 rtl:pr-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={language === "ar" ? "تصفية بالحالة" : "Filter by status"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{language === "ar" ? "جميع الحالات" : "All Status"}</SelectItem>
            <SelectItem value="pending">{language === "ar" ? "قيد الانتظار" : "Pending"}</SelectItem>
            <SelectItem value="confirmed">{language === "ar" ? "مؤكد" : "Confirmed"}</SelectItem>
            <SelectItem value="preparing">{language === "ar" ? "قيد التحضير" : "Preparing"}</SelectItem>
            <SelectItem value="ready">{language === "ar" ? "جاهز" : "Ready"}</SelectItem>
            <SelectItem value="delivered">{language === "ar" ? "تم التوصيل" : "Delivered"}</SelectItem>
            <SelectItem value="cancelled">{language === "ar" ? "ملغي" : "Cancelled"}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "ar" ? "قائمة الطلبات" : "Orders List"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === "ar" ? "رقم الطلب" : "Order #"}</TableHead>
                <TableHead>{language === "ar" ? "العميل" : "Customer"}</TableHead>
                <TableHead>{language === "ar" ? "العنوان" : "Address"}</TableHead>
                <TableHead>{language === "ar" ? "المبلغ" : "Amount"}</TableHead>
                <TableHead>{language === "ar" ? "حالة الطلب" : "Order Status"}</TableHead>
                <TableHead>{language === "ar" ? "حالة الدفع" : "Payment"}</TableHead>
                <TableHead>{language === "ar" ? "التاريخ" : "Date"}</TableHead>
                <TableHead>{language === "ar" ? "الإجراءات" : "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.order_number}</div>
                    <div className="text-sm text-muted-foreground">{order.delivery_phone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{order.customer_info?.fullName || "Guest"}</div>
                    <div className="text-sm text-muted-foreground">{order.customer_info?.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-48 truncate">{order.delivery_address}</div>
                    {order.delivery_notes && (
                      <div className="text-sm text-muted-foreground">{order.delivery_notes}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {order.total_amount.toFixed(2)} {language === "ar" ? "د.ت" : "TND"}
                    </div>
                    <div className="text-sm text-muted-foreground">{order.payment_method}</div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value as Order["status"])}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">{language === "ar" ? "قيد الانتظار" : "Pending"}</SelectItem>
                        <SelectItem value="confirmed">{language === "ar" ? "مؤكد" : "Confirmed"}</SelectItem>
                        <SelectItem value="preparing">{language === "ar" ? "قيد التحضير" : "Preparing"}</SelectItem>
                        <SelectItem value="ready">{language === "ar" ? "جاهز" : "Ready"}</SelectItem>
                        <SelectItem value="delivered">{language === "ar" ? "تم التوصيل" : "Delivered"}</SelectItem>
                        <SelectItem value="cancelled">{language === "ar" ? "ملغي" : "Cancelled"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPaymentStatusBadge(order.payment_status).variant}>
                      {getPaymentStatusBadge(order.payment_status).label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(order.created_at).toLocaleDateString(language === "ar" ? "ar-TN" : "en-US")}
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                setSelectedOrder(order)
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                              {language === "ar" ? "عرض التفاصيل" : "View Details"}
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                {language === "ar" ? "تفاصيل الطلب" : "Order Details"} - {selectedOrder?.order_number}
                              </DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-6">
                                {/* Customer Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <Card>
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-sm flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        {language === "ar" ? "معلومات العميل" : "Customer Info"}
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                      <div>
                                        <strong>{language === "ar" ? "الاسم:" : "Name:"}</strong>{" "}
                                        {selectedOrder.customer_info?.fullName}
                                      </div>
                                      <div>
                                        <strong>{language === "ar" ? "البريد:" : "Email:"}</strong>{" "}
                                        {selectedOrder.customer_info?.email}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-3 w-3" />
                                        <strong>{language === "ar" ? "الهاتف:" : "Phone:"}</strong>{" "}
                                        {selectedOrder.delivery_phone}
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-sm flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        {language === "ar" ? "عنوان التوصيل" : "Delivery Address"}
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                      <div>{selectedOrder.delivery_address}</div>
                                      {selectedOrder.delivery_notes && (
                                        <div>
                                          <strong>{language === "ar" ? "ملاحظات:" : "Notes:"}</strong>{" "}
                                          {selectedOrder.delivery_notes}
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Order Items */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-sm">
                                      {language === "ar" ? "عناصر الطلب" : "Order Items"}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      {selectedOrder.order_items?.map((item) => {
                                        const productName =
                                          (item.product?.[`name_${language}` as keyof typeof item.product] as string) ||
                                          "Product"
                                        return (
                                          <div
                                            key={item.id}
                                            className="flex justify-between items-center py-2 border-b last:border-b-0"
                                          >
                                            <div>
                                              <div className="font-medium">{productName}</div>
                                              <div className="text-sm text-muted-foreground">
                                                {language === "ar" ? "الكمية:" : "Qty:"} {item.quantity} ×{" "}
                                                {item.unit_price.toFixed(2)} {language === "ar" ? "د.ت" : "TND"}
                                              </div>
                                            </div>
                                            <div className="font-medium">
                                              {item.total_price.toFixed(2)} {language === "ar" ? "د.ت" : "TND"}
                                            </div>
                                          </div>
                                        )
                                      })}
                                      <div className="flex justify-between items-center pt-3 text-lg font-semibold border-t">
                                        <span>{language === "ar" ? "المجموع الكلي:" : "Total:"}</span>
                                        <span className="text-green-600">
                                          {selectedOrder.total_amount.toFixed(2)} {language === "ar" ? "د.ت" : "TND"}
                                        </span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Order Status */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="text-center">
                                    <div className="text-sm text-muted-foreground mb-1">
                                      {language === "ar" ? "حالة الطلب" : "Order Status"}
                                    </div>
                                    <Badge variant={getStatusBadge(selectedOrder.status).variant} className="text-sm">
                                      {getStatusBadge(selectedOrder.status).label}
                                    </Badge>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-sm text-muted-foreground mb-1">
                                      {language === "ar" ? "طريقة الدفع" : "Payment Method"}
                                    </div>
                                    <div className="font-medium">
                                      {selectedOrder.payment_method === "cash"
                                        ? language === "ar"
                                          ? "الدفع عند التوصيل"
                                          : "Cash on Delivery"
                                        : "Flouci"}
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-sm text-muted-foreground mb-1">
                                      {language === "ar" ? "تاريخ الطلب" : "Order Date"}
                                    </div>
                                    <div className="font-medium">
                                      {new Date(selectedOrder.created_at).toLocaleDateString(
                                        language === "ar" ? "ar-TN" : "en-US",
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {language === "ar" ? "تعديل" : "Edit"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {language === "ar" ? "تتبع التوصيل" : "Track Delivery"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{language === "ar" ? "لا توجد طلبات" : "No Orders Found"}</h3>
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "لم يتم العثور على طلبات تطابق معايير البحث"
                  : "No orders match your search criteria"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
