import { createFileRoute, redirect } from '@tanstack/react-router'
import { SessionToken } from '@imphnen-frontend-service/service'
import { HeroSection } from './_site/_components/home/hero-section'
import { WhatWeOfferSection } from './_site/_components/home/what-we-offer-section'
import { TestimonialSection } from './_site/_components/home/testimonial-section'
import { FAQSection } from './_site/_components/home/faq-section'
import { CTASection } from './_site/_components/home/cta-section'
import { Header } from './_site/_components/header'
import { Footer } from './_site/_components/footer'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const session = SessionToken.get()
    if (session?.token?.access_token) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-primary-50">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhatWeOfferSection />
        <TestimonialSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
