import { AboutHero } from "@/components/about/about-hero"
import { OurStory } from "@/components/about/our-story"
import { OurValues } from "@/components/about/our-values"
import { FarmProcess } from "@/components/about/farm-process"
import { TeamSection } from "@/components/about/team-sections"
import { Certifications } from "@/components/about/certifications"
import { ContactCTA } from "@/components/about/contact-cta"

export const metadata = {
  title: "من نحن - مزرعة هادي مشعب | About Us - Hedi Mchaab Farm",
  description:
    "تعرف على قصة مزرعة هادي مشعب وكيف نقدم أفضل أنواع الدجاج العضوي في تونس. Learn about Hedi Mchaab Farm and how we provide the finest organic chicken in Tunisia.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <OurStory />
      <OurValues />
      <FarmProcess />
      <TeamSection />
      <Certifications />
      <ContactCTA />
    </div>
  )
}
