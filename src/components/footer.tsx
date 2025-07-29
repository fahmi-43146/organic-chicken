"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Leaf } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

export function Footer() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key as any, language)

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="relative h-10 w-10">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Hedi Mchaab Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-green-400">Hedi Mchaab</span>
                <span className="text-sm text-gray-400">
                  {language === "ar" ? "دجاج عضوي" : language === "fr" ? "Poulet Bio" : "Organic Chicken"}
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {language === "ar"
                ? "نقدم أجود أنواع الدجاج العضوي المربى بطريقة طبيعية وصحية في تونس. جودة عالية وطعم لذيذ من المزرعة إلى مائدتك."
                : language === "fr"
                  ? "Nous fournissons le meilleur poulet bio élevé naturellement et sainement en Tunisie. Haute qualité et goût délicieux de la ferme à votre table."
                  : "We provide the finest organic chicken raised naturally and healthily in Tunisia. High quality and delicious taste from farm to your table."}
            </p>
            <div className="flex items-center gap-2 text-green-400">
              <Leaf className="h-4 w-4" />
              <span className="text-sm">
                {language === "ar" ? "معتمد عضوياً" : language === "fr" ? "Certifié Bio" : "Certified Organic"}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {language === "ar" ? "روابط سريعة" : language === "fr" ? "Liens rapides" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  {language === "ar" ? "لوحة الإدارة" : language === "fr" ? "Administration" : "Admin Panel"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {language === "ar" ? "معلومات الاتصال" : language === "fr" ? "Informations de contact" : "Contact Info"}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-sm">
                  {language === "ar"
                    ? "شارع الحبيب بورقيبة، تونس العاصمة، تونس"
                    : language === "fr"
                      ? "Avenue Habib Bourguiba, Tunis, Tunisie"
                      : "Habib Bourguiba Avenue, Tunis, Tunisia"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-sm">+216 12 345 678</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-sm">info@hedimchaab.tn</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {language === "ar" ? "النشرة الإخبارية" : language === "fr" ? "Newsletter" : "Newsletter"}
            </h3>
            <p className="text-gray-400 text-sm">
              {language === "ar"
                ? "اشترك للحصول على آخر العروض والمنتجات الجديدة"
                : language === "fr"
                  ? "Abonnez-vous pour recevoir les dernières offres et nouveaux produits"
                  : "Subscribe to get latest offers and new products"}
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder={
                  language === "ar"
                    ? "أدخل بريدك الإلكتروني"
                    : language === "fr"
                      ? "Entrez votre email"
                      : "Enter your email"
                }
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="w-full bg-green-600 hover:bg-green-700">
                {language === "ar" ? "اشتراك" : language === "fr" ? "S'abonner" : "Subscribe"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Hedi Mchaab.{" "}
              {language === "ar"
                ? "جميع الحقوق محفوظة"
                : language === "fr"
                  ? "Tous droits réservés"
                  : "All rights reserved"}
              .
            </p>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
