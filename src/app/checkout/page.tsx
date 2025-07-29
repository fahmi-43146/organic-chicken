"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, CreditCard, Truck, Loader2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"

interface OrderData {
  id: string
  customerInfo: {
    fullName: string
    phone: string
    email: string
    address: string
    city: string
    postalCode: string
    notes?: string
  }
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  paymentMethod: string
  totalAmount: number
  status: string
  createdAt: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const { language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (items.length === 0) {
      router.push("/products")
    }
  }, [items, router])

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${language === "ar" ? "د.ت" : language === "fr" ? "€" : "TND"}`
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        language === "ar" ? "الاسم الكامل مطلوب" : language === "fr" ? "Nom complet requis" : "Full name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        language === "ar"
          ? "رقم الهاتف مطلوب"
          : language === "fr"
            ? "Numéro de téléphone requis"
            : "Phone number is required"
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone =
        language === "ar"
          ? "رقم هاتف غير صالح"
          : language === "fr"
            ? "Numéro de téléphone invalide"
            : "Invalid phone number"
    }

    if (!formData.email.trim()) {
      newErrors.email =
        language === "ar" ? "البريد الإلكتروني مطلوب" : language === "fr" ? "Email requis" : "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email =
        language === "ar" ? "بريد إلكتروني غير صالح" : language === "fr" ? "Email invalide" : "Invalid email address"
    }

    if (!formData.address.trim()) {
      newErrors.address =
        language === "ar" ? "العنوان مطلوب" : language === "fr" ? "Adresse requise" : "Address is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = language === "ar" ? "المدينة مطلوبة" : language === "fr" ? "Ville requise" : "City is required"
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode =
        language === "ar" ? "الرمز البريدي مطلوب" : language === "fr" ? "Code postal requis" : "Postal code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: language === "ar" ? "خطأ في النموذج" : language === "fr" ? "Erreur de formulaire" : "Form Error",
        description:
          language === "ar"
            ? "يرجى تصحيح الأخطاء أدناه"
            : language === "fr"
              ? "Veuillez corriger les erreurs ci-dessous"
              : "Please correct the errors below",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create order
      const orderData: OrderData = {
        id: `ORD-${Date.now()}`,
        customerInfo: formData,
        items: items.map((item) => ({
          id: item.product.id,
          name:
            (item.product[`name_${language}` as keyof typeof item.product] as string) ||
            item.product.name_en ||
            "Product",
          price: item.product.price || 0,
          quantity: item.quantity,
          image: item.product.image_urls?.[0] || "/placeholder.svg",
        })),
        paymentMethod,
        totalAmount: getTotalPrice(),
        status: "pending",
        createdAt: new Date().toISOString(),
      }

      // Save to localStorage (simulate database)
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      existingOrders.push(orderData)
      localStorage.setItem("orders", JSON.stringify(existingOrders))

      // Clear cart
      clearCart()

      toast({
        title:
          language === "ar"
            ? "تم إنشاء الطلب بنجاح"
            : language === "fr"
              ? "Commande créée avec succès"
              : "Order Created Successfully",
        description:
          language === "ar"
            ? `رقم الطلب: ${orderData.id}`
            : language === "fr"
              ? `Numéro de commande: ${orderData.id}`
              : `Order number: ${orderData.id}`,
      })

      // Redirect to home
      router.push("/")
    } catch (error) {
      toast({
        title: language === "ar" ? "خطأ" : language === "fr" ? "Erreur" : "Error",
        description:
          language === "ar"
            ? "فشل في إنشاء الطلب"
            : language === "fr"
              ? "Échec de création de commande"
              : "Failed to create order",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalPrice = getTotalPrice()
  const shippingCost = 5.0
  const finalTotal = totalPrice + shippingCost

  if (items.length === 0) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {language === "ar" ? "العودة" : language === "fr" ? "Retour" : "Back"}
          </Button>

          <h1 className="text-3xl font-bold">
            {language === "ar" ? "إتمام الطلب" : language === "fr" ? "Finaliser la commande" : "Checkout"}
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "ar"
                    ? "معلومات العميل"
                    : language === "fr"
                      ? "Informations client"
                      : "Customer Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">
                      {language === "ar" ? "الاسم الكامل" : language === "fr" ? "Nom complet" : "Full Name"} *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      {language === "ar" ? "رقم الهاتف" : language === "fr" ? "Numéro de téléphone" : "Phone Number"} *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">
                    {language === "ar" ? "البريد الإلكتروني" : language === "fr" ? "Email" : "Email Address"} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "ar"
                    ? "عنوان التسليم"
                    : language === "fr"
                      ? "Adresse de livraison"
                      : "Delivery Address"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">
                    {language === "ar" ? "العنوان الكامل" : language === "fr" ? "Adresse complète" : "Full Address"} *
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={errors.address ? "border-red-500" : ""}
                    rows={3}
                  />
                  {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">
                      {language === "ar" ? "المدينة" : language === "fr" ? "Ville" : "City"} *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <Label htmlFor="postalCode">
                      {language === "ar" ? "الرمز البريدي" : language === "fr" ? "Code postal" : "Postal Code"} *
                    </Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      className={errors.postalCode ? "border-red-500" : ""}
                    />
                    {errors.postalCode && <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">
                    {language === "ar"
                      ? "ملاحظات التسليم (اختياري)"
                      : language === "fr"
                        ? "Notes de livraison (optionnel)"
                        : "Delivery Notes (Optional)"}
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "ar" ? "طريقة الدفع" : language === "fr" ? "Mode de paiement" : "Payment Method"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 border rounded-lg">
                    <RadioGroupItem value="cash" id="cash" />
                    <div className="flex-1">
                      <Label htmlFor="cash" className="flex items-center cursor-pointer">
                        <Truck className="h-5 w-5 mr-3 rtl:mr-0 rtl:ml-3" />
                        <div>
                          <div className="font-medium">
                            {language === "ar"
                              ? "الدفع عند التسليم"
                              : language === "fr"
                                ? "Paiement à la livraison"
                                : "Cash on Delivery"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {language === "ar"
                              ? "ادفع نقداً عند استلام طلبك"
                              : language === "fr"
                                ? "Payez en espèces à la réception"
                                : "Pay cash when you receive your order"}
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 border rounded-lg opacity-50">
                    <RadioGroupItem value="flouci" id="flouci" disabled />
                    <div className="flex-1">
                      <Label htmlFor="flouci" className="flex items-center cursor-not-allowed">
                        <CreditCard className="h-5 w-5 mr-3 rtl:mr-0 rtl:ml-3" />
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {language === "ar"
                              ? "الدفع بـ Flouci"
                              : language === "fr"
                                ? "Paiement Flouci"
                                : "Flouci Payment"}
                            <Badge variant="secondary">
                              {language === "ar" ? "قريباً" : language === "fr" ? "Bientôt" : "Coming Soon"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {language === "ar"
                              ? "ادفع بأمان باستخدام Flouci"
                              : language === "fr"
                                ? "Payez en sécurité avec Flouci"
                                : "Pay securely with Flouci"}
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "ar" ? "ملخص الطلب" : language === "fr" ? "Résumé de commande" : "Order Summary"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => {
                    const productName =
                      (item.product[`name_${language}` as keyof typeof item.product] as string) ||
                      item.product.name_en ||
                      item.product.name_ar ||
                      "Product"

                    return (
                      <div key={item.id} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                          <Image
                            src={item.product.image_urls?.[0] || "/placeholder.svg?height=48&width=48"}
                            alt={productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{productName}</p>
                          <p className="text-xs text-muted-foreground">
                            {language === "ar" ? "الكمية" : language === "fr" ? "Quantité" : "Qty"}: {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium">
                          {formatPrice((item.product.price || 0) * item.quantity)}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{language === "ar" ? "المجموع الفرعي" : language === "fr" ? "Sous-total" : "Subtotal"}</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{language === "ar" ? "الشحن" : language === "fr" ? "Livraison" : "Shipping"}</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>{language === "ar" ? "المجموع" : language === "fr" ? "Total" : "Total"}</span>
                    <span className="text-green-600">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2 rtl:mr-0 rtl:ml-2" />
                      {language === "ar" ? "جاري المعالجة..." : language === "fr" ? "Traitement..." : "Processing..."}
                    </>
                  ) : (
                    <>
                      <Truck className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      {language === "ar" ? "تأكيد الطلب" : language === "fr" ? "Confirmer la commande" : "Place Order"}
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {language === "ar"
                    ? "بالنقر على 'تأكيد الطلب'، فإنك توافق على شروط الخدمة"
                    : language === "fr"
                      ? "En cliquant sur 'Confirmer la commande', vous acceptez nos conditions"
                      : "By clicking 'Place Order', you agree to our terms of service"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
