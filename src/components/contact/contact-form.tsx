"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

export function ContactForm() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const subjects = [
    {
      value: "general",
      label: language === "ar" ? "استفسار عام" : language === "fr" ? "Demande générale" : "General Inquiry",
    },
    {
      value: "products",
      label: language === "ar" ? "حول المنتجات" : language === "fr" ? "À propos des produits" : "About Products",
    },
    { value: "orders", label: language === "ar" ? "الطلبات" : language === "fr" ? "Commandes" : "Orders" },
    { value: "delivery", label: language === "ar" ? "التوصيل" : language === "fr" ? "Livraison" : "Delivery" },
    { value: "other", label: language === "ar" ? "أخرى" : language === "fr" ? "Autre" : "Other" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Simulate form submission
    setTimeout(() => {
      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000)
    }, 1000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          {getTranslation("sendMessage", language)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {status === "success" && (
          <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              {language === "ar"
                ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً."
                : language === "fr"
                  ? "Votre message a été envoyé avec succès! Nous vous contacterons bientôt."
                  : "Your message has been sent successfully! We'll get back to you soon."}
            </AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-950">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {language === "ar"
                ? "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى."
                : language === "fr"
                  ? "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer."
                  : "An error occurred while sending the message. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{getTranslation("yourName", language)}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder={
                  language === "ar" ? "أدخل اسمك" : language === "fr" ? "Entrez votre nom" : "Enter your name"
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{getTranslation("yourEmail", language)}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder={
                  language === "ar"
                    ? "أدخل بريدك الإلكتروني"
                    : language === "fr"
                      ? "Entrez votre email"
                      : "Enter your email"
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">{getTranslation("subject", language)}</Label>
            <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    language === "ar" ? "اختر الموضوع" : language === "fr" ? "Choisissez le sujet" : "Select subject"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{getTranslation("yourMessage", language)}</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder={
                language === "ar"
                  ? "اكتب رسالتك هنا..."
                  : language === "fr"
                    ? "Écrivez votre message ici..."
                    : "Write your message here..."
              }
              rows={6}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                {language === "ar" ? "جاري الإرسال..." : language === "fr" ? "Envoi en cours..." : "Sending..."}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {getTranslation("sendMessage", language)}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
