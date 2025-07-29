"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Heart, ShoppingCart, Eye, Leaf, Plus, Loader2 } from "lucide-react"
import type { Product } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { language } = useLanguage()
  const { addItem, setIsOpen } = useCart()
  const t = (key: string) => getTranslation(key as any, language)

  // Safe property access with fallbacks
  const productName =
    product?.name?.[language] || product?.name?.en || product?.name?.ar || "Product Name"

  const productDescription =
    product?.description?.[language] || product?.description?.en || product?.description?.ar || "Product Description"

  const handleAddToCart = async () => {
    if (!product) {
      toast({
        title: language === "ar" ? "خطأ" : language === "fr" ? "Erreur" : "Error",
        description: language === "ar" ? "منتج غير صالح" : language === "fr" ? "Produit invalide" : "Invalid product",
        variant: "destructive",
      })
      return
    }

    if ((product.stock_quantity || 0) === 0) {
      toast({
        title: language === "ar" ? "نفد المخزون" : language === "fr" ? "Rupture de stock" : "Out of Stock",
        description:
          language === "ar"
            ? "هذا المنتج غير متوفر حالياً"
            : language === "fr"
              ? "Ce produit n'est pas disponible"
              : "This product is currently unavailable",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      addItem(product, 1)

      toast({
        title: language === "ar" ? "تم إضافة المنتج" : language === "fr" ? "Produit ajouté" : "Product added",
        description:
          language === "ar"
            ? `تم إضافة ${productName} إلى السلة`
            : language === "fr"
              ? `${productName} a été ajouté au panier`
              : `${productName} has been added to cart`,
        duration: 2000,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: language === "ar" ? "خطأ" : language === "fr" ? "Erreur" : "Error",
        description:
          language === "ar"
            ? "حدث خطأ أثناء إضافة المنتج"
            : language === "fr"
              ? "Une erreur s'est produite"
              : "An error occurred while adding the product",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return `${price?.toFixed(2) || "0.00"} ${language === "ar" ? "د.ت" : language === "fr" ? "€" : "TND"}`
  }

  const isOutOfStock = (product.stock_quantity || 0) <= 0
  const isLowStock = (product.stock_quantity || 0) > 0 && (product.stock_quantity || 0) <= 5

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image_urls?.[0] || "/placeholder.svg?height=300&width=300&query=organic chicken product"}
          alt={productName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=300&width=300&text=Product+Image"
          }}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.is_featured && (
            <Badge className="bg-orange-500 hover:bg-orange-600">
              {language === "ar" ? "مميز" : language === "fr" ? "Vedette" : "Featured"}
            </Badge>
          )}
          {product.organic_certified && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Leaf className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
              {t("organic")}
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="destructive">
              {language === "ar" ? "نفد المخزون" : language === "fr" ? "Rupture de stock" : "Out of Stock"}
            </Badge>
          )}
          {isLowStock && (
            <Badge variant="outline" className="bg-orange-100 text-orange-800">
              {language === "ar" ? "كمية قليلة" : language === "fr" ? "Stock faible" : "Low Stock"}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={() => setIsWishlisted(!isWishlisted)}>
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isOutOfStock || isLoading}
            onClick={handleAddToCart}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2 rtl:mr-0 rtl:ml-2" />
            ) : (
              <ShoppingCart className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
            )}
            {isLoading
              ? language === "ar"
                ? "جاري الإضافة..."
                : language === "fr"
                  ? "Ajout..."
                  : "Adding..."
              : isOutOfStock
                ? language === "ar"
                  ? "نفد المخزون"
                  : language === "fr"
                    ? "Rupture de stock"
                    : "Out of Stock"
                : language === "ar"
                  ? "أضف للسلة"
                  : language === "fr"
                    ? "Ajouter"
                    : "Add to Cart"}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">{productName}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{productDescription}</p>

          {/* Product Details */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>
              {language === "ar" ? "الوزن" : language === "fr" ? "Poids" : "Weight"}: {product.weight || 0}kg
            </span>
            <span>•</span>
            <span>{product.farm_location || "Farm Location"}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-green-600">{formatPrice(product.price || 0)}</span>
          <span className="text-xs text-muted-foreground">
            {language === "ar" ? "شامل الضريبة" : language === "fr" ? "TTC" : "Tax included"}
          </span>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="text-sm font-medium">
              {!isOutOfStock ? (
                <span className="text-green-600">
                  {language === "ar" ? "متوفر" : language === "fr" ? "Disponible" : "In Stock"}
                </span>
              ) : (
                <span className="text-red-600">
                  {language === "ar" ? "نفد المخزون" : language === "fr" ? "Rupture de stock" : "Out of Stock"}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {!isOutOfStock &&
                `${product.stock_quantity || 0} ${language === "ar" ? "قطعة" : language === "fr" ? "pièces" : "pieces"}`}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            disabled={isOutOfStock || isLoading}
            onClick={handleAddToCart}
          >
            {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
