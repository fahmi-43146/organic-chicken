"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

export function ContactHero() {
  const { language } = useLanguage()

  const contactCards = [
    {
      icon: Phone,
      title: getTranslation("phone", language),
      value: "+216 12 345 678",
      description: language === "ar" ? "اتصل بنا الآن" : language === "fr" ? "Appelez-nous maintenant" : "Call us now",
      color: "text-green-600 bg-green-100 dark:bg-green-900",
    },
    {
      icon: Mail,
      title: getTranslation("email", language),
      value: "info@hedimchaab.com",
      description: language === "ar" ? "راسلنا" : language === "fr" ? "Envoyez-nous un email" : "Send us an email",
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900",
    },
    {
      icon: MapPin,
      title: getTranslation("address", language),
      value: language === "ar" ? "تونس، تونس" : language === "fr" ? "Tunis, Tunisie" : "Tunis, Tunisia",
      description: language === "ar" ? "زورونا" : language === "fr" ? "Visitez-nous" : "Visit us",
      color: "text-orange-600 bg-orange-100 dark:bg-orange-900",
    },
    {
      icon: Clock,
      title: getTranslation("workingHours", language),
      value: "8:00 - 18:00",
      description:
        language === "ar" ? "من الاثنين إلى السبت" : language === "fr" ? "Lundi au Samedi" : "Monday to Saturday",
      color: "text-purple-600 bg-purple-100 dark:bg-purple-900",
    },
  ]

  return (
    <section className="relative bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {getTranslation("contactUs", language)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "ar"
              ? "نحن هنا لمساعدتك. تواصل معنا لأي استفسارات حول منتجاتنا أو خدماتنا"
              : language === "fr"
                ? "Nous sommes là pour vous aider. Contactez-nous pour toute question sur nos produits ou services"
                : "We're here to help. Get in touch with us for any questions about our products or services"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, index) => {
            const Icon = card.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg mb-4 ${card.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm font-medium text-foreground mb-1">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
