"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const router = useRouter()
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice, clearCart } = useCart()
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key as any, language)

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${language === "ar" ? "د.ت" : language === "fr" ? "€" : "TND"}`
  }

  const handleCheckout = () => {
    if (items.length === 0) return
    onOpenChange(false)
    router.push("/checkout")
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>{language === "ar" ? "سلة التسوق" : language === "fr" ? "Panier" : "Shopping Cart"}</span>
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-1" />
                {language === "ar" ? "إفراغ" : language === "fr" ? "Vider" : "Clear"}
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {language === "ar" ? "السلة فارغة" : language === "fr" ? "Panier vide" : "Your cart is empty"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === "ar"
                ? "أضف بعض المنتجات لتبدأ التسوق"
                : language === "fr"
                  ? "Ajoutez des produits pour commencer"
                  : "Add some products to get started"}
            </p>
            <Button
              onClick={() => {
                onOpenChange(false)
                router.push("/products")
              }}
            >
              {language === "ar" ? "تسوق الآن" : language === "fr" ? "Acheter maintenant" : "Shop Now"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => {
                  const productName =
                    item.product.name?.[language] ||
                    item.product.name?.en ||
                    item.product.name?.ar ||
                    "Product"

                  return (
                    <div key={item.id} className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        <Image
                          src={item.product.image_url || "/placeholder.svg?height=64&width=64"}
                          alt={productName}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=64&width=64&text=Product"
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-1">{productName}</h4>
                        <p className="text-sm text-muted-foreground">{formatPrice(item.product.price || 0)}</p>
                        <p className="text-xs text-muted-foreground">
                          {language === "ar" ? "الوزن" : language === "fr" ? "Poids" : "Weight"}:{" "}
                          {item.product.weight || 0}kg
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-transparent"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-transparent"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= (item.product.stock_quantity || 0)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>{language === "ar" ? "المجموع" : language === "fr" ? "Total" : "Total"}</span>
                <span className="text-green-600">{formatPrice(totalPrice)}</span>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                {language === "ar"
                  ? "الشحن والضرائب محسوبة عند الدفع"
                  : language === "fr"
                    ? "Livraison et taxes calculées à la caisse"
                    : "Shipping and taxes calculated at checkout"}
              </div>

              <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                <ShoppingCart className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {language === "ar" ? "إتمام الطلب" : language === "fr" ? "Commander" : "Checkout"}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  onOpenChange(false)
                  router.push("/products")
                }}
                className="w-full"
              >
                {language === "ar" ? "متابعة التسوق" : language === "fr" ? "Continuer les achats" : "Continue Shopping"}
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
