"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sprout, Home, Utensils, Truck } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function FarmProcess() {
  const { language, isRTL } = useLanguage()

  const processContent = {
    ar: {
      title: "عمليتنا الزراعية",
      subtitle: "من المزرعة إلى مائدتك - رحلة الجودة والعناية",
      steps: [
        {
          icon: Sprout,
          title: "التربية الطبيعية",
          description: "نربي دجاجنا في بيئة طبيعية مفتوحة، مع تغذية عضوية 100% وبدون مواد كيميائية",
          duration: "8-10 أسابيع",
        },
        {
          icon: Home,
          title: "المأوى الصحي",
          description: "مساكن واسعة ونظيفة مع تهوية طبيعية وإضاءة مناسبة لضمان راحة الدجاج",
          duration: "24/7 رعاية",
        },
        {
          icon: Utensils,
          title: "التجهيز الآمن",
          description: "تجهيز وتعبئة المنتجات وفق أعلى معايير السلامة والنظافة الغذائية",
          duration: "نفس اليوم",
        },
        {
          icon: Truck,
          title: "التوصيل الطازج",
          description: "توصيل سريع مع الحفاظ على سلسلة التبريد لضمان وصول المنتج طازجاً",
          duration: "خلال 24 ساعة",
        },
      ],
    },
    en: {
      title: "Our Farming Process",
      subtitle: "From farm to your table - a journey of quality and care",
      steps: [
        {
          icon: Sprout,
          title: "Natural Raising",
          description:
            "We raise our chickens in an open natural environment, with 100% organic feeding and no chemicals",
          duration: "8-10 weeks",
        },
        {
          icon: Home,
          title: "Healthy Shelter",
          description:
            "Spacious and clean housing with natural ventilation and appropriate lighting to ensure chicken comfort",
          duration: "24/7 care",
        },
        {
          icon: Utensils,
          title: "Safe Processing",
          description: "Processing and packaging products according to the highest food safety and hygiene standards",
          duration: "Same day",
        },
        {
          icon: Truck,
          title: "Fresh Delivery",
          description: "Fast delivery while maintaining the cold chain to ensure the product arrives fresh",
          duration: "Within 24 hours",
        },
      ],
    },
    fr: {
      title: "Notre Processus Agricole",
      subtitle: "De la ferme à votre table - un voyage de qualité et de soin",
      steps: [
        {
          icon: Sprout,
          title: "Élevage Naturel",
          description:
            "Nous élevons nos poulets dans un environnement naturel ouvert, avec une alimentation 100% biologique et sans produits chimiques",
          duration: "8-10 semaines",
        },
        {
          icon: Home,
          title: "Abri Sain",
          description:
            "Logements spacieux et propres avec ventilation naturelle et éclairage approprié pour assurer le confort des poulets",
          duration: "Soins 24/7",
        },
        {
          icon: Utensils,
          title: "Transformation Sûre",
          description:
            "Transformation et emballage des produits selon les plus hauts standards de sécurité alimentaire et d'hygiène",
          duration: "Le même jour",
        },
        {
          icon: Truck,
          title: "Livraison Fraîche",
          description:
            "Livraison rapide tout en maintenant la chaîne du froid pour s'assurer que le produit arrive frais",
          duration: "Dans les 24 heures",
        },
      ],
    },
  }

  const content = processContent[language]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{content.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Process Image */}
          <div className={`relative ${isRTL ? "lg:order-2" : ""}`}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Farm Process" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Process Steps */}
          <div className={`space-y-6 ${isRTL ? "lg:order-1" : ""}`}>
            {content.steps.map((step, index) => (
              <Card key={index} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                        <step.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {step.duration}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Flow */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-green-400 to-green-200 transform -translate-y-1/2 hidden lg:block"></div>
          <div className="grid lg:grid-cols-4 gap-8">
            {content.steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-green-400 text-green-600 mb-4 relative z-10">
                  <step.icon className="h-8 w-8" />
                </div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <div className="text-sm text-green-600 font-medium">{step.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
