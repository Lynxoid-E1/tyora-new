import { HelpCircle } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

export function FAQ() {
  const faqs = [
    {
      question: "What is Tyora?",
      answer: "Tyora is a youth-focused software and AI company founded in 2024. We're building innovative solutions to empower the next generation of African tech talent through products like Drello and our upcoming Axiom AI model."
    },
    {
      question: "What products does Tyora offer?",
      answer: "Currently, we have Drello live - our flagship task management platform. We're also developing Axiom AI (our proprietary AI model) and Skill Board (a learning platform). As a new company, we're focused on building quality products step by step."
    },
    {
      question: "What is TYTC?",
      answer: "The Tyora Youth Tech Club (TYTC) is our community initiative for young tech enthusiasts. We're just starting and looking for our first members to join us in building a network of future African tech leaders."
    },
    {
      question: "How can I join TYTC?",
      answer: "You can join TYTC by filling out our membership form in the TYTC section above. We're looking for motivated young people interested in technology, regardless of their current skill level."
    },
    {
      question: "Is TYTC free to join?",
      answer: "Yes, joining TYTC is completely free. Our goal is to make tech education and community accessible to all young Africans who are passionate about technology."
    },
    {
      question: "Where is Tyora based?",
      answer: "Tyora is based in Nigeria. As a new company, we're currently focused on building our foundation locally before expanding across Africa."
    },
    {
      question: "How can I try Drello?",
      answer: "Drello is currently live and available for beta testing. You can contact us for access or stay tuned for our public launch announcement."
    },
    {
      question: "When will Axiom AI be available?",
      answer: "Axiom AI is still under development. We're working hard to create a robust AI model that serves African businesses and students. We'll announce alpha testing opportunities as development progresses."
    },
    {
      question: "Can I contribute to Tyora's projects?",
      answer: "We welcome contributions from the community! Join TYTC to get involved with our projects and initiatives. As we grow, we'll have more opportunities for collaboration."
    },
    {
      question: "How can I stay updated on Tyora's progress?",
      answer: "The best way to stay updated is to join TYTC and follow our news section. We regularly share updates about our product development and company milestones."
    }
  ]

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 text-sm mb-6">
            <HelpCircle className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl text-black mb-4">
            FAQ
          </h2>
          
          <p className="text-xl text-gray-600">
            Everything you need to know about Tyora and TYTC
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 bg-white px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-lg text-black">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Have more questions?
          </p>
          <a 
            href="#contact"
            className="text-blue-600 hover:text-blue-700 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get in touch with us →
          </a>
        </div>
      </div>
    </section>
  )
}