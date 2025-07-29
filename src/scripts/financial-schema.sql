-- Financial Management Schema
-- This script creates all necessary tables for comprehensive financial management

-- Enable RLS
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

-- Financial Transactions Table
CREATE TABLE IF NOT EXISTS public.financial_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense', 'refund', 'adjustment')),
    category_id UUID REFERENCES public.expense_categories(id),
    amount DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    reference_id UUID, -- Can reference orders, expenses, etc.
    reference_type VARCHAR(20), -- 'order', 'expense', 'manual', etc.
    payment_method VARCHAR(20) DEFAULT 'cash' CHECK (payment_method IN ('cash', 'card', 'bank_transfer', 'mobile_payment', 'other')),
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Revenue Streams Table
CREATE TABLE IF NOT EXISTS public.revenue_streams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name JSONB NOT NULL, -- {"en": "Product Sales", "ar": "مبيعات المنتجات", "fr": "Ventes de produits"}
    description JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expense Categories Table
CREATE TABLE IF NOT EXISTS public.expense_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name JSONB NOT NULL, -- {"en": "Feed", "ar": "العلف", "fr": "Alimentation"}
    description JSONB,
    budget_limit DECIMAL(10,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Monthly Financial Summaries Table
CREATE TABLE IF NOT EXISTS public.monthly_summaries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    total_revenue DECIMAL(12,2) DEFAULT 0,
    total_expenses DECIMAL(12,2) DEFAULT 0,
    net_profit DECIMAL(12,2) DEFAULT 0,
    transaction_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(year, month)
);

-- Add financial fields to orders table if not exists
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS payment_fee DECIMAL(8,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(8,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS discount_amount DECIMAL(8,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS net_amount DECIMAL(10,2) GENERATED ALWAYS AS (total_amount + payment_fee + tax_amount - discount_amount) STORED;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_financial_transactions_type ON public.financial_transactions(type);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_date ON public.financial_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_category ON public.financial_transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_monthly_summaries_year_month ON public.monthly_summaries(year, month);

-- Row Level Security Policies
CREATE POLICY "Admin only access" ON public.financial_transactions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admin only access" ON public.revenue_streams
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admin only access" ON public.expense_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admin only access" ON public.monthly_summaries
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Enable RLS on all financial tables
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_summaries ENABLE ROW LEVEL SECURITY;

-- Function to update monthly summaries
CREATE OR REPLACE FUNCTION update_monthly_summary()
RETURNS TRIGGER AS $$
DECLARE
    summary_year INTEGER;
    summary_month INTEGER;
BEGIN
    -- Extract year and month from transaction date
    summary_year := EXTRACT(YEAR FROM COALESCE(NEW.transaction_date, OLD.transaction_date));
    summary_month := EXTRACT(MONTH FROM COALESCE(NEW.transaction_date, OLD.transaction_date));
    
    -- Update or insert monthly summary
    INSERT INTO public.monthly_summaries (year, month, total_revenue, total_expenses, net_profit, transaction_count)
    VALUES (
        summary_year,
        summary_month,
        COALESCE((
            SELECT SUM(amount) FROM public.financial_transactions 
            WHERE type = 'income' 
            AND EXTRACT(YEAR FROM transaction_date) = summary_year
            AND EXTRACT(MONTH FROM transaction_date) = summary_month
        ), 0),
        COALESCE((
            SELECT SUM(amount) FROM public.financial_transactions 
            WHERE type = 'expense' 
            AND EXTRACT(YEAR FROM transaction_date) = summary_year
            AND EXTRACT(MONTH FROM transaction_date) = summary_month
        ), 0),
        COALESCE((
            SELECT SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) 
            FROM public.financial_transactions 
            WHERE type IN ('income', 'expense')
            AND EXTRACT(YEAR FROM transaction_date) = summary_year
            AND EXTRACT(MONTH FROM transaction_date) = summary_month
        ), 0),
        (
            SELECT COUNT(*) FROM public.financial_transactions 
            WHERE EXTRACT(YEAR FROM transaction_date) = summary_year
            AND EXTRACT(MONTH FROM transaction_date) = summary_month
        )
    )
    ON CONFLICT (year, month) DO UPDATE SET
        total_revenue = EXCLUDED.total_revenue,
        total_expenses = EXCLUDED.total_expenses,
        net_profit = EXCLUDED.net_profit,
        transaction_count = EXCLUDED.transaction_count,
        updated_at = NOW();
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic monthly summary updates
DROP TRIGGER IF EXISTS trigger_update_monthly_summary ON public.financial_transactions;
CREATE TRIGGER trigger_update_monthly_summary
    AFTER INSERT OR UPDATE OR DELETE ON public.financial_transactions
    FOR EACH ROW EXECUTE FUNCTION update_monthly_summary();

-- Function to automatically update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_financial_transactions_updated_at BEFORE UPDATE ON public.financial_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_revenue_streams_updated_at BEFORE UPDATE ON public.revenue_streams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expense_categories_updated_at BEFORE UPDATE ON public.expense_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_monthly_summaries_updated_at BEFORE UPDATE ON public.monthly_summaries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
