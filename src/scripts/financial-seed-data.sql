-- Financial Management Seed Data
-- This script populates the financial tables with initial data

-- Insert Revenue Streams
INSERT INTO public.revenue_streams (name, description, is_active) VALUES
(
    '{"en": "Product Sales", "ar": "مبيعات المنتجات", "fr": "Ventes de produits"}',
    '{"en": "Revenue from chicken and poultry product sales", "ar": "الإيرادات من مبيعات الدجاج ومنتجات الدواجن", "fr": "Revenus des ventes de poulet et produits avicoles"}',
    true
),
(
    '{"en": "Wholesale Orders", "ar": "طلبات الجملة", "fr": "Commandes en gros"}',
    '{"en": "Bulk orders from restaurants and retailers", "ar": "الطلبات المجمعة من المطاعم وتجار التجزئة", "fr": "Commandes groupées des restaurants et détaillants"}',
    true
),
(
    '{"en": "Online Sales", "ar": "المبيعات الإلكترونية", "fr": "Ventes en ligne"}',
    '{"en": "E-commerce platform sales", "ar": "مبيعات منصة التجارة الإلكترونية", "fr": "Ventes de la plateforme e-commerce"}',
    true
),
(
    '{"en": "Subscription Services", "ar": "خدمات الاشتراك", "fr": "Services d\'abonnement"}',
    '{"en": "Monthly subscription boxes and services", "ar": "صناديق وخدمات الاشتراك الشهرية", "fr": "Boîtes et services d\'abonnement mensuel"}',
    true
);

-- Insert Expense Categories
INSERT INTO public.expense_categories (name, description, budget_limit, is_active) VALUES
(
    '{"en": "Feed & Nutrition", "ar": "العلف والتغذية", "fr": "Alimentation et nutrition"}',
    '{"en": "Chicken feed, supplements, and nutrition costs", "ar": "تكاليف علف الدجاج والمكملات والتغذية", "fr": "Coûts d\'alimentation, suppléments et nutrition des poulets"}',
    5000.00,
    true
),
(
    '{"en": "Veterinary Care", "ar": "الرعاية البيطرية", "fr": "Soins vétérinaires"}',
    '{"en": "Medical care, vaccines, and health treatments", "ar": "الرعاية الطبية واللقاحات والعلاجات الصحية", "fr": "Soins médicaux, vaccins et traitements de santé"}',
    2000.00,
    true
),
(
    '{"en": "Equipment & Maintenance", "ar": "المعدات والصيانة", "fr": "Équipement et maintenance"}',
    '{"en": "Farm equipment, tools, and maintenance costs", "ar": "معدات المزرعة والأدوات وتكاليف الصيانة", "fr": "Équipement de ferme, outils et coûts de maintenance"}',
    3000.00,
    true
),
(
    '{"en": "Utilities", "ar": "المرافق", "fr": "Services publics"}',
    '{"en": "Electricity, water, heating, and other utilities", "ar": "الكهرباء والماء والتدفئة والمرافق الأخرى", "fr": "Électricité, eau, chauffage et autres services"}',
    1500.00,
    true
),
(
    '{"en": "Labor & Wages", "ar": "العمالة والأجور", "fr": "Main-d\'œuvre et salaires"}',
    '{"en": "Employee wages, benefits, and labor costs", "ar": "أجور الموظفين والمزايا وتكاليف العمالة", "fr": "Salaires des employés, avantages et coûts de main-d\'œuvre"}',
    4000.00,
    true
),
(
    '{"en": "Transportation", "ar": "النقل", "fr": "Transport"}',
    '{"en": "Delivery, fuel, and transportation expenses", "ar": "تكاليف التوصيل والوقود والنقل", "fr": "Frais de livraison, carburant et transport"}',
    1000.00,
    true
),
(
    '{"en": "Marketing & Advertising", "ar": "التسويق والإعلان", "fr": "Marketing et publicité"}',
    '{"en": "Promotional activities, advertising, and marketing costs", "ar": "الأنشطة الترويجية والإعلان وتكاليف التسويق", "fr": "Activités promotionnelles, publicité et coûts marketing"}',
    800.00,
    true
),
(
    '{"en": "Administrative", "ar": "إدارية", "fr": "Administratif"}',
    '{"en": "Office supplies, software, and administrative expenses", "ar": "اللوازم المكتبية والبرمجيات والمصروفات الإدارية", "fr": "Fournitures de bureau, logiciels et frais administratifs"}',
    600.00,
    true
);

-- Insert Sample Financial Transactions (Last 6 months)
DO $$
DECLARE
    feed_category_id UUID;
    vet_category_id UUID;
    equipment_category_id UUID;
    utilities_category_id UUID;
    labor_category_id UUID;
    transport_category_id UUID;
    marketing_category_id UUID;
    admin_category_id UUID;
    current_date_iter DATE;
    i INTEGER;
BEGIN
    -- Get category IDs
    SELECT id INTO feed_category_id FROM public.expense_categories WHERE name->>'en' = 'Feed & Nutrition';
    SELECT id INTO vet_category_id FROM public.expense_categories WHERE name->>'en' = 'Veterinary Care';
    SELECT id INTO equipment_category_id FROM public.expense_categories WHERE name->>'en' = 'Equipment & Maintenance';
    SELECT id INTO utilities_category_id FROM public.expense_categories WHERE name->>'en' = 'Utilities';
    SELECT id INTO labor_category_id FROM public.expense_categories WHERE name->>'en' = 'Labor & Wages';
    SELECT id INTO transport_category_id FROM public.expense_categories WHERE name->>'en' = 'Transportation';
    SELECT id INTO marketing_category_id FROM public.expense_categories WHERE name->>'en' = 'Marketing & Advertising';
    SELECT id INTO admin_category_id FROM public.expense_categories WHERE name->>'en' = 'Administrative';

    -- Generate transactions for the last 6 months
    FOR i IN 0..5 LOOP
        current_date_iter := DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month' * i;
        
        -- Monthly Income Transactions
        INSERT INTO public.financial_transactions (type, amount, description, payment_method, transaction_date) VALUES
        ('income', 8500.00 + (RANDOM() * 2000), 'Product Sales - Month ' || TO_CHAR(current_date_iter, 'MM/YYYY'), 'card', current_date_iter + INTERVAL '5 days'),
        ('income', 3200.00 + (RANDOM() * 800), 'Wholesale Orders - Month ' || TO_CHAR(current_date_iter, 'MM/YYYY'), 'bank_transfer', current_date_iter + INTERVAL '10 days'),
        ('income', 1800.00 + (RANDOM() * 400), 'Online Sales - Month ' || TO_CHAR(current_date_iter, 'MM/YYYY'), 'card', current_date_iter + INTERVAL '15 days'),
        ('income', 950.00 + (RANDOM() * 200), 'Subscription Services - Month ' || TO_CHAR(current_date_iter, 'MM/YYYY'), 'card', current_date_iter + INTERVAL '20 days');

        -- Monthly Expense Transactions
        INSERT INTO public.financial_transactions (type, category_id, amount, description, payment_method, transaction_date) VALUES
        ('expense', feed_category_id, 1200.00 + (RANDOM() * 300), 'Monthly feed purchase - ' || TO_CHAR(current_date_iter, 'MM/YYYY'), 'cash', current_date_iter + INTERVAL '3 days'),
        ('expense', vet_category_id, 350.00 + (RANDOM() * 150), 'Veterinary checkup and vaccines - ' || TO_CHAR(current_date_iter, 'MM/YYYY'), 'card', current_date_iter + INTERVAL '7 days'),
        ('expense', equipment_category_id, 450.00 + (RANDOM() * 200), 'Equipment maintenance - ' || TO_CHAR(current_date_iter, 'MM/YYYY'), 'bank_transfer', current_date_iter + INTERVAL '12 days'),
        ('expense', utilities_category_id, 280.00 + (RANDOM() * 70), 'Monthly utilities - ' || TO_CHAR(current_date_iter, 'MM/YYYY'), 'bank_transfer', current_date_iter + INTERVAL '1 days'),
        ('expense', labor_category_id, 2800.00 + (RANDOM() * 400), 'Employee wages - ' || TO_CHAR(current_date_iter, 'MM/YYYY'), 'bank_transfer', current_date_iter + INTERVAL '25 days'),
        ('expense', transport_category_id, 180.00 + (RANDOM() * 50), 'Fuel and delivery costs - ' || TO_CHAR(current_date_iter, 'MM/YYYY'), 'cash', current_date_iter + INTERVAL '18 days'),
        ('expense', marketing_category_id, 120.00 + (RANDOM() * 80), 'Social media advertising - ' || TO_CHAR(current_date_iter, 'MM/YYYY'), 'card', current_date_iter + INTERVAL '14 days'),
        ('expense', admin_category_id, 95.00 + (RANDOM() * 30), 'Office supplies and software - ' || TO_CHAR(current_date_iter, 'MM/YYYY'), 'card', current_date_iter + INTERVAL '8 days');
    END LOOP;

    -- Add some additional random transactions
    INSERT INTO public.financial_transactions (type, category_id, amount, description, payment_method, transaction_date) VALUES
    ('income', NULL, 1500.00, 'Special bulk order from restaurant chain', 'bank_transfer', CURRENT_DATE - INTERVAL '2 days'),
    ('expense', equipment_category_id, 850.00, 'New incubator equipment', 'card', CURRENT_DATE - INTERVAL '5 days'),
    ('refund', NULL, 120.00, 'Customer refund for damaged products', 'card', CURRENT_DATE - INTERVAL '3 days'),
    ('income', NULL, 2200.00, 'Farmers market weekend sales', 'cash', CURRENT_DATE - INTERVAL '1 day'),
    ('expense', feed_category_id, 320.00, 'Premium organic feed supplement', 'cash', CURRENT_DATE - INTERVAL '4 days');

END $$;

-- Update monthly summaries (trigger should handle this automatically, but let's ensure it's done)
INSERT INTO public.monthly_summaries (year, month, total_revenue, total_expenses, net_profit, transaction_count)
SELECT 
    EXTRACT(YEAR FROM transaction_date)::INTEGER as year,
    EXTRACT(MONTH FROM transaction_date)::INTEGER as month,
    COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_revenue,
    COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expenses,
    COALESCE(SUM(CASE WHEN type = 'income' THEN amount WHEN type = 'expense' THEN -amount ELSE 0 END), 0) as net_profit,
    COUNT(*) as transaction_count
FROM public.financial_transactions
GROUP BY EXTRACT(YEAR FROM transaction_date), EXTRACT(MONTH FROM transaction_date)
ON CONFLICT (year, month) DO UPDATE SET
    total_revenue = EXCLUDED.total_revenue,
    total_expenses = EXCLUDED.total_expenses,
    net_profit = EXCLUDED.net_profit,
    transaction_count = EXCLUDED.transaction_count,
    updated_at = NOW();
