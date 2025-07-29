import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jekjwlylzkcukhvufrivanono.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impla2p3bHlsemtjdWtodnVmcml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MzUxMTIsImV4cCI6MjA2OTIxMTExMn0.ZkVz0W37vVUPMN276lQUL-z297OY8ckg5pLtWT-0xSA"

// Client-side Supabase client with singleton pattern
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (typeof window === "undefined") {
    // Server-side: create a new client each time
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }
  return supabaseClient
}

// For backward compatibility
export const supabase = getSupabaseClient()

// Server-side client factory
export function createServerClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Admin client with service role (for server-side admin operations)
export function createAdminClient() {
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impla2p3bHlsemtjdWtodnVmcml2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzYzNTExMiwiZXhwIjoyMDY5MjExMTEyfQ.lGaLMY_yy4HHJByG6nchTczKaAaMDmaKVd5mbQSPzrs"

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Test database connection with fallback to demo data
export async function testDatabaseConnection() {
  try {
    const client = getSupabaseClient()
    const { data, error } = await client.from("categories").select("count").limit(1)

    if (error) {
      console.warn("Database connection failed, using demo data:", error.message)
      return { connected: false, error: error.message }
    }

    return { connected: true, error: null }
  } catch (err: any) {
    console.warn("Database connection failed, using demo data:", err.message)
    return { connected: false, error: err.message }
  }
}
