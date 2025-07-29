"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Leaf, Award, Heart } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function AboutHero() {
  const { language, isRTL } = useLanguage()

  const heroContent = {
    ar: {
      badge: "قصتنا",
      title: "مزرعة هادي مشعب",
      subtitle: "رحلة من الشغف إلى التميز في تربية الدجاج العضوي",
      description:
        "منذ أكثر من 15 عاماً، نحن نقدم أفضل أنواع الدجاج العضوي الطازج في تونس. قصتنا بدأت بحلم بسيط: تقديم طعام صحي وطبيعي للعائلات التونسية.",
      stats: [
        { number: "15+", label: "سنة خبرة" },
        { number: "500+", label: "عميل راضي" },
        { number: "100%", label: "عضوي طبيعي" },
      ],
    },
    en: {
      badge: "Our Story",
      title: "Hedi Mchaab Farm",
      subtitle: "A journey from passion to excellence in organic chicken farming",
      description:
        "For over 15 years, we have been providing the finest organic fresh chicken in Tunisia. Our story began with a simple dream: to provide healthy and natural food for Tunisian families.",
      stats: [
        { number: "15+", label: "Years Experience" },
        { number: "500+", label: "Happy Customers" },
        { number: "100%", label: "Natural Organic" },
      ],
    },
    fr: {
      badge: "Notre Histoire",
      title: "Ferme Hedi Mchaab",
      subtitle: "Un voyage de la passion à l'excellence dans l'élevage de poulet biologique",
      description:
        "Depuis plus de 15 ans, nous fournissons le meilleur poulet biologique frais en Tunisie. Notre histoire a commencé avec un rêve simple : fournir une alimentation saine et naturelle aux familles tunisiennes.",
      stats: [
        { number: "15+", label: "Années d'Expérience" },
        { number: "500+", label: "Clients Satisfaits" },
        { number: "100%", label: "Biologique Naturel" },
      ],
    },
  }

  const content = heroContent[language]

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-green-950 dark:via-background dark:to-green-950"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 ${isRTL ? "lg:order-2" : ""}`}>
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <Leaf className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
                {content.badge}
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                    {content.title}
                  </span>
                </h1>
                <h2 className="text-xl lg:text-2xl text-muted-foreground font-medium">{content.subtitle}</h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">{content.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              {content.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Values Icons */}
            <div className="flex gap-6 pt-6">
              <div className="flex items-center gap-2 text-green-600">
                <Heart className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {language === "ar" ? "بحب وعناية" : language === "fr" ? "Avec Amour" : "With Love"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Award className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {language === "ar" ? "جودة معتمدة" : language === "fr" ? "Qualité Certifiée" : "Certified Quality"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Leaf className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {language === "ar" ? "طبيعي 100%" : language === "fr" ? "100% Naturel" : "100% Natural"}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className={`relative ${isRTL ? "lg:order-1" : ""}`}>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
              <Image
                src="/placeholder.svg?height=600&width=480"
                alt="Hedi Mchaab - Farm Owner"
                fill
                className="object-cover"
                priority
              />

              {/* Floating Elements */}
              <div className="absolute top-6 left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      {language === "ar" ? "عضوي معتمد" : language === "fr" ? "Bio Certifié" : "Certified Organic"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {language === "ar" ? "منذ 2008" : language === "fr" ? "Depuis 2008" : "Since 2008"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4.9★</div>
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
