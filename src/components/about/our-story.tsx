"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function OurStory() {
  const { language, isRTL } = useLanguage()

  const storyContent = {
    ar: {
      title: "قصتنا",
      subtitle: "رحلة من البداية المتواضعة إلى الريادة في الدجاج العضوي",
      story:
        "بدأت قصة مزرعة هادي مشعب في عام 2008 بحلم بسيط: تقديم دجاج عضوي صحي وطبيعي للعائلات التونسية. ما بدأ كمزرعة صغيرة في ضواحي تونس، تطور ليصبح واحداً من أهم مصادر الدجاج العضوي في البلاد.",
      milestones: [
        {
          year: "2008",
          title: "البداية",
          description: "تأسيس المزرعة الأولى بـ 50 دجاجة في ضواحي تونس",
        },
        {
          year: "2012",
          title: "التوسع",
          description: "افتتاح المزرعة الثانية في صفاقس وزيادة الإنتاج",
        },
        {
          year: "2016",
          title: "الاعتماد",
          description: "الحصول على شهادة الزراعة العضوية الدولية",
        },
        {
          year: "2020",
          title: "التطوير",
          description: "إطلاق منصة التجارة الإلكترونية والتوصيل المنزلي",
        },
      ],
    },
    en: {
      title: "Our Story",
      subtitle: "A journey from humble beginnings to leadership in organic chicken",
      story:
        "The story of Hedi Mchaab Farm began in 2008 with a simple dream: to provide healthy and natural organic chicken to Tunisian families. What started as a small farm in the suburbs of Tunis has evolved to become one of the most important sources of organic chicken in the country.",
      milestones: [
        {
          year: "2008",
          title: "The Beginning",
          description: "Founded the first farm with 50 chickens in the suburbs of Tunis",
        },
        {
          year: "2012",
          title: "Expansion",
          description: "Opened the second farm in Sfax and increased production",
        },
        {
          year: "2016",
          title: "Certification",
          description: "Obtained international organic farming certification",
        },
        {
          year: "2020",
          title: "Innovation",
          description: "Launched e-commerce platform and home delivery service",
        },
      ],
    },
    fr: {
      title: "Notre Histoire",
      subtitle: "Un voyage des débuts modestes au leadership dans le poulet biologique",
      story:
        "L'histoire de la Ferme Hedi Mchaab a commencé en 2008 avec un rêve simple : fournir du poulet biologique sain et naturel aux familles tunisiennes. Ce qui a commencé comme une petite ferme dans la banlieue de Tunis a évolué pour devenir l'une des sources les plus importantes de poulet biologique du pays.",
      milestones: [
        {
          year: "2008",
          title: "Le Début",
          description: "Fondation de la première ferme avec 50 poulets en banlieue de Tunis",
        },
        {
          year: "2012",
          title: "Expansion",
          description: "Ouverture de la deuxième ferme à Sfax et augmentation de la production",
        },
        {
          year: "2016",
          title: "Certification",
          description: "Obtention de la certification internationale d'agriculture biologique",
        },
        {
          year: "2020",
          title: "Innovation",
          description: "Lancement de la plateforme e-commerce et du service de livraison à domicile",
        },
      ],
    },
  }

  const content = storyContent[language]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{content.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Story Text */}
          <div className={`space-y-6 ${isRTL ? "lg:order-2" : ""}`}>
            <p className="text-lg leading-relaxed text-muted-foreground">{content.story}</p>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold">2008</div>
                <div className="text-sm text-muted-foreground">
                  {language === "ar" ? "تأسست" : language === "fr" ? "Fondée" : "Founded"}
                </div>
              </div>
              <div className="text-center">
                <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold">
                  {language === "ar" ? "تونس" : language === "fr" ? "Tunisie" : "Tunisia"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {language === "ar" ? "الموقع" : language === "fr" ? "Localisation" : "Location"}
                </div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold">500+</div>
                <div className="text-sm text-muted-foreground">
                  {language === "ar" ? "عميل" : language === "fr" ? "Clients" : "Customers"}
                </div>
              </div>
            </div>
          </div>

          {/* Story Image */}
          <div className={`relative ${isRTL ? "lg:order-1" : ""}`}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Hedi Mchaab Farm" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center mb-12">
            {language === "ar" ? "محطات مهمة" : language === "fr" ? "Étapes Importantes" : "Key Milestones"}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.milestones.map((milestone, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="text-3xl font-bold text-green-600">{milestone.year}</div>
                    <h4 className="font-semibold text-lg">{milestone.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
