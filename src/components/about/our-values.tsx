"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Heart, Shield, Truck, Award, Users } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function OurValues() {
  const { language } = useLanguage()

  const valuesContent = {
    ar: {
      title: "قيمنا ومبادئنا",
      subtitle: "المبادئ التي نؤمن بها وتوجه عملنا كل يوم",
      values: [
        {
          icon: Leaf,
          title: "الزراعة العضوية",
          description: "نلتزم بأعلى معايير الزراعة العضوية، بدون استخدام هرمونات أو مضادات حيوية أو مواد كيميائية ضارة",
        },
        {
          icon: Heart,
          title: "الرعاية والحب",
          description: "نربي دجاجنا بحب وعناية، في بيئة طبيعية صحية تضمن راحتها وسعادتها",
        },
        {
          icon: Shield,
          title: "الجودة والأمان",
          description: "نضمن أعلى مستويات الجودة والأمان الغذائي من خلال فحوصات دورية ومعايير صارمة",
        },
        {
          icon: Truck,
          title: "التوصيل الطازج",
          description: "نوصل منتجاتنا طازجة إلى بابك، مع الحفاظ على سلسلة التبريد والجودة",
        },
        {
          icon: Award,
          title: "التميز والإبداع",
          description: "نسعى دائماً للتميز والإبداع في تقديم أفضل المنتجات والخدمات لعملائنا",
        },
        {
          icon: Users,
          title: "خدمة العملاء",
          description: "رضا عملائنا هو أولويتنا، ونقدم خدمة عملاء متميزة ودعم مستمر",
        },
      ],
    },
    en: {
      title: "Our Values & Principles",
      subtitle: "The principles we believe in and that guide our work every day",
      values: [
        {
          icon: Leaf,
          title: "Organic Farming",
          description:
            "We adhere to the highest organic farming standards, without using hormones, antibiotics, or harmful chemicals",
        },
        {
          icon: Heart,
          title: "Care & Love",
          description:
            "We raise our chickens with love and care, in a healthy natural environment that ensures their comfort and happiness",
        },
        {
          icon: Shield,
          title: "Quality & Safety",
          description:
            "We guarantee the highest levels of quality and food safety through regular inspections and strict standards",
        },
        {
          icon: Truck,
          title: "Fresh Delivery",
          description: "We deliver our products fresh to your door, maintaining the cold chain and quality",
        },
        {
          icon: Award,
          title: "Excellence & Innovation",
          description:
            "We always strive for excellence and innovation in providing the best products and services to our customers",
        },
        {
          icon: Users,
          title: "Customer Service",
          description:
            "Customer satisfaction is our priority, and we provide excellent customer service and continuous support",
        },
      ],
    },
    fr: {
      title: "Nos Valeurs & Principes",
      subtitle: "Les principes auxquels nous croyons et qui guident notre travail chaque jour",
      values: [
        {
          icon: Leaf,
          title: "Agriculture Biologique",
          description:
            "Nous respectons les plus hauts standards de l'agriculture biologique, sans utiliser d'hormones, d'antibiotiques ou de produits chimiques nocifs",
        },
        {
          icon: Heart,
          title: "Soin & Amour",
          description:
            "Nous élevons nos poulets avec amour et soin, dans un environnement naturel sain qui assure leur confort et leur bonheur",
        },
        {
          icon: Shield,
          title: "Qualité & Sécurité",
          description:
            "Nous garantissons les plus hauts niveaux de qualité et de sécurité alimentaire grâce à des inspections régulières et des normes strictes",
        },
        {
          icon: Truck,
          title: "Livraison Fraîche",
          description: "Nous livrons nos produits frais à votre porte, en maintenant la chaîne du froid et la qualité",
        },
        {
          icon: Award,
          title: "Excellence & Innovation",
          description:
            "Nous nous efforçons toujours d'atteindre l'excellence et l'innovation dans la fourniture des meilleurs produits et services à nos clients",
        },
        {
          icon: Users,
          title: "Service Client",
          description:
            "La satisfaction de nos clients est notre priorité, et nous fournissons un excellent service client et un support continu",
        },
      ],
    },
  }

  const content = valuesContent[language]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{content.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.values.map((value, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 group-hover:scale-110 transition-transform">
                    <value.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
