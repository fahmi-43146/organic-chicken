"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

export function TeamSection() {
  const { language } = useLanguage()

  const teamContent = {
    ar: {
      title: "فريقنا",
      subtitle: "الأشخاص المتفانون وراء نجاح مزرعة هادي مشعب",
      team: [
        {
          name: "هادي مشعب",
          role: "المؤسس والمدير العام",
          bio: "مؤسس المزرعة وصاحب الرؤية، يتمتع بخبرة أكثر من 15 عاماً في تربية الدجاج العضوي",
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          name: "أمينة الزهراء",
          role: "مديرة الجودة",
          bio: "خبيرة في معايير الجودة والسلامة الغذائية، تضمن أعلى مستويات الجودة في جميع منتجاتنا",
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          name: "محمد الصالح",
          role: "مدير الإنتاج",
          bio: "مسؤول عن عمليات الإنتاج والتربية، يشرف على رعاية الدجاج والعمليات اليومية",
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          name: "فاطمة بن علي",
          role: "مديرة خدمة العملاء",
          bio: "تقود فريق خدمة العملاء وتضمن رضا العملاء وتقديم أفضل تجربة تسوق",
          image: "/placeholder.svg?height=300&width=300",
        },
      ],
    },
    en: {
      title: "Our Team",
      subtitle: "The dedicated people behind the success of Hedi Mchaab Farm",
      team: [
        {
          name: "Hedi Mchaab",
          role: "Founder & CEO",
          bio: "Farm founder and visionary, with over 15 years of experience in organic chicken farming",
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          name: "Amina Zahra",
          role: "Quality Manager",
          bio: "Expert in quality standards and food safety, ensuring the highest quality levels in all our products",
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          name: "Mohamed Salah",
          role: "Production Manager",
          bio: "Responsible for production and breeding operations, overseeing chicken care and daily operations",
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          name: "Fatima Ben Ali",
          role: "Customer Service Manager",
          bio: "Leads the customer service team and ensures customer satisfaction and the best shopping experience",
          image: "/placeholder.svg?height=300&width=300",
        },
      ],
    },
    fr: {
      title: "Notre Équipe",
      subtitle: "Les personnes dévouées derrière le succès de la Ferme Hedi Mchaab",
      team: [
        {
          name: "Hedi Mchaab",
          role: "Fondateur & PDG",
          bio: "Fondateur de la ferme et visionnaire, avec plus de 15 ans d'expérience dans l'élevage de poulet biologique",
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          name: "Amina Zahra",
          role: "Responsable Qualité",
          bio: "Experte en normes de qualité et sécurité alimentaire, garantissant les plus hauts niveaux de qualité dans tous nos produits",
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          name: "Mohamed Salah",
          role: "Responsable Production",
          bio: "Responsable des opérations de production et d'élevage, supervisant les soins aux poulets et les opérations quotidiennes",
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          name: "Fatima Ben Ali",
          role: "Responsable Service Client",
          bio: "Dirige l'équipe du service client et assure la satisfaction des clients et la meilleure expérience d'achat",
          image: "/placeholder.svg?height=300&width=300",
        },
      ],
    },
  }

  const content = teamContent[language]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{content.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.team.map((member, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 hover:bg-green-700 text-white">
                      {language === "ar" ? "فريق" : language === "fr" ? "Équipe" : "Team"}
                    </Badge>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
