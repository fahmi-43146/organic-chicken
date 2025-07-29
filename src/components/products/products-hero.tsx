"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Award, Truck, Shield } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

export function ProductsHero() {
  const { language } = useLanguage()

  const stats = [
    {
      icon: Leaf,
      value: "100%",
      label: language === "ar" ? "عضوي" : language === "fr" ? "Bio" : "Organic",
      color: "text-green-600",
    },
    {
      icon: Award,
      value: "15+",
      label: language === "ar" ? "سنة خبرة" : language === "fr" ? "Années d'expérience" : "Years Experience",
      color: "text-blue-600",
    },
    {
      icon: Truck,
      value: "24h",
      label: language === "ar" ? "توصيل سريع" : language === "fr" ? "Livraison rapide" : "Fast Delivery",
      color: "text-orange-600",
    },
    {
      icon: Shield,
      value: "A+",
      label: language === "ar" ? "جودة مضمونة" : language === "fr" ? "Qualité garantie" : "Quality Assured",
      color: "text-purple-600",
    },
  ]

  return (
    <section className="relative bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {getTranslation("organicChicken", language)}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === "ar" ? "منتجاتنا الطازجة" : language === "fr" ? "Nos Produits Frais" : "Our Fresh Products"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "ar"
              ? "اكتشف مجموعتنا المتنوعة من منتجات الدجاج العضوي الطازج المربى بأعلى معايير الجودة"
              : language === "fr"
                ? "Découvrez notre gamme variée de produits de poulet bio frais élevés selon les plus hauts standards de qualité"
                : "Discover our diverse range of fresh organic chicken products raised to the highest quality standards"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-background mb-4 ${stat.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
