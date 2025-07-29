"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Upload, X, Plus } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

interface ProductFormProps {
  product?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key as any, language)

  const [formData, setFormData] = useState({
    name: product?.name || "",
    name_ar: product?.name_ar || "",
    name_fr: product?.name_fr || "",
    description: product?.description || "",
    description_ar: product?.description_ar || "",
    description_fr: product?.description_fr || "",
    price: product?.price || "",
    category: product?.category || "",
    stock: product?.stock || "",
    weight: product?.weight || "",
    unit: product?.unit || "kg",
    is_featured: product?.is_featured || false,
    is_available: product?.is_available ?? true,
    tags: product?.tags || [],
  })

  const [newTag, setNewTag] = useState("")
  const [images, setImages] = useState(product?.images || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, images })
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag: string) => tag !== tagToRemove),
    })
  }

  const addImage = () => {
    const newImage = `/placeholder.svg?height=200&width=200&text=Product+Image`
    setImages([...images, newImage])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_: any, i: number) => i !== index))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {product
            ? language === "ar"
              ? "تعديل المنتج"
              : language === "fr"
                ? "Modifier le produit"
                : "Edit Product"
            : language === "ar"
              ? "إضافة منتج جديد"
              : language === "fr"
                ? "Ajouter un nouveau produit"
                : "Add New Product"}
        </CardTitle>
        <CardDescription>
          {language === "ar"
            ? "املأ النموذج أدناه لإضافة أو تعديل منتج"
            : language === "fr"
              ? "Remplissez le formulaire ci-dessous pour ajouter ou modifier un produit"
              : "Fill out the form below to add or edit a product"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {language === "ar" ? "اسم المنتج (إنجليزي)" : language === "fr" ? "Nom (Anglais)" : "Name (English)"}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Organic Chicken"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_ar">
                {language === "ar" ? "اسم المنتج (عربي)" : language === "fr" ? "Nom (Arabe)" : "Name (Arabic)"}
              </Label>
              <Input
                id="name_ar"
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                placeholder="دجاج عضوي"
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_fr">
                {language === "ar" ? "اسم المنتج (فرنسي)" : language === "fr" ? "Nom (Français)" : "Name (French)"}
              </Label>
              <Input
                id="name_fr"
                value={formData.name_fr}
                onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })}
                placeholder="Poulet Bio"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">
                {language === "ar"
                  ? "الوصف (إنجليزي)"
                  : language === "fr"
                    ? "Description (Anglais)"
                    : "Description (English)"}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Fresh organic chicken..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_ar">
                {language === "ar"
                  ? "الوصف (عربي)"
                  : language === "fr"
                    ? "Description (Arabe)"
                    : "Description (Arabic)"}
              </Label>
              <Textarea
                id="description_ar"
                value={formData.description_ar}
                onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                placeholder="دجاج عضوي طازج..."
                rows={3}
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_fr">
                {language === "ar"
                  ? "الوصف (فرنسي)"
                  : language === "fr"
                    ? "Description (Français)"
                    : "Description (French)"}
              </Label>
              <Textarea
                id="description_fr"
                value={formData.description_fr}
                onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                placeholder="Poulet bio frais..."
                rows={3}
              />
            </div>
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">
                {language === "ar" ? "السعر (TND)" : language === "fr" ? "Prix (TND)" : "Price (TND)"}
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="25.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">{language === "ar" ? "المخزون" : language === "fr" ? "Stock" : "Stock"}</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">{language === "ar" ? "الوزن" : language === "fr" ? "Poids" : "Weight"}</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="1.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">{language === "ar" ? "الوحدة" : language === "fr" ? "Unité" : "Unit"}</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="piece">piece</SelectItem>
                  <SelectItem value="pack">pack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              {language === "ar" ? "الفئة" : language === "fr" ? "Catégorie" : "Category"}
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whole-chicken">Whole Chicken</SelectItem>
                <SelectItem value="chicken-parts">Chicken Parts</SelectItem>
                <SelectItem value="processed">Processed</SelectItem>
                <SelectItem value="eggs">Eggs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>{language === "ar" ? "العلامات" : language === "fr" ? "Étiquettes" : "Tags"}</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder={
                  language === "ar" ? "إضافة علامة" : language === "fr" ? "Ajouter une étiquette" : "Add tag"
                }
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>{language === "ar" ? "الصور" : language === "fr" ? "Images" : "Images"}</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image: string, index: number) => (
                <div key={index} className="relative group">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    width={200}
                    height={128}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" className="h-32 border-dashed bg-transparent" onClick={addImage}>
                <div className="text-center">
                  <Upload className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm">
                    {language === "ar" ? "إضافة صورة" : language === "fr" ? "Ajouter une image" : "Add Image"}
                  </span>
                </div>
              </Button>
            </div>
          </div>

          {/* Switches */}
          <div className="flex gap-6">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
              />
              <Label htmlFor="is_featured">
                {language === "ar" ? "منتج مميز" : language === "fr" ? "Produit vedette" : "Featured Product"}
              </Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Switch
                id="is_available"
                checked={formData.is_available}
                onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
              />
              <Label htmlFor="is_available">
                {language === "ar" ? "متوفر" : language === "fr" ? "Disponible" : "Available"}
              </Label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" className="flex-1">
              {product
                ? language === "ar"
                  ? "تحديث المنتج"
                  : language === "fr"
                    ? "Mettre à jour"
                    : "Update Product"
                : language === "ar"
                  ? "إضافة المنتج"
                  : language === "fr"
                    ? "Ajouter le produit"
                    : "Add Product"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              {language === "ar" ? "إلغاء" : language === "fr" ? "Annuler" : "Cancel"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
