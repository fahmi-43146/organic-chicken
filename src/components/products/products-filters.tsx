"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

interface ProductsFiltersProps {
  onFilter: (filters: any) => void
}

export function ProductsFilters({ onFilter }: ProductsFiltersProps) {
  const { language } = useLanguage()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [features, setFeatures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("")

  const categories = [
    { value: "all", label: getTranslation("allProducts", language) },
    { value: "whole", label: language === "ar" ? "دجاج كامل" : language === "fr" ? "Poulet entier" : "Whole Chicken" },
    { value: "parts", label: language === "ar" ? "قطع دجاج" : language === "fr" ? "Morceaux" : "Chicken Parts" },
    {
      value: "processed",
      label: language === "ar" ? "منتجات مصنعة" : language === "fr" ? "Produits transformés" : "Processed",
    },
    { value: "eggs", label: language === "ar" ? "بيض" : language === "fr" ? "Œufs" : "Eggs" },
  ]

  const featureOptions = [
    { value: "organic", label: getTranslation("organic", language) },
    { value: "freeRange", label: getTranslation("freeRange", language) },
    { value: "fresh", label: language === "ar" ? "طازج" : language === "fr" ? "Frais" : "Fresh" },
    { value: "lean", label: language === "ar" ? "قليل الدهن" : language === "fr" ? "Maigre" : "Lean" },
    {
      value: "protein",
      label: language === "ar" ? "غني بالبروتين" : language === "fr" ? "Riche en protéines" : "High Protein",
    },
  ]

  const sortOptions = [
    { value: "", label: language === "ar" ? "افتراضي" : language === "fr" ? "Par défaut" : "Default" },
    {
      value: "price-low",
      label:
        language === "ar" ? "السعر: منخفض إلى مرتفع" : language === "fr" ? "Prix: Bas à Élevé" : "Price: Low to High",
    },
    {
      value: "price-high",
      label:
        language === "ar" ? "السعر: مرتفع إلى منخفض" : language === "fr" ? "Prix: Élevé à Bas" : "Price: High to Low",
    },
    { value: "rating", label: language === "ar" ? "التقييم" : language === "fr" ? "Note" : "Rating" },
    { value: "name", label: language === "ar" ? "الاسم" : language === "fr" ? "Nom" : "Name" },
  ]

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const newFeatures = checked ? [...features, feature] : features.filter((f) => f !== feature)
    setFeatures(newFeatures)
    applyFilters({ features: newFeatures })
  }

  const applyFilters = (overrides = {}) => {
    const filters = {
      search,
      category,
      priceRange,
      features,
      sortBy,
      ...overrides,
    }
    onFilter(filters)
  }

  const clearFilters = () => {
    setSearch("")
    setCategory("all")
    setPriceRange([0, 50])
    setFeatures([])
    setSortBy("")
    onFilter({
      search: "",
      category: "all",
      priceRange: [0, 50],
      features: [],
      sortBy: "",
    })
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {getTranslation("search", language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={
                language === "ar"
                  ? "ابحث عن المنتجات..."
                  : language === "fr"
                    ? "Rechercher des produits..."
                    : "Search products..."
              }
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                applyFilters({ search: e.target.value })
              }}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>{getTranslation("category", language)}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value)
              applyFilters({ category: value })
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle>{getTranslation("priceRange", language)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value)
              applyFilters({ priceRange: value })
            }}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>{getTranslation("features", language)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {featureOptions.map((feature) => (
            <div key={feature.value} className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox
                id={feature.value}
                checked={features.includes(feature.value)}
                onCheckedChange={(checked) => handleFeatureChange(feature.value, checked as boolean)}
              />
              <Label htmlFor={feature.value} className="text-sm">
                {feature.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sort */}
      <Card>
        <CardHeader>
          <CardTitle>{getTranslation("sortBy", language)}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={sortBy}
            onValueChange={(value) => {
              setSortBy(value)
              applyFilters({ sortBy: value })
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
        <X className="h-4 w-4 mr-2" />
        {language === "ar" ? "مسح الفلاتر" : language === "fr" ? "Effacer les filtres" : "Clear Filters"}
      </Button>
    </div>
  )
}
