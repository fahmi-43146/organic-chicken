"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { Grid, List, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

interface Product {
  id: number
  name: { en: string; ar: string; fr: string }
  description: { en: string; ar: string; fr: string }
  price: number
  image: string
  category: string
  features: string[]
  inStock: boolean
  rating: number
  reviews: number
}

interface ProductsGridProps {
  products: Product[]
  loading?: boolean
}

export function ProductsGrid({ products, loading = false }: ProductsGridProps) {
  const { language } = useLanguage()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [displayCount, setDisplayCount] = useState(6)

  const displayedProducts = products.slice(0, displayCount)
  const hasMore = products.length > displayCount

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 6, products.length))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{getTranslation("loading", language)}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{getTranslation("allProducts", language)}</h2>
          <p className="text-muted-foreground">
            {language === "ar"
              ? `عرض ${displayedProducts.length} من ${products.length} منتج`
              : language === "fr"
                ? `Affichage de ${displayedProducts.length} sur ${products.length} produits`
                : `Showing ${displayedProducts.length} of ${products.length} products`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products */}
      {displayedProducts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-muted-foreground">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">{getTranslation("noResults", language)}</h3>
              <p>
                {language === "ar"
                  ? "جرب تغيير الفلاتر أو البحث عن شيء آخر"
                  : language === "fr"
                    ? "Essayez de modifier les filtres ou de rechercher autre chose"
                    : "Try adjusting your filters or search for something else"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {displayedProducts.map((product) => (
              <div key={product.id}>
                {viewMode === "grid" ? (
                  <ProductCard
                    id={product.id}
                    name={product.name?.[language] || "Product"}
                    description={product.description?.[language] || ""}
                    price={product.price}
                    image={product.image}
                    inStock={product.inStock}
                    rating={product.rating}
                    reviews={product.reviews}
                  />
                ) : (
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name?.[language] || "Product"}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{product.name?.[language] || "Product"}</h3>
                            <p className="text-muted-foreground text-sm">{product.description?.[language] || ""}</p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {product.features.slice(0, 3).map((feature) => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-green-600">${product.price}</div>
                            <Button disabled={!product.inStock}>
                              {product.inStock
                                ? getTranslation("addToCart", language)
                                : getTranslation("outOfStock", language)}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center">
              <Button onClick={loadMore} variant="outline" size="lg">
                {getTranslation("loadMore", language)}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
