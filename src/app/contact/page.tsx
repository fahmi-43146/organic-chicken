"use client"

import { ContactHero } from "@/components/contact/contact-hero"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactMap } from "@/components/contact/contact-map"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <ContactHero />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <ContactInfo />
            <ContactMap />
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
