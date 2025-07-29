"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Leaf, Award, Truck } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

export function ContactInfo() {
  const { language } = useLanguage()

  const businessInfo = [
    {
      icon: Phone,
      label: getTranslation("phone", language),
      value: "+216 12 345 678",
      description: language === "ar" ? "متاح 24/7" : language === "fr" ? "Disponible 24/7" : "Available 24/7",
    },
    {
      icon: Mail,
      label: getTranslation("email", language),
      value: "info@hedimchaab.com",
      description: language === "ar" ? "رد سريع" : language === "fr" ? "Réponse rapide" : "Quick response",
    },
    {
      icon: MapPin,
      label: getTranslation("address", language),
      value:
        language === "ar"
          ? "شارع الحبيب بورقيبة، تونس"
          : language === "fr"
            ? "Avenue Habib Bourguiba, Tunis"
            : "Avenue Habib Bourguiba, Tunis",
      description: language === "ar" ? "موقع مركزي" : language === "fr" ? "Emplacement central" : "Central location",
    },
    {
      icon: Clock,
      label: getTranslation("workingHours", language),
      value: "8:00 AM - 6:00 PM",
      description: language === "ar" ? "الاثنين - السبت" : language === "fr" ? "Lundi - Samedi" : "Monday - Saturday",
    },
  ]

  const features = [
    {
      icon: Leaf,
      title: getTranslation("organic", language),
      description:
        language === "ar"
          ? "100% عضوي ومعتمد"
          : language === "fr"
            ? "100% bio et certifié"
            : "100% organic & certified",
    },
    {
      icon: Award,
      title: getTranslation("qualityGuaranteed", language),
      description:
        language === "ar"
          ? "أعلى معايير الجودة"
          : language === "fr"
            ? "Les plus hauts standards de qualité"
            : "Highest quality standards",
    },
    {
      icon: Truck,
      title: language === "ar" ? "توصيل سريع" : language === "fr" ? "Livraison rapide" : "Fast Delivery",
      description:
        language === "ar" ? "توصيل في نفس اليوم" : language === "fr" ? "Livraison le jour même" : "Same day delivery",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            {getTranslation("getInTouch", language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {businessInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{info.label}</div>
                  <div className="text-sm text-foreground">{info.value}</div>
                  <div className="text-xs text-muted-foreground">{info.description}</div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {language === "ar" ? "لماذا تختارنا؟" : language === "fr" ? "Pourquoi nous choisir?" : "Why Choose Us?"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                  <Icon className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{feature.title}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
