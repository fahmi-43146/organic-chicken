"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import type { Category } from "@/lib/types"

// Mock categories data
const mockCategories: Category[] = [
  {
    id: "cat-1",
    name_ar: "دجاج كامل",
    name_en: "Whole Chicken",
    name_fr: "Poulet Entier",
    description_ar: "دجاج عضوي كامل طازج من المزرعة",
    description_en: "Fresh organic whole chicken from the farm",
    description_fr: "Poulet entier biologique frais de la ferme",
    image_url: "/placeholder.svg?height=300&width=300",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-2",
    name_ar: "قطع الدجاج",
    name_en: "Chicken Cuts",
    name_fr: "Morceaux de Poulet",
    description_ar: "قطع دجاج عضوي متنوعة",
    description_en: "Various organic chicken cuts",
    description_fr: "Divers morceaux de poulet biologique",
    image_url: "/placeholder.svg?height=300&width=300",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key as any, language)

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    name_fr: "",
    description_ar: "",
    description_en: "",
    description_fr: "",
    image_url: "",
    is_active: true,
  })

  const filteredCategories = categories.filter(
    (category) =>
      category.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.name_ar.includes(searchTerm) ||
      category.name_fr.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCategory = () => {
    setSelectedCategory(null)
    setFormData({
      name_ar: "",
      name_en: "",
      name_fr: "",
      description_ar: "",
      description_en: "",
      description_fr: "",
      image_url: "",
      is_active: true,
    })
    setIsFormOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setFormData({
      name_ar: category.name_ar,
      name_en: category.name_en,
      name_fr: category.name_fr,
      description_ar: category.description_ar || "",
      description_en: category.description_en || "",
      description_fr: category.description_fr || "",
      image_url: category.image_url || "",
      is_active: category.is_active,
    })
    setIsFormOpen(true)
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((c) => c.id !== categoryId))
  }

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedCategory) {
      // Update existing category
      setCategories(
        categories.map((c) =>
          c.id === selectedCategory.id ? { ...c, ...formData, updated_at: new Date().toISOString() } : c,
        ),
      )
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setCategories([...categories, newCategory])
    }

    setIsFormOpen(false)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("manageCategories")}</h1>
          <p className="text-muted-foreground">
            {language === "ar" ? "إدارة وتنظيم فئات المنتجات" : "Manage and organize product categories"}
          </p>
        </div>
        <Button onClick={handleAddCategory}>
          <Plus className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {language === "ar" ? "إضافة فئة" : "Add Category"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "ar" ? "إجمالي الفئات" : "Total Categories"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "ar" ? "الفئات النشطة" : "Active Categories"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.filter((c) => c.is_active).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "ar" ? "الفئات المخفية" : "Hidden Categories"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.filter((c) => !c.is_active).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={language === "ar" ? "البحث في الفئات..." : "Search categories..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rtl:pl-3 rtl:pr-10"
        />
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "ar" ? "قائمة الفئات" : "Categories List"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === "ar" ? "الفئة" : "Category"}</TableHead>
                <TableHead>{language === "ar" ? "الوصف" : "Description"}</TableHead>
                <TableHead>{language === "ar" ? "الحالة" : "Status"}</TableHead>
                <TableHead>{language === "ar" ? "الإجراءات" : "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs">IMG</span>
                      </div>
                      <div>
                        <div className="font-medium">{category[`name_${language}` as keyof Category] as string}</div>
                        <div className="text-sm text-muted-foreground">
                          {language === "ar" ? category.name_en : category.name_ar}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md truncate">
                      {category[`description_${language}` as keyof Category] as string}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.is_active ? "default" : "secondary"}>
                      {category.is_active
                        ? language === "ar"
                          ? "نشط"
                          : "Active"
                        : language === "ar"
                          ? "مخفي"
                          : "Hidden"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                          <Edit className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {t("edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {language === "ar" ? "عرض المنتجات" : "View Products"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteCategory(category.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {t("delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Category Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedCategory
                ? language === "ar"
                  ? "تعديل الفئة"
                  : "Edit Category"
                : language === "ar"
                  ? "إضافة فئة جديدة"
                  : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveCategory} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name_ar">{language === "ar" ? "الاسم بالعربية" : "Arabic Name"}</Label>
                <Input
                  id="name_ar"
                  value={formData.name_ar}
                  onChange={(e) => handleInputChange("name_ar", e.target.value)}
                  placeholder="دجاج كامل"
                  dir="rtl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_en">{language === "ar" ? "الاسم بالإنجليزية" : "English Name"}</Label>
                <Input
                  id="name_en"
                  value={formData.name_en}
                  onChange={(e) => handleInputChange("name_en", e.target.value)}
                  placeholder="Whole Chicken"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_fr">{language === "ar" ? "الاسم بالفرنسية" : "French Name"}</Label>
                <Input
                  id="name_fr"
                  value={formData.name_fr}
                  onChange={(e) => handleInputChange("name_fr", e.target.value)}
                  placeholder="Poulet Entier"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description_ar">{language === "ar" ? "الوصف بالعربية" : "Arabic Description"}</Label>
                <Textarea
                  id="description_ar"
                  value={formData.description_ar}
                  onChange={(e) => handleInputChange("description_ar", e.target.value)}
                  placeholder="وصف الفئة بالعربية..."
                  dir="rtl"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description_en">
                  {language === "ar" ? "الوصف بالإنجليزية" : "English Description"}
                </Label>
                <Textarea
                  id="description_en"
                  value={formData.description_en}
                  onChange={(e) => handleInputChange("description_en", e.target.value)}
                  placeholder="Category description in English..."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description_fr">{language === "ar" ? "الوصف بالفرنسية" : "French Description"}</Label>
                <Textarea
                  id="description_fr"
                  value={formData.description_fr}
                  onChange={(e) => handleInputChange("description_fr", e.target.value)}
                  placeholder="Description de la catégorie en français..."
                  rows={2}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">{language === "ar" ? "رابط الصورة" : "Image URL"}</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => handleInputChange("image_url", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{language === "ar" ? "فئة نشطة" : "Active Category"}</Label>
                <p className="text-sm text-muted-foreground">
                  {language === "ar" ? "إظهار الفئة في المتجر" : "Show category in store"}
                </p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange("is_active", checked)}
              />
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                {t("cancel")}
              </Button>
              <Button type="submit">{t("save")}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
