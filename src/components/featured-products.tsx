"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getFeaturedProducts } from "@/lib/products"
import type { Product } from "@/lib/types"
import Link from "next/link"

export function FeaturedProducts() {
  const { language } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true)
      const data = await getFeaturedProducts()
      setProducts(data)
    } catch (error) {
      console.error("Error loading featured products:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {language === "ar"
                ? "منتجاتنا المميزة"
                : language === "fr"
                  ? "Nos Produits Vedettes"
                  : "Our Featured Products"}
            </h2>
          </div>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">
              {language === "ar" ? "جاري التحميل..." : language === "fr" ? "Chargement..." : "Loading..."}
            </span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === "ar"
              ? "منتجاتنا المميزة"
              : language === "fr"
                ? "Nos Produits Vedettes"
                : "Our Featured Products"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "ar"
              ? "اكتشف مجموعتنا المختارة من أفضل منتجات الدجاج العضوي الطازج"
              : language === "fr"
                ? "Découvrez notre sélection des meilleurs produits de poulet biologique frais"
                : "Discover our handpicked selection of the finest fresh organic chicken products"}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {language === "ar"
                ? "لا توجد منتجات مميزة حالياً"
                : language === "fr"
                  ? "Aucun produit vedette actuellement"
                  : "No featured products available"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/products">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  {language === "ar"
                    ? "عرض جميع المنتجات"
                    : language === "fr"
                      ? "Voir tous les produits"
                      : "View All Products"}
                  <ArrowRight className="h-4 w-4 ml-2 rtl:ml-0 rtl:mr-2" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
