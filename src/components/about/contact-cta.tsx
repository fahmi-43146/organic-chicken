"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ContactCTA() {
  const { language, isRTL } = useLanguage()

  const ctaContent = {
    ar: {
      title: "هل لديك أسئلة؟",
      subtitle: "نحن هنا لمساعدتك! تواصل معنا للحصول على أفضل منتجات الدجاج العضوي",
      cta: "تواصل معنا",
      visitFarm: "زر المزرعة",
      contacts: [
        {
          icon: Phone,
          label: "اتصل بنا",
          value: "+216 12 345 678",
          href: "tel:+21612345678",
        },
        {
          icon: Mail,
          label: "راسلنا",
          value: "hedi@organicchicken.tn",
          href: "mailto:hedi@organicchicken.tn",
        },
        {
          icon: MapPin,
          label: "زرنا",
          value: "طريق صفاقس، تونس 1234",
          href: "#",
        },
      ],
    },
    en: {
      title: "Have Questions?",
      subtitle: "We're here to help! Contact us to get the best organic chicken products",
      cta: "Contact Us",
      visitFarm: "Visit Farm",
      contacts: [
        {
          icon: Phone,
          label: "Call Us",
          value: "+216 12 345 678",
          href: "tel:+21612345678",
        },
        {
          icon: Mail,
          label: "Email Us",
          value: "hedi@organicchicken.tn",
          href: "mailto:hedi@organicchicken.tn",
        },
        {
          icon: MapPin,
          label: "Visit Us",
          value: "Sfax Road, Tunis 1234",
          href: "#",
        },
      ],
    },
    fr: {
      title: "Des Questions?",
      subtitle:
        "Nous sommes là pour vous aider! Contactez-nous pour obtenir les meilleurs produits de poulet biologique",
      cta: "Nous Contacter",
      visitFarm: "Visiter la Ferme",
      contacts: [
        {
          icon: Phone,
          label: "Appelez-nous",
          value: "+216 12 345 678",
          href: "tel:+21612345678",
        },
        {
          icon: Mail,
          label: "Écrivez-nous",
          value: "hedi@organicchicken.tn",
          href: "mailto:hedi@organicchicken.tn",
        },
        {
          icon: MapPin,
          label: "Visitez-nous",
          value: "Route de Sfax, Tunis 1234",
          href: "#",
        },
      ],
    },
  }

  const content = ctaContent[language]

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">{content.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {content.contacts.map((contact, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white">
                    <contact.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{contact.label}</h3>
                <a href={contact.href} className="text-green-100 hover:text-white transition-colors">
                  {contact.value}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-green-50">
              {content.cta}
              {isRTL ? <ArrowLeft className="ml-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-700 bg-transparent"
            >
              {content.visitFarm}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
