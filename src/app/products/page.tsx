"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductsHero } from "@/components/products/products-hero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Grid, List, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getProducts } from "@/lib/products"
import type { Product } from "@/lib/types"

export default function ProductsPage() {
  const { language } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, searchQuery, sortBy, filterBy])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = [...products]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((product) => {
        const name = ((product[`name_${language}` as keyof Product] as string) || product.name_en || "").toLowerCase()
        const description = (
          (product[`description_${language}` as keyof Product] as string) ||
          product.description_en ||
          ""
        ).toLowerCase()
        return name.includes(query) || description.includes(query)
      })
    }

    // Category filter
    if (filterBy !== "all") {
      if (filterBy === "featured") {
        filtered = filtered.filter((product) => product.is_featured)
      } else if (filterBy === "organic") {
        filtered = filtered.filter((product) => product.organic_certified)
      } else if (filterBy === "instock") {
        filtered = filtered.filter((product) => (product.stock_quantity || 0) > 0)
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0)
        case "price-high":
          return (b.price || 0) - (a.price || 0)
        case "name":
          const nameA = ((a[`name_${language}` as keyof Product] as string) || a.name_en || "").toLowerCase()
          const nameB = ((b[`name_${language}` as keyof Product] as string) || b.name_en || "").toLowerCase()
          return nameA.localeCompare(nameB)
        case "newest":
        default:
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      }
    })

    setFilteredProducts(filtered)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSortBy("newest")
    setFilterBy("all")
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <ProductsHero />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">
              {language === "ar" ? "جاري التحميل..." : language === "fr" ? "Chargement..." : "Loading..."}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <ProductsHero />

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={
                  language === "ar"
                    ? "البحث عن المنتجات..."
                    : language === "fr"
                      ? "Rechercher des produits..."
                      : "Search products..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rtl:pl-4 rtl:pr-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === "ar" ? "جميع المنتجات" : language === "fr" ? "Tous les produits" : "All Products"}
                  </SelectItem>
                  <SelectItem value="featured">
                    {language === "ar" ? "المنتجات المميزة" : language === "fr" ? "Produits vedettes" : "Featured"}
                  </SelectItem>
                  <SelectItem value="organic">
                    {language === "ar" ? "المنتجات العضوية" : language === "fr" ? "Produits biologiques" : "Organic"}
                  </SelectItem>
                  <SelectItem value="instock">
                    {language === "ar" ? "متوفر في المخزون" : language === "fr" ? "En stock" : "In Stock"}
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">
                    {language === "ar" ? "الأحدث" : language === "fr" ? "Plus récent" : "Newest"}
                  </SelectItem>
                  <SelectItem value="price-low">
                    {language === "ar"
                      ? "السعر: منخفض إلى مرتفع"
                      : language === "fr"
                        ? "Prix: bas à élevé"
                        : "Price: Low to High"}
                  </SelectItem>
                  <SelectItem value="price-high">
                    {language === "ar"
                      ? "السعر: مرتفع إلى منخفض"
                      : language === "fr"
                        ? "Prix: élevé à bas"
                        : "Price: High to Low"}
                  </SelectItem>
                  <SelectItem value="name">
                    {language === "ar" ? "الاسم" : language === "fr" ? "Nom" : "Name"}
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {(searchQuery || filterBy !== "all" || sortBy !== "newest") && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  {language === "ar" ? "مسح الفلاتر" : language === "fr" ? "Effacer les filtres" : "Clear Filters"}
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || filterBy !== "all") && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">
                {language === "ar" ? "الفلاتر النشطة:" : language === "fr" ? "Filtres actifs:" : "Active filters:"}
              </span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  {language === "ar" ? "البحث:" : language === "fr" ? "Recherche:" : "Search:"} {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-destructive">
                    ×
                  </button>
                </Badge>
              )}
              {filterBy !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {filterBy === "featured"
                    ? language === "ar"
                      ? "مميز"
                      : language === "fr"
                        ? "Vedette"
                        : "Featured"
                    : filterBy === "organic"
                      ? language === "ar"
                        ? "عضوي"
                        : language === "fr"
                          ? "Bio"
                          : "Organic"
                      : language === "ar"
                        ? "متوفر"
                        : language === "fr"
                          ? "En stock"
                          : "In Stock"}
                  <button onClick={() => setFilterBy("all")} className="ml-1 hover:text-destructive">
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {language === "ar"
              ? `عرض ${filteredProducts.length} من ${products.length} منتج`
              : language === "fr"
                ? `Affichage de ${filteredProducts.length} sur ${products.length} produits`
                : `Showing ${filteredProducts.length} of ${products.length} products`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">
              {language === "ar"
                ? "لم يتم العثور على منتجات"
                : language === "fr"
                  ? "Aucun produit trouvé"
                  : "No products found"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === "ar"
                ? "جرب تغيير معايير البحث أو الفلاتر"
                : language === "fr"
                  ? "Essayez de modifier vos critères de recherche ou filtres"
                  : "Try adjusting your search criteria or filters"}
            </p>
            <Button onClick={clearFilters}>
              {language === "ar"
                ? "مسح جميع الفلاتر"
                : language === "fr"
                  ? "Effacer tous les filtres"
                  : "Clear All Filters"}
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
