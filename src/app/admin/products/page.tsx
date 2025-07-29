"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Star } from "lucide-react"
import { ProductForm } from "@/components/admin/product-form"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import type { Product } from "@/lib/types"

// Mock products data
const mockProducts: Product[] = [
  {
    id: "1",
    category_id: "cat-1",
    name_ar: "دجاج كامل عضوي",
    name_en: "Organic Whole Chicken",
    name_fr: "Poulet Entier Biologique",
    description_ar: "دجاج كامل عضوي طازج، مرباة في مزارع طبيعية بدون هرمونات أو مضادات حيوية",
    description_en: "Fresh organic whole chicken, raised on natural farms without hormones or antibiotics",
    description_fr: "Poulet entier biologique frais, élevé dans des fermes naturelles sans hormones ni antibiotiques",
    price: 45.0,
    weight: 1.5,
    stock_quantity: 25,
    image_urls: ["/placeholder.svg?height=300&width=300"],
    is_featured: true,
    is_active: true,
    organic_certified: true,
    farm_location: "مزرعة الخير - تونس",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    category_id: "cat-2",
    name_ar: "صدور دجاج",
    name_en: "Chicken Breast",
    name_fr: "Blanc de Poulet",
    description_ar: "صدور دجاج عضوي طازج، خالي من الجلد والعظم",
    description_en: "Fresh organic chicken breast, skinless and boneless",
    description_fr: "Blanc de poulet biologique frais, sans peau et sans os",
    price: 55.0,
    weight: 0.8,
    stock_quantity: 30,
    image_urls: ["/placeholder.svg?height=300&width=300"],
    is_featured: true,
    is_active: true,
    organic_certified: true,
    farm_location: "مزرعة الخير - تونس",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key as any, language)

  const filteredProducts = products.filter(
    (product) =>
      product.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name_ar.includes(searchTerm) ||
      product.name_fr.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsFormOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  const handleToggleFeatured = (productId: string) => {
    setProducts(products.map((p) => (p.id === productId ? { ...p, is_featured: !p.is_featured } : p)))
  }

  const handleToggleActive = (productId: string) => {
    setProducts(products.map((p) => (p.id === productId ? { ...p, is_active: !p.is_active } : p)))
  }

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (selectedProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...productData, updated_at: new Date().toISOString() } : p,
        ),
      )
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        category_id: productData.category_id || "",
        name_ar: productData.name_ar || "",
        name_en: productData.name_en || "",
        name_fr: productData.name_fr || "",
        description_ar: productData.description_ar || "",
        description_en: productData.description_en || "",
        description_fr: productData.description_fr || "",
        price: productData.price || 0,
        weight: productData.weight || 0,
        stock_quantity: productData.stock_quantity || 0,
        image_urls: productData.image_urls || [],
        is_featured: productData.is_featured || false,
        is_active: productData.is_active || true,
        organic_certified: productData.organic_certified || true,
        farm_location: productData.farm_location || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setProducts([...products, newProduct])
    }
    setIsFormOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("manageProducts")}</h1>
          <p className="text-muted-foreground">
            {language === "ar" ? "إدارة وتحديث جميع المنتجات" : "Manage and update all products"}
          </p>
        </div>
        <Button onClick={handleAddProduct}>
          <Plus className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {t("addProduct")}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "ar" ? "إجمالي المنتجات" : "Total Products"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "ar" ? "المنتجات النشطة" : "Active Products"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter((p) => p.is_active).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "ar" ? "المنتجات المميزة" : "Featured Products"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter((p) => p.is_featured).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{language === "ar" ? "نفد المخزون" : "Out of Stock"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter((p) => p.stock_quantity === 0).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === "ar" ? "البحث في المنتجات..." : "Search products..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rtl:pl-3 rtl:pr-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {language === "ar" ? "تصفية" : "Filter"}
        </Button>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "ar" ? "قائمة المنتجات" : "Products List"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === "ar" ? "المنتج" : "Product"}</TableHead>
                <TableHead>{language === "ar" ? "السعر" : "Price"}</TableHead>
                <TableHead>{language === "ar" ? "المخزون" : "Stock"}</TableHead>
                <TableHead>{language === "ar" ? "الحالة" : "Status"}</TableHead>
                <TableHead>{language === "ar" ? "الإجراءات" : "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs">IMG</span>
                      </div>
                      <div>
                        <div className="font-medium">{product[`name_${language}` as keyof Product] as string}</div>
                        <div className="text-sm text-muted-foreground">{product.farm_location}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {product.price.toFixed(2)} {language === "ar" ? "د.ت" : "TND"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.stock_quantity > 0 ? "default" : "destructive"}>
                      {product.stock_quantity} {language === "ar" ? "قطعة" : "pcs"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant={product.is_active ? "default" : "secondary"}>
                        {product.is_active
                          ? language === "ar"
                            ? "نشط"
                            : "Active"
                          : language === "ar"
                            ? "غير نشط"
                            : "Inactive"}
                      </Badge>
                      {product.is_featured && (
                        <Badge variant="outline">
                          <Star className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
                          {language === "ar" ? "مميز" : "Featured"}
                        </Badge>
                      )}
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
                        <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {t("edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleFeatured(product.id)}>
                          <Star className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {product.is_featured
                            ? language === "ar"
                              ? "إلغاء التمييز"
                              : "Unfeature"
                            : language === "ar"
                              ? "تمييز"
                              : "Feature"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(product.id)}>
                          <Eye className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {product.is_active
                            ? language === "ar"
                              ? "إخفاء"
                              : "Hide"
                            : language === "ar"
                              ? "إظهار"
                              : "Show"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-red-600">
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

      {/* Product Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProduct ? t("editProduct") : t("addProduct")}</DialogTitle>
          </DialogHeader>
          <ProductForm product={selectedProduct} onSave={handleSaveProduct} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
