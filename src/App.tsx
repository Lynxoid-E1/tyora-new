import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Products } from './components/Products'
import { TYTC } from './components/TYTC'
import { News } from './components/News'
import { Contact } from './components/Contact'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { Toaster } from './components/ui/sonner'

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    // Set document meta tags
    document.title = "Tyora — Building Africa's Tech Future"
    
    const metaDescription = document.querySelector('meta[name="description"]')
    const description = "Tyora is a youth-focused software and AI company founded in 2024. We're building innovative solutions to empower the next generation of African tech talent."
    
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description
      document.head.appendChild(meta)
    }

    // Add other meta tags
    const metaTags = [
      { name: 'keywords', content: 'Tyora, youth tech, Nigeria, AI, Drello, Axiom, TYTC, African tech startup, software development' },
      { name: 'author', content: 'Fagite Emmanuel Olamide, Tyora' },
      { name: 'robots', content: 'index, follow' },
      { name: 'theme-color', content: '#2563eb' }
    ]

    metaTags.forEach(({ name, content }) => {
      const existingMeta = document.querySelector(`meta[name="${name}"]`)
      if (!existingMeta) {
        const meta = document.createElement('meta')
        meta.name = name
        meta.content = content
        document.head.appendChild(meta)
      }
    })

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Tyora",
      "url": window.location.origin,
      "description": description,
      "founder": {
        "@type": "Person",
        "name": "Fagite Emmanuel Olamide"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Nigeria"
      }
    }

    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }
  }, [])

  // Intersection Observer to track active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 64 // Height of fixed header
      const elementPosition = element.offsetTop - headerHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />
      
      <main>
        <Hero onNavigate={scrollToSection} />
        <About />
        <Products onNavigate={scrollToSection} />
        <TYTC />
        <News />
        <Contact />
        <FAQ />
      </main>
      
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}