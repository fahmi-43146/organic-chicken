"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Circle, Database, Key, Code, ExternalLink } from "lucide-react"

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
    description: "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local",
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

export function SetupGuide() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  const isCompleted = (stepId: number) => completedSteps.includes(stepId)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">🚀 Setup Your Organic Chicken Store</h1>
        <p className="text-lg text-muted-foreground">
          Follow these steps to configure your Supabase database and get your store running
        </p>
      </div>

      <Alert className="mb-8">
        <Database className="h-4 w-4" />
        <AlertDescription>
          <strong>Demo Mode Active:</strong> The store is currently running with mock data. Complete the setup below to
          connect to your Supabase database.
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

              {step.id === 3 && (
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                  <div className="mb-2">
                    Create <code>.env.local</code> file:
                  </div>
                  <div className="text-green-600">NEXT_PUBLIC_SUPABASE_URL</div>=your_supabase_url
                  <br />
                  <div className="text-green-600">NEXT_PUBLIC_SUPABASE_ANON_KEY</div>=your_anon_key
                </div>
              )}

              {step.id === 4 && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Run these SQL scripts in your Supabase SQL Editor:
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                    <div>1. scripts/database-schema.sql</div>
                    <div>2. scripts/seed-data.sql</div>
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
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.length / setupSteps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
