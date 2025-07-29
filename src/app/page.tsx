import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { DatabaseStatus } from "@/components/database-status"
import { Suspense } from "react"

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Database Status - only show in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="container mx-auto px-4 py-4">
          <Suspense fallback={null}>
            <DatabaseStatus />
          </Suspense>
        </div>
      )}

      <Suspense
        fallback={
          <div className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 animate-pulse">
                    <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <FeaturedProducts />
      </Suspense>
    </>
  )
}
