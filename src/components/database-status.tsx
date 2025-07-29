"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Database } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface DatabaseStatus {
  connected: boolean
  error: string | null
  details: string
  tablesExist: boolean
}

export function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus>({
    connected: false,
    error: null,
    details: "Checking connection...",
    tablesExist: false,
  })
  const [isChecking, setIsChecking] = useState(true)

  const checkDatabaseConnection = async () => {
    setIsChecking(true)
    try {
      // Import supabase dynamically to avoid SSR issues
      const { createServerClient } = await import("@/lib/supabase")
      const supabase = createServerClient()

      // Test basic connection
      const { data, error } = await supabase.from("categories").select("count").limit(1)

      if (error) {
        setStatus({
          connected: false,
          error: error.message,
          details: `Error Code: ${error.code || "Unknown"}`,
          tablesExist: false,
        })
      } else {
        setStatus({
          connected: true,
          error: null,
          details: "Database connection successful",
          tablesExist: true,
        })
      }
    } catch (error: any) {
      setStatus({
        connected: false,
        error: error.message || "Connection failed",
        details: "Please check your Supabase configuration",
        tablesExist: false,
      })
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    checkDatabaseConnection()
  }, [])

  const getStatusIcon = () => {
    if (isChecking) {
      return <Database className="h-4 w-4 animate-pulse" />
    }
    if (status.connected) {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    }
    return <XCircle className="h-4 w-4 text-red-600" />
  }

  const getStatusColor = () => {
    if (isChecking) {
      return "border-blue-200 bg-blue-50 dark:bg-blue-900/20"
    }
    if (status.connected) {
      return "border-green-200 bg-green-50 dark:bg-green-900/20"
    }
    return "border-red-200 bg-red-50 dark:bg-red-900/20"
  }

  return (
    <Alert className={`mb-6 ${getStatusColor()}`}>
      <div className="flex items-center gap-2">
        {getStatusIcon()}
        <Database className="h-4 w-4" />
      </div>
      <AlertDescription>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div>
              <strong>Database Status:</strong>{" "}
              {isChecking ? (
                <span className="text-blue-700 dark:text-blue-300">🔄 Checking connection...</span>
              ) : status.connected ? (
                <span className="text-green-700 dark:text-green-300">✅ Connected to Supabase</span>
              ) : (
                <span className="text-red-700 dark:text-red-300">❌ Connection failed</span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">{status.details}</div>
            {status.error && <div className="text-sm text-red-600 dark:text-red-400">Error: {status.error}</div>}
          </div>
          <Button variant="outline" size="sm" onClick={checkDatabaseConnection} disabled={isChecking}>
            Recheck
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
