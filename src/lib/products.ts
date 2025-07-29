import { getSupabaseClient } from "@/lib/supabase"
import type { Product } from "@/lib/types"

// Demo data fallback
const demoProducts: Product[] = [
  {
    id: "demo-1",
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
    image_urls: ["/images/whole-chicken.jpg"],
    is_featured: true,
    is_active: true,
    organic_certified: true,
    farm_location: "مزرعة الخير - تونس",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
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
    image_urls: ["/images/chicken-breast.jpg"],
    is_featured: true,
    is_active: true,
    organic_certified: true,
    farm_location: "مزرعة الخير - تونس",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-3",
    category_id: "cat-3",
    name_ar: "أفخاذ دجاج",
    name_en: "Chicken Thighs",
    name_fr: "Cuisses de Poulet",
    description_ar: "أفخاذ دجاج عضوي طازج، طري ولذيذ",
    description_en: "Fresh organic chicken thighs, tender and flavorful",
    description_fr: "Cuisses de poulet biologique fraîches, tendres et savoureuses",
    price: 42.0,
    weight: 1.0,
    stock_quantity: 20,
    image_urls: ["/images/chicken-thighs.jpg"],
    is_featured: false,
    is_active: true,
    organic_certified: true,
    farm_location: "مزرعة الخير - تونس",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-4",
    category_id: "cat-4",
    name_ar: "أجنحة دجاج",
    name_en: "Chicken Wings",
    name_fr: "Ailes de Poulet",
    description_ar: "أجنحة دجاج عضوي طازج، مثالية للشواء",
    description_en: "Fresh organic chicken wings, perfect for grilling",
    description_fr: "Ailes de poulet biologique fraîches, parfaites pour griller",
    price: 38.0,
    weight: 0.6,
    stock_quantity: 15,
    image_urls: ["/images/chicken-wings.jpg"],
    is_featured: false,
    is_active: true,
    organic_certified: true,
    farm_location: "مزرعة الخير - تونس",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-5",
    category_id: "cat-5",
    name_ar: "بيض عضوي",
    name_en: "Organic Eggs",
    name_fr: "Œufs Biologiques",
    description_ar: "بيض عضوي طازج من دجاج حر المرعى",
    description_en: "Fresh organic eggs from free-range chickens",
    description_fr: "Œufs biologiques frais de poules élevées en liberté",
    price: 12.0,
    weight: 0.6,
    stock_quantity: 50,
    image_urls: ["/placeholder.svg?height=300&width=300&text=Organic+Eggs"],
    is_featured: true,
    is_active: true,
    organic_certified: true,
    farm_location: "مزرعة الخير - تونس",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-6",
    category_id: "cat-6",
    name_ar: "دجاج مقطع",
    name_en: "Cut Chicken",
    name_fr: "Poulet Découpé",
    description_ar: "دجاج عضوي مقطع إلى قطع مناسبة للطبخ",
    description_en: "Organic chicken cut into cooking-ready pieces",
    description_fr: "Poulet biologique découpé en morceaux prêts à cuisiner",
    price: 48.0,
    weight: 1.2,
    stock_quantity: 0, // Out of stock
    image_urls: ["/placeholder.svg?height=300&width=300&text=Cut+Chicken"],
    is_featured: false,
    is_active: true,
    organic_certified: true,
    farm_location: "مزرعة الخير - تونس",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = getSupabaseClient()

    const { data: products, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*)
      `)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.warn("Failed to fetch products from database, using demo data:", error.message)
      return demoProducts
    }

    return products || demoProducts
  } catch (error) {
    console.warn("Database connection failed, using demo data:", error)
    return demoProducts
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = getSupabaseClient()

    const { data: products, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*)
      `)
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(6)

    if (error) {
      console.warn("Failed to fetch featured products from database, using demo data:", error.message)
      return demoProducts.filter((p) => p.is_featured).slice(0, 6)
    }

    return products || demoProducts.filter((p) => p.is_featured).slice(0, 6)
  } catch (error) {
    console.warn("Database connection failed, using demo data:", error)
    return demoProducts.filter((p) => p.is_featured).slice(0, 6)
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const supabase = getSupabaseClient()

    const { data: product, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*)
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.warn("Failed to fetch product from database, using demo data:", error.message)
      return demoProducts.find((p) => p.id === id) || null
    }

    return product
  } catch (error) {
    console.warn("Database connection failed, using demo data:", error)
    return demoProducts.find((p) => p.id === id) || null
  }
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    const supabase = getSupabaseClient()

    const { data: products, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*)
      `)
      .eq("category_id", categoryId)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.warn("Failed to fetch products by category from database, using demo data:", error.message)
      return demoProducts.filter((p) => p.category_id === categoryId)
    }

    return products || demoProducts.filter((p) => p.category_id === categoryId)
  } catch (error) {
    console.warn("Database connection failed, using demo data:", error)
    return demoProducts.filter((p) => p.category_id === categoryId)
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const supabase = getSupabaseClient()

    const { data: products, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*)
      `)
      .eq("is_active", true)
      .or(
        `name_en.ilike.%${query}%,name_ar.ilike.%${query}%,name_fr.ilike.%${query}%,description_en.ilike.%${query}%,description_ar.ilike.%${query}%,description_fr.ilike.%${query}%`,
      )
      .order("created_at", { ascending: false })

    if (error) {
      console.warn("Failed to search products in database, using demo data:", error.message)
      return demoProducts.filter(
        (p) =>
          p.name_en.toLowerCase().includes(query.toLowerCase()) ||
          p.name_ar.includes(query) ||
          p.name_fr.toLowerCase().includes(query.toLowerCase()) ||
          p.description_en.toLowerCase().includes(query.toLowerCase()) ||
          p.description_ar.includes(query) ||
          p.description_fr.toLowerCase().includes(query.toLowerCase()),
      )
    }

    return products || []
  } catch (error) {
    console.warn("Database connection failed, using demo data:", error)
    return demoProducts.filter(
      (p) =>
        p.name_en.toLowerCase().includes(query.toLowerCase()) ||
        p.name_ar.includes(query) ||
        p.name_fr.toLowerCase().includes(query.toLowerCase()),
    )
  }
}
