-- Script to verify all admin users in the system

-- Show all admin users
SELECT 
    p.id,
    p.email,
    p.full_name,
    p.role,
    p.created_at,
    p.updated_at,
    au.email_confirmed_at,
    au.last_sign_in_at,
    CASE 
        WHEN p.role = 'admin' THEN '✅ Admin'
        WHEN p.role = 'user' THEN '👤 User'
        ELSE '❓ Unknown'
    END as role_status
FROM public.profiles p
LEFT JOIN auth.users au ON p.id = au.id
ORDER BY p.role DESC, p.created_at DESC;

-- Count users by role
SELECT 
    role,
    COUNT(*) as user_count
FROM public.profiles
GROUP BY role
ORDER BY role;

-- Check specific user
SELECT 
    'anatounsi43146@gmail.com' as requested_email,
    CASE 
        WHEN EXISTS(SELECT 1 FROM public.profiles WHERE email = 'anatounsi43146@gmail.com' AND role = 'admin') 
        THEN '✅ User is Admin'
        WHEN EXISTS(SELECT 1 FROM public.profiles WHERE email = 'anatounsi43146@gmail.com' AND role = 'user') 
        THEN '👤 User exists but is not Admin'
        WHEN EXISTS(SELECT 1 FROM auth.users WHERE email = 'anatounsi43146@gmail.com') 
        THEN '⚠️ User exists in auth but no profile found'
        ELSE '❌ User not found - needs to sign up first'
    END as status;

-- Show recent admin activities (if you want to track admin actions)
SELECT 
    p.email,
    p.full_name,
    p.role,
    p.updated_at as last_profile_update,
    au.last_sign_in_at
FROM public.profiles p
LEFT JOIN auth.users au ON p.id = au.id
WHERE p.role = 'admin'
ORDER BY COALESCE(au.last_sign_in_at, p.updated_at) DESC;
