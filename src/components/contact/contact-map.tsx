"use client"

import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, ExternalLink } from "lucide-react"

export function ContactMap() {
  const { language } = useLanguage()

  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.2!2d10.1815!3d36.8065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0x1c317b0b2b8b8b8b!2sTunis%2C%20Tunisia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
  const directionsUrl = "https://maps.google.com/?q=Tunis,Tunisia"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {language === "ar" ? "موقع المزرعة" : language === "fr" ? "Emplacement de la ferme" : "Farm Location"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={
              language === "ar"
                ? "خريطة موقع المزرعة"
                : language === "fr"
                  ? "Carte de l'emplacement de la ferme"
                  : "Farm location map"
            }
          />
        </div>

        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            <div className="font-medium mb-1">{getTranslation("address", language)}:</div>
            <div>
              {language === "ar"
                ? "شارع الحبيب بورقيبة، تونس 1000، تونس"
                : language === "fr"
                  ? "Avenue Habib Bourguiba, Tunis 1000, Tunisie"
                  : "Avenue Habib Bourguiba, Tunis 1000, Tunisia"}
            </div>
          </div>

          <Button asChild className="w-full">
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
              <Navigation className="h-4 w-4 mr-2" />
              {language === "ar"
                ? "احصل على الاتجاهات"
                : language === "fr"
                  ? "Obtenir des directions"
                  : "Get Directions"}
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
