-- Script to add anatounsi43146@gmail.com as admin user
-- This script handles both cases: user exists or doesn't exist

-- Function to make a user admin by email
CREATE OR REPLACE FUNCTION make_user_admin(user_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_id UUID;
    profile_exists BOOLEAN;
BEGIN
    -- Check if user exists in auth.users
    SELECT id INTO user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    IF user_id IS NULL THEN
        RETURN 'ERROR: User with email ' || user_email || ' not found. Please ask the user to sign up first.';
    END IF;
    
    -- Check if profile exists
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE id = user_id) INTO profile_exists;
    
    IF profile_exists THEN
        -- Update existing profile
        UPDATE public.profiles 
        SET role = 'admin', updated_at = NOW()
        WHERE id = user_id;
        
        RETURN 'SUCCESS: User ' || user_email || ' has been made admin (profile updated).';
    ELSE
        -- Create new profile with admin role
        INSERT INTO public.profiles (id, email, role, full_name)
        VALUES (
            user_id, 
            user_email, 
            'admin',
            (SELECT raw_user_meta_data->>'full_name' FROM auth.users WHERE id = user_id)
        );
        
        RETURN 'SUCCESS: User ' || user_email || ' has been made admin (profile created).';
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RETURN 'ERROR: ' || SQLERRM;
END;
$$;

-- Execute the function to make the user admin
SELECT make_user_admin('anatounsi43146@gmail.com');

-- Alternative direct approach if you know the user exists
-- Uncomment the lines below if you want to use direct SQL instead

/*
-- Direct update approach (use only if user already has a profile)
UPDATE public.profiles 
SET role = 'admin', updated_at = NOW()
WHERE email = 'anatounsi43146@gmail.com';

-- If the above returns 0 rows, the user might not have a profile yet
-- In that case, they need to sign up first through the application
*/

-- Verify the change
SELECT 
    p.email,
    p.role,
    p.full_name,
    p.created_at,
    p.updated_at,
    CASE 
        WHEN p.role = 'admin' THEN '✅ Admin Access Granted'
        ELSE '❌ Regular User'
    END as status
FROM public.profiles p
WHERE p.email = 'anatounsi43146@gmail.com';
