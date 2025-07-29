"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Shield, Leaf, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Certifications() {
  const { language } = useLanguage()

  const certificationsContent = {
    ar: {
      title: "شهاداتنا واعتماداتنا",
      subtitle: "نفتخر بالحصول على أهم الشهادات والاعتمادات في مجال الزراعة العضوية",
      certifications: [
        {
          icon: Leaf,
          title: "شهادة الزراعة العضوية",
          issuer: "وزارة الزراعة التونسية",
          year: "2016",
          description: "شهادة رسمية تؤكد التزامنا بمعايير الزراعة العضوية",
        },
        {
          icon: Shield,
          title: "شهادة السلامة الغذائية",
          issuer: "HACCP International",
          year: "2018",
          description: "ضمان أعلى مستويات السلامة في جميع عملياتنا",
        },
        {
          icon: Award,
          title: "شهادة الجودة ISO",
          issuer: "ISO 22000",
          year: "2020",
          description: "معايير دولية لإدارة سلامة الغذاء",
        },
        {
          icon: CheckCircle,
          title: "شهادة الرفق بالحيوان",
          issuer: "Animal Welfare Approved",
          year: "2019",
          description: "التزام بأعلى معايير الرفق بالحيوان",
        },
      ],
    },
    en: {
      title: "Our Certifications & Accreditations",
      subtitle: "We are proud to have obtained the most important certifications and accreditations in organic farming",
      certifications: [
        {
          icon: Leaf,
          title: "Organic Farming Certificate",
          issuer: "Tunisian Ministry of Agriculture",
          year: "2016",
          description: "Official certificate confirming our commitment to organic farming standards",
        },
        {
          icon: Shield,
          title: "Food Safety Certificate",
          issuer: "HACCP International",
          year: "2018",
          description: "Ensuring the highest levels of safety in all our operations",
        },
        {
          icon: Award,
          title: "ISO Quality Certificate",
          issuer: "ISO 22000",
          year: "2020",
          description: "International standards for food safety management",
        },
        {
          icon: CheckCircle,
          title: "Animal Welfare Certificate",
          issuer: "Animal Welfare Approved",
          year: "2019",
          description: "Commitment to the highest animal welfare standards",
        },
      ],
    },
    fr: {
      title: "Nos Certifications & Accréditations",
      subtitle:
        "Nous sommes fiers d'avoir obtenu les certifications et accréditations les plus importantes en agriculture biologique",
      certifications: [
        {
          icon: Leaf,
          title: "Certificat d'Agriculture Biologique",
          issuer: "Ministère de l'Agriculture Tunisien",
          year: "2016",
          description: "Certificat officiel confirmant notre engagement envers les normes d'agriculture biologique",
        },
        {
          icon: Shield,
          title: "Certificat de Sécurité Alimentaire",
          issuer: "HACCP International",
          year: "2018",
          description: "Garantir les plus hauts niveaux de sécurité dans toutes nos opérations",
        },
        {
          icon: Award,
          title: "Certificat de Qualité ISO",
          issuer: "ISO 22000",
          year: "2020",
          description: "Normes internationales pour la gestion de la sécurité alimentaire",
        },
        {
          icon: CheckCircle,
          title: "Certificat de Bien-être Animal",
          issuer: "Animal Welfare Approved",
          year: "2019",
          description: "Engagement envers les plus hauts standards de bien-être animal",
        },
      ],
    },
  }

  const content = certificationsContent[language]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{content.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {content.certifications.map((cert, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 group-hover:scale-110 transition-transform">
                    <cert.icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Badge variant="outline" className="text-xs">
                    {cert.year}
                  </Badge>
                  <h3 className="font-semibold text-lg">{cert.title}</h3>
                  <p className="text-sm text-green-600 font-medium">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certification Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 hover:opacity-100 transition-opacity">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={`/placeholder.svg?height=200&width=200&query=certification badge ${i}`}
                alt={`Certification ${i}`}
                fill
                className="object-contain p-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
