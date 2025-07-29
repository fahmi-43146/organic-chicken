"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Database, CheckCircle, XCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface TestResult {
  test: string
  status: "success" | "error" | "pending"
  message: string
  details?: any
}

export function DatabaseTest() {
  const [tests, setTests] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    const testResults: TestResult[] = []

    // Test 1: Basic connection
    try {
      const { data, error } = await supabase.from("categories").select("count")
      testResults.push({
        test: "Database Connection",
        status: error ? "error" : "success",
        message: error ? error.message : "Connection successful",
        details: error ? error : data,
      })
    } catch (err: any) {
      testResults.push({
        test: "Database Connection",
        status: "error",
        message: err.message || "Connection failed",
        details: err,
      })
    }

    // Test 2: Categories table
    try {
      const { data, error } = await supabase.from("categories").select("*").limit(1)
      testResults.push({
        test: "Categories Table",
        status: error ? "error" : "success",
        message: error ? error.message : `Found ${data?.length || 0} categories`,
        details: data,
      })
    } catch (err: any) {
      testResults.push({
        test: "Categories Table",
        status: "error",
        message: err.message || "Query failed",
        details: err,
      })
    }

    // Test 3: Products table
    try {
      const { data, error } = await supabase.from("products").select("*").limit(1)
      testResults.push({
        test: "Products Table",
        status: error ? "error" : "success",
        message: error ? error.message : `Found ${data?.length || 0} products`,
        details: data,
      })
    } catch (err: any) {
      testResults.push({
        test: "Products Table",
        status: "error",
        message: err.message || "Query failed",
        details: err,
      })
    }

    setTests(testResults)
    setIsRunning(false)
  }

  useEffect(() => {
    runTests()
  }, [])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Connection Test
          <Button variant="outline" size="sm" onClick={runTests} disabled={isRunning}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRunning ? "animate-spin" : ""}`} />
            {isRunning ? "Testing..." : "Retest"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tests.map((test, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="mt-0.5">
                {test.status === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : test.status === "error" ? (
                  <XCircle className="h-5 w-5 text-red-600" />
                ) : (
                  <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{test.test}</span>
                  <Badge variant={test.status === "success" ? "default" : "destructive"}>{test.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{test.message}</p>
                {test.details && (
                  <details className="mt-2">
                    <summary className="text-xs text-muted-foreground cursor-pointer">Show details</summary>
                    <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 overflow-auto">
                      {JSON.stringify(test.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
