-- Insert sample categories
INSERT INTO categories (name_ar, name_en, name_fr, description_ar, description_en, description_fr, image_url) VALUES
('دجاج كامل', 'Whole Chicken', 'Poulet Entier', 'دجاج عضوي كامل طازج من المزرعة', 'Fresh organic whole chicken from the farm', 'Poulet entier biologique frais de la ferme', '/placeholder.svg?height=300&width=300'),
('قطع الدجاج', 'Chicken Cuts', 'Morceaux de Poulet', 'قطع دجاج عضوي متنوعة', 'Various organic chicken cuts', 'Divers morceaux de poulet biologique', '/placeholder.svg?height=300&width=300'),
('منتجات مصنعة', 'Processed Products', 'Produits Transformés', 'منتجات دجاج مصنعة عضوية', 'Organic processed chicken products', 'Produits de poulet biologique transformés', '/placeholder.svg?height=300&width=300')
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO products (category_id, name_ar, name_en, name_fr, description_ar, description_en, description_fr, price, weight, stock_quantity, image_urls, is_featured, organic_certified, farm_location) VALUES
-- Whole Chickens
((SELECT id FROM categories WHERE name_en = 'Whole Chicken' LIMIT 1), 'دجاج كامل عضوي', 'Organic Whole Chicken', 'Poulet Entier Biologique', 'دجاج كامل عضوي طازج، مرباة في مزارع طبيعية بدون هرمونات أو مضادات حيوية', 'Fresh organic whole chicken, raised on natural farms without hormones or antibiotics', 'Poulet entier biologique frais, élevé dans des fermes naturelles sans hormones ni antibiotiques', 45.00, 1.5, 25, ARRAY['/placeholder.svg?height=400&width=400'], true, true, 'مزرعة الخير - تونس'),

((SELECT id FROM categories WHERE name_en = 'Whole Chicken' LIMIT 1), 'دجاج كامل كبير', 'Large Whole Chicken', 'Grand Poulet Entier', 'دجاج كامل عضوي كبير الحجم، مثالي للعائلات الكبيرة', 'Large organic whole chicken, perfect for big families', 'Grand poulet entier biologique, parfait pour les grandes familles', 65.00, 2.2, 15, ARRAY['/placeholder.svg?height=400&width=400'], true, true, 'مزرعة النور - صفاقس'),

-- Chicken Cuts
((SELECT id FROM categories WHERE name_en = 'Chicken Cuts' LIMIT 1), 'صدور دجاج', 'Chicken Breast', 'Blanc de Poulet', 'صدور دجاج عضوي طازج، خالي من الجلد والعظم', 'Fresh organic chicken breast, skinless and boneless', 'Blanc de poulet biologique frais, sans peau et sans os', 55.00, 0.8, 30, ARRAY['/placeholder.svg?height=400&width=400'], true, true, 'مزرعة الخير - تونس'),

((SELECT id FROM categories WHERE name_en = 'Chicken Cuts' LIMIT 1), 'أفخاذ دجاج', 'Chicken Thighs', 'Cuisses de Poulet', 'أفخاذ دجاج عضوي طازج مع العظم', 'Fresh organic chicken thighs with bone', 'Cuisses de poulet biologique fraîches avec os', 35.00, 1.0, 40, ARRAY['/placeholder.svg?height=400&width=400'], false, true, 'مزرعة النور - صفاقس'),

((SELECT id FROM categories WHERE name_en = 'Chicken Cuts' LIMIT 1), 'أجنحة دجاج', 'Chicken Wings', 'Ailes de Poulet', 'أجنحة دجاج عضوي طازج، مثالية للشواء', 'Fresh organic chicken wings, perfect for grilling', 'Ailes de poulet biologique fraîches, parfaites pour griller', 25.00, 0.6, 50, ARRAY['/placeholder.svg?height=400&width=400'], false, true, 'مزرعة الخير - تونس'),

-- Processed Products
((SELECT id FROM categories WHERE name_en = 'Processed Products' LIMIT 1), 'نقانق دجاج', 'Chicken Sausages', 'Saucisses de Poulet', 'نقانق دجاج عضوي بالأعشاب الطبيعية', 'Organic chicken sausages with natural herbs', 'Saucisses de poulet biologique aux herbes naturelles', 28.00, 0.5, 20, ARRAY['/placeholder.svg?height=400&width=400'], false, true, 'مصنع الطبيعة - تونس'),

((SELECT id FROM categories WHERE name_en = 'Processed Products' LIMIT 1), 'برجر دجاج', 'Chicken Burgers', 'Burgers de Poulet', 'برجر دجاج عضوي محضر يدوياً', 'Handmade organic chicken burgers', 'Burgers de poulet biologique faits à la main', 32.00, 0.4, 25, ARRAY['/placeholder.svg?height=400&width=400'], true, true, 'مصنع الطبيعة - تونس'),

-- Additional featured products
((SELECT id FROM categories WHERE name_en = 'Chicken Cuts' LIMIT 1), 'دجاج مقطع للشواء', 'BBQ Chicken Cuts', 'Morceaux BBQ', 'قطع دجاج عضوي مخصصة للشواء والطبخ', 'Organic chicken cuts specially prepared for BBQ and cooking', 'Morceaux de poulet biologique spécialement préparés pour BBQ', 42.00, 1.2, 35, ARRAY['/placeholder.svg?height=400&width=400'], true, true, 'مزرعة الخير - تونس')
ON CONFLICT DO NOTHING;

-- Create a sample admin user profile (you'll need to sign up first with this email)
-- This is commented out - you'll need to sign up first, then run this
-- INSERT INTO profiles (id, email, full_name, role, preferred_language) 
-- VALUES ('your-user-id-here', 'hedi@organicchicken.tn', 'Hedi Mchaab', 'admin', 'ar')
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';
