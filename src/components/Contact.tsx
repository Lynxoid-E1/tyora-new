import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { toast } from 'sonner@2.0.3'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@tyora.dev',
      action: 'mailto:hello@tyora.dev'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+234 (0) 800-TYORA',
      action: 'tel:+2348008969'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Nigeria',
      action: null
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 text-sm mb-6">
            <MessageCircle className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl text-black mb-4">
            Contact Us
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our products or want to join our community? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 p-8">
            <h3 className="text-2xl text-black mb-6">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-gray-300 focus:border-black"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-gray-300 focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="border-gray-300 focus:border-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="border-gray-300 focus:border-black"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl text-black mb-6">Get in touch</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you're interested in our products, want to join TYTC, 
                or have partnership opportunities, we're here to help. Reach out 
                to us through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                        {info.label}
                      </div>
                      {info.action ? (
                        <a 
                          href={info.action}
                          className="text-lg text-black hover:text-blue-600 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-lg text-black">{info.value}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-blue-600 text-white p-6">
              <h4 className="text-lg mb-3">Response Time</h4>
              <p className="text-blue-100">
                We typically respond to all inquiries within 24-48 hours during 
                business days. For urgent matters, please call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}