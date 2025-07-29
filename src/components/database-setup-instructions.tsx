"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Circle, Database, Key, Code, ExternalLink, Copy, Check } from "lucide-react"

const setupSteps = [
  {
    id: 1,
    title: "Create Supabase Project",
    description: "Sign up at supabase.com and create a new project",
    action: "Visit Supabase",
    link: "https://supabase.com",
    icon: Database,
  },
  {
    id: 2,
    title: "Get API Keys",
    description: "Copy your project URL and anon key from Settings > API",
    action: "Open Settings",
    icon: Key,
  },
  {
    id: 3,
    title: "Set Environment Variables",
    description: "Add your Supabase credentials to the environment",
    action: "Configure",
    icon: Code,
  },
  {
    id: 4,
    title: "Run Database Scripts",
    description: "Execute the SQL scripts to create tables and seed data",
    action: "Run Scripts",
    icon: Database,
  },
]

export function DatabaseSetupInstructions() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [copiedEnv, setCopiedEnv] = useState(false)

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  const isCompleted = (stepId: number) => completedSteps.includes(stepId)

  const copyEnvTemplate = async () => {
    const envTemplate = `NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key`

    try {
      await navigator.clipboard.writeText(envTemplate)
      setCopiedEnv(true)
      setTimeout(() => setCopiedEnv(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">🚀 Setup Your Organic Chicken Store</h1>
        <p className="text-lg text-muted-foreground">
          Follow these steps to configure your Supabase database and get your store running with real data
        </p>
      </div>

      <Alert className="mb-8">
        <Database className="h-4 w-4" />
        <AlertDescription>
          <strong>Current Status:</strong> The store is running with demo data. Complete the setup below to connect to
          your Supabase database and manage real products, orders, and customers.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {setupSteps.map((step) => (
          <Card
            key={step.id}
            className={`transition-all ${isCompleted(step.id) ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : ""}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleStep(step.id)}>
                  {isCompleted(step.id) ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
                <step.icon className="h-5 w-5" />
                <span>
                  Step {step.id}: {step.title}
                </span>
                {isCompleted(step.id) && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Complete
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{step.description}</p>

              {step.id === 1 && (
                <Button asChild>
                  <a href={step.link} target="_blank" rel="noopener noreferrer">
                    {step.action} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}

              {step.id === 2 && (
                <div className="space-y-3">
                  <p className="text-sm">In your Supabase dashboard:</p>
                  <ol className="text-sm space-y-1 ml-4 list-decimal">
                    <li>Go to Settings → API</li>
                    <li>Copy the "Project URL"</li>
                    <li>Copy the "anon public" key</li>
                    <li>Copy the "service_role" key (for admin operations)</li>
                  </ol>
                </div>
              )}

              {step.id === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Environment template:</span>
                    <Button variant="outline" size="sm" onClick={copyEnvTemplate}>
                      {copiedEnv ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedEnv ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                    <div className="text-green-600">NEXT_PUBLIC_SUPABASE_URL</div>=your_supabase_project_url
                    <br />
                    <div className="text-green-600">NEXT_PUBLIC_SUPABASE_ANON_KEY</div>=your_supabase_anon_key
                    <br />
                    <div className="text-green-600">SUPABASE_SERVICE_ROLE_KEY</div>=your_service_role_key
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Create a <code>.env.local</code> file in your project root and add these variables with your actual
                    Supabase credentials.
                  </p>
                </div>
              )}

              {step.id === 4 && (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    In your Supabase dashboard, go to SQL Editor and run these scripts in order:
                  </div>
                  <div className="space-y-2">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                      <div className="font-medium mb-1">1. Database Schema</div>
                      <div className="text-muted-foreground">scripts/database-schema.sql</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Creates tables, indexes, and security policies
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                      <div className="font-medium mb-1">2. Sample Data</div>
                      <div className="text-muted-foreground">scripts/seed-data.sql</div>
                      <div className="text-xs text-muted-foreground mt-1">Adds sample categories and products</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="text-sm text-muted-foreground mb-4">
          Progress: {completedSteps.length} of {setupSteps.length} steps completed
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-md mx-auto">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.length / setupSteps.length) * 100}%` }}
          />
        </div>
        {completedSteps.length === setupSteps.length && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-700 dark:text-green-300 font-medium">
              🎉 Setup Complete! Your store should now be connected to Supabase.
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              Refresh the homepage to see your products loaded from the database.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
