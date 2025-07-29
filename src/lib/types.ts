export interface Product {
  id: string
  name: {
    en: string
    ar: string
    fr: string
  }
  description: {
    en: string
    ar: string
    fr: string
  }
  price: number
  image_url: string
  category_id: string
  stock_quantity: number
  is_featured: boolean
  is_organic: boolean
  weight?: number
  unit: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: {
    en: string
    ar: string
    fr: string
  }
  description: {
    en: string
    ar: string
    fr: string
  }
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  items: CartItem[]
  total_amount: number
  payment_fee?: number
  tax_amount?: number
  discount_amount?: number
  net_amount?: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  payment_method: "cash" | "card" | "bank_transfer" | "mobile_payment"
  notes?: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  full_name?: string
  role: "user" | "admin"
  created_at: string
  updated_at: string
}

// Financial Management Types
export interface FinancialTransaction {
  id: string
  type: "income" | "expense" | "refund" | "adjustment"
  category_id?: string
  category?: ExpenseCategory
  amount: number
  description: string
  reference_id?: string
  reference_type?: string
  payment_method: "cash" | "card" | "bank_transfer" | "mobile_payment" | "other"
  transaction_date: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface RevenueStream {
  id: string
  name: {
    en: string
    ar: string
    fr: string
  }
  description?: {
    en: string
    ar: string
    fr: string
  }
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ExpenseCategory {
  id: string
  name: {
    en: string
    ar: string
    fr: string
  }
  description?: {
    en: string
    ar: string
    fr: string
  }
  budget_limit: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MonthlySummary {
  id: string
  year: number
  month: number
  total_revenue: number
  total_expenses: number
  net_profit: number
  transaction_count: number
  created_at: string
  updated_at: string
}

export interface FinancialStats {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  profitMargin: number
  transactionCount: number
  averageTransactionValue: number
  monthlyGrowth: number
  topExpenseCategory: string
  budgetUtilization: number
}

export interface ChartData {
  name: string
  value: number
  date?: string
  revenue?: number
  expenses?: number
  profit?: number
}

export type Language = "en" | "ar" | "fr"

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
}
