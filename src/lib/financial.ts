import { getSupabaseClient, testDatabaseConnection } from "./supabase"
import type {
  FinancialTransaction,
  ExpenseCategory,
  RevenueStream,
  MonthlySummary,
  FinancialStats,
  ChartData,
} from "./types"

// Demo data for offline functionality
const demoTransactions: FinancialTransaction[] = [
  {
    id: "1",
    type: "income",
    amount: 8500,
    description: "Product Sales - December 2024",
    payment_method: "card",
    transaction_date: "2024-12-15T10:00:00Z",
    created_at: "2024-12-15T10:00:00Z",
    updated_at: "2024-12-15T10:00:00Z",
  },
  {
    id: "2",
    type: "expense",
    amount: 1200,
    description: "Monthly feed purchase",
    payment_method: "cash",
    transaction_date: "2024-12-10T14:30:00Z",
    created_at: "2024-12-10T14:30:00Z",
    updated_at: "2024-12-10T14:30:00Z",
  },
]

const demoExpenseCategories: ExpenseCategory[] = [
  {
    id: "1",
    name: { en: "Feed & Nutrition", ar: "العلف والتغذية", fr: "Alimentation et nutrition" },
    description: {
      en: "Chicken feed and supplements",
      ar: "علف الدجاج والمكملات",
      fr: "Alimentation et suppléments pour poulets",
    },
    budget_limit: 5000,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

const demoRevenueStreams: RevenueStream[] = [
  {
    id: "1",
    name: { en: "Product Sales", ar: "مبيعات المنتجات", fr: "Ventes de produits" },
    description: {
      en: "Revenue from product sales",
      ar: "الإيرادات من مبيعات المنتجات",
      fr: "Revenus des ventes de produits",
    },
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

// Financial Transactions
export async function getFinancialTransactions(): Promise<FinancialTransaction[]> {
  try {
    const { connected } = await testDatabaseConnection()
    if (!connected) {
      return demoTransactions
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("financial_transactions")
      .select(`
        *,
        category:expense_categories(*)
      `)
      .order("transaction_date", { ascending: false })

    if (error) {
      console.error("Error fetching transactions:", error)
      return demoTransactions
    }

    return data || demoTransactions
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return demoTransactions
  }
}

export async function createFinancialTransaction(
  transaction: Omit<FinancialTransaction, "id" | "created_at" | "updated_at">,
): Promise<{ data?: FinancialTransaction; error?: string }> {
  try {
    const { connected } = await testDatabaseConnection()
    if (!connected) {
      return { error: "Database not connected" }
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("financial_transactions").insert([transaction]).select().single()

    if (error) {
      return { error: error.message }
    }

    return { data }
  } catch (error) {
    return { error: "Failed to create transaction" }
  }
}

export async function updateFinancialTransaction(
  id: string,
  updates: Partial<FinancialTransaction>,
): Promise<{ data?: FinancialTransaction; error?: string }> {
  try {
    const { connected } = await testDatabaseConnection()
    if (!connected) {
      return { error: "Database not connected" }
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("financial_transactions").update(updates).eq("id", id).select().single()

    if (error) {
      return { error: error.message }
    }

    return { data }
  } catch (error) {
    return { error: "Failed to update transaction" }
  }
}

export async function deleteFinancialTransaction(id: string): Promise<{ error?: string }> {
  try {
    const { connected } = await testDatabaseConnection()
    if (!connected) {
      return { error: "Database not connected" }
    }

    const supabase = getSupabaseClient()
    const { error } = await supabase.from("financial_transactions").delete().eq("id", id)

    if (error) {
      return { error: error.message }
    }

    return {}
  } catch (error) {
    return { error: "Failed to delete transaction" }
  }
}

// Expense Categories
export async function getExpenseCategories(): Promise<ExpenseCategory[]> {
  try {
    const { connected } = await testDatabaseConnection()
    if (!connected) {
      return demoExpenseCategories
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("expense_categories")
      .select("*")
      .eq("is_active", true)
      .order("name->en")

    if (error) {
      console.error("Error fetching expense categories:", error)
      return demoExpenseCategories
    }

    return data || demoExpenseCategories
  } catch (error) {
    console.error("Error fetching expense categories:", error)
    return demoExpenseCategories
  }
}

export async function createExpenseCategory(
  category: Omit<ExpenseCategory, "id" | "created_at" | "updated_at">,
): Promise<{ data?: ExpenseCategory; error?: string }> {
  try {
    const { connected } = await testDatabaseConnection()
    if (!connected) {
      return { error: "Database not connected" }
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("expense_categories").insert([category]).select().single()

    if (error) {
      return { error: error.message }
    }

    return { data }
  } catch (error) {
    return { error: "Failed to create expense category" }
  }
}

// Revenue Streams
export async function getRevenueStreams(): Promise<RevenueStream[]> {
  try {
    const { connected } = await testDatabaseConnection()
    if (!connected) {
      return demoRevenueStreams
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("revenue_streams").select("*").eq("is_active", true).order("name->en")

    if (error) {
      console.error("Error fetching revenue streams:", error)
      return demoRevenueStreams
    }

    return data || demoRevenueStreams
  } catch (error) {
    console.error("Error fetching revenue streams:", error)
    return demoRevenueStreams
  }
}

// Financial Statistics
export async function getFinancialStats(): Promise<FinancialStats> {
  try {
    const { connected } = await testDatabaseConnection()
    if (!connected) {
      return {
        totalRevenue: 45000,
        totalExpenses: 28000,
        netProfit: 17000,
        profitMargin: 37.8,
        transactionCount: 156,
        averageTransactionValue: 288.46,
        monthlyGrowth: 12.5,
        topExpenseCategory: "Feed & Nutrition",
        budgetUtilization: 68.5,
      }
    }

    const supabase = getSupabaseClient()

    // Get current month stats
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1

    const { data: transactions } = await supabase.from("financial_transactions").select("*")

    if (!transactions) {
      return {
        totalRevenue: 0,
        totalExpenses: 0,
        netProfit: 0,
        profitMargin: 0,
        transactionCount: 0,
        averageTransactionValue: 0,
        monthlyGrowth: 0,
        topExpenseCategory: "",
        budgetUtilization: 0,
      }
    }

    const totalRevenue = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    const netProfit = totalRevenue - totalExpenses
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      profitMargin,
      transactionCount: transactions.length,
      averageTransactionValue:
        transactions.length > 0 ? totalRevenue / transactions.filter((t) => t.type === "income").length : 0,
      monthlyGrowth: 12.5, // This would need more complex calculation
      topExpenseCategory: "Feed & Nutrition",
      budgetUtilization: 68.5,
    }
  } catch (error) {
    console.error("Error fetching financial stats:", error)
    return {
      totalRevenue: 0,
      totalExpenses: 0,
      netProfit: 0,
      profitMargin: 0,
      transactionCount: 0,
      averageTransactionValue: 0,
      monthlyGrowth: 0,
      topExpenseCategory: "",
      budgetUtilization: 0,
    }
  }
}

// Chart Data
export async function getRevenueExpenseChartData(): Promise<ChartData[]> {
  try {
    const { connected } = await testDatabaseConnection()
    if (!connected) {
      return [
        { name: "Jan", revenue: 8500, expenses: 5200, profit: 3300 },
        { name: "Feb", revenue: 9200, expenses: 5800, profit: 3400 },
        { name: "Mar", revenue: 8800, expenses: 5500, profit: 3300 },
        { name: "Apr", revenue: 9500, expenses: 6100, profit: 3400 },
        { name: "May", revenue: 10200, expenses: 6400, profit: 3800 },
        { name: "Dec", revenue: 11000, expenses: 6800, profit: 4200 },
      ]
    }

    const supabase = getSupabaseClient()
    const { data: summaries } = await supabase
      .from("monthly_summaries")
      .select("*")
      .order("year", { ascending: true })
      .order("month", { ascending: true })
      .limit(12)

    if (!summaries || summaries.length === 0) {
      return []
    }

    return summaries.map((summary) => ({
      name: new Date(summary.year, summary.month - 1).toLocaleDateString("en", { month: "short" }),
      revenue: summary.total_revenue,
      expenses: summary.total_expenses,
      profit: summary.net_profit,
    }))
  } catch (error) {
    console.error("Error fetching chart data:", error)
    return []
  }
}

export async function getExpenseCategoryChartData(): Promise<ChartData[]> {
  try {
    const { connected } = await testDatabaseConnection()
    if (!connected) {
      return [
        { name: "Feed & Nutrition", value: 1200 },
        { name: "Labor & Wages", value: 2800 },
        { name: "Equipment", value: 450 },
        { name: "Utilities", value: 280 },
        { name: "Transportation", value: 180 },
      ]
    }

    const supabase = getSupabaseClient()
    const { data } = await supabase
      .from("financial_transactions")
      .select(`
        amount,
        category:expense_categories(name)
      `)
      .eq("type", "expense")
      .not("category_id", "is", null)

    if (!data) return []

    const categoryTotals: { [key: string]: number } = {}

    data.forEach((transaction) => {
      if (transaction.category?.name?.en) {
        const categoryName = transaction.category.name.en
        categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + transaction.amount
      }
    })

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }))
  } catch (error) {
    console.error("Error fetching expense category chart data:", error)
    return []
  }
}

// Monthly Summaries
export async function getMonthlySummaries(): Promise<MonthlySummary[]> {
  try {
    const { connected } = await testDatabaseConnection()
    if (!connected) {
      return []
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("monthly_summaries")
      .select("*")
      .order("year", { ascending: false })
      .order("month", { ascending: false })
      .limit(12)

    if (error) {
      console.error("Error fetching monthly summaries:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching monthly summaries:", error)
    return []
  }
}
