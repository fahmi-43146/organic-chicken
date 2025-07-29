"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Leaf, Award, Truck } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import Image from "next/image"

export function HeroSection() {
  const { language, isRTL } = useLanguage()
  const t = (key: string) => getTranslation(key as any, language)

  const features = [
    {
      icon: <Leaf className="h-5 w-5" />,
      text: language === "ar" ? "100% عضوي" : language === "fr" ? "100% Biologique" : "100% Organic",
    },
    {
      icon: <Award className="h-5 w-5" />,
      text:
        language === "ar" ? "معتمد دولياً" : language === "fr" ? "Certifié International" : "Internationally Certified",
    },
    {
      icon: <Truck className="h-5 w-5" />,
      text: language === "ar" ? "توصيل سريع" : language === "fr" ? "Livraison Rapide" : "Fast Delivery",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-green-950 dark:via-background dark:to-green-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 ${isRTL ? "lg:order-2" : ""}`}>
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <Leaf className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
                {language === "ar"
                  ? "مزرعة عضوية معتمدة"
                  : language === "fr"
                    ? "Ferme Biologique Certifiée"
                    : "Certified Organic Farm"}
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-green-600">{t("heroTitle").split(" ")[0]}</span>{" "}
                <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  {t("heroTitle").split(" ").slice(1).join(" ")}
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">{t("heroSubtitle")}</p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm border"
                >
                  <div className="text-green-600">{feature.icon}</div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                {t("shopNow")}
                {isRTL ? <ArrowLeft className="ml-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
              <Button size="lg" variant="outline">
                {t("learnMore")}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-sm text-muted-foreground">
                  {language === "ar" ? "عميل راضي" : language === "fr" ? "Clients Satisfaits" : "Happy Customers"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">15+</div>
                <div className="text-sm text-muted-foreground">
                  {language === "ar" ? "سنة خبرة" : language === "fr" ? "Années d'Expérience" : "Years Experience"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-muted-foreground">
                  {language === "ar" ? "عضوي طبيعي" : language === "fr" ? "Biologique Naturel" : "Natural Organic"}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className={`relative ${isRTL ? "lg:order-1" : ""}`}>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Organic Chicken Farm"
                fill
                className="object-cover"
                priority
              />

              {/* Floating Cards */}
              <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    {language === "ar" ? "طازج اليوم" : language === "fr" ? "Frais Aujourd'hui" : "Fresh Today"}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">4.9★</div>
                  <div className="text-xs text-muted-foreground">
                    {language === "ar" ? "تقييم العملاء" : language === "fr" ? "Avis Clients" : "Customer Rating"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
