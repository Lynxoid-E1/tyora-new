import { useState, useEffect } from 'react'
import { Users, Target, Code, Lightbulb, ArrowRight, CheckCircle, Mail, Phone, University } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { toast } from 'sonner@2.0.3'
import { makeRequest, fallbackData } from '../utils/api'
import { projectId, publicAnonKey } from '../utils/supabase/info'

export function TYTC() {
  const [memberCount, setMemberCount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    course: '',
    year: '',
    phone: '',
    motivation: ''
  })

  useEffect(() => {
    if (!isInitialized) {
      initializeData()
      fetchMemberCount()
      setIsInitialized(true)
    }
  }, [isInitialized])

  const fetchMemberCount = async () => {
    try {
      const data = await makeRequest('/members/count', { timeout: 6000 })
      setMemberCount(data.count || 0)
    } catch (error) {
      console.log('Error fetching member count:', error.message)
      // Use fallback count when server is unavailable
      setMemberCount(fallbackData.memberCount)
    }
  }

  const initializeData = async () => {
    try {
      await makeRequest('/init', { method: 'POST', timeout: 6000 })
    } catch (error) {
      console.log('Error initializing data:', error.message)
      // Silent fail for initialization - not critical for user experience
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await makeRequest('/members/join', {
        method: 'POST',
        body: formData,
        timeout: 12000
      })

      if (result.success) {
        toast.success(result.message || 'Welcome to TYTC! We\'ll be in touch soon.')
        setFormData({
          name: '',
          email: '',
          university: '',
          course: '',
          year: '',
          phone: '',
          motivation: ''
        })
        fetchMemberCount() // Refresh count
      } else {
        toast.error(result.error || 'Failed to join TYTC')
      }
    } catch (error) {
      console.log('Error joining TYTC:', error.message)
      if (error.message.includes('timed out')) {
        toast.error('Request timed out. Please try again.')
      } else {
        toast.error('Network error. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: Code,
      title: 'Skill Development',
      description: 'Learn cutting-edge technologies and programming languages'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with like-minded young tech enthusiasts across Nigeria'
    },
    {
      icon: Target,
      title: 'Mentorship',
      description: 'Get guidance from experienced developers and entrepreneurs'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Work on real projects and contribute to open source'
    }
  ]

  return (
    <section id="tytc" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 text-sm mb-6">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-purple-700">Tyora Youth Tech Club</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl text-black mb-4">
            Join the Next Generation of
            <br />
            <span className="text-purple-600">African Tech Leaders</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            TYTC is our initiative to build a community of young innovators who will shape 
            Africa's technological future. We're just getting started and looking for our first members.
          </p>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{memberCount} Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Nigeria Based</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Benefits */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl text-black mb-6">What You'll Get</h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="text-lg text-black mb-1">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-gray-50 p-6 border border-gray-200">
              <h4 className="text-lg text-black mb-3">Currently Building</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Community platform and structure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Learning resources and curriculum</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Mentorship program framework</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Join Form */}
          <div className="bg-white border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl text-black mb-2">Be Among Our First Members</h3>
              <p className="text-gray-600">Join us as we build something amazing together</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-1">
                    <span>Full Name</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-gray-300 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-gray-300 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="university" className="flex items-center space-x-1">
                  <University className="w-4 h-4" />
                  <span>University/Institution</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="university"
                  required
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course of Study</Label>
                  <Input
                    id="course"
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="border-gray-300 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year of Study</Label>
                  <Select value={formData.year} onValueChange={(value) => setFormData({...formData, year: value})}>
                    <SelectTrigger className="border-gray-300 focus:border-purple-500">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                      <SelectItem value="5">5th Year</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="border-gray-300 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to join TYTC?</Label>
                <Textarea
                  id="motivation"
                  rows={4}
                  value={formData.motivation}
                  onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                  className="border-gray-300 focus:border-purple-500"
                  placeholder="Tell us about your interest in technology and what you hope to achieve..."
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
              >
                {isSubmitting ? 'Joining...' : 'Join TYTC'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}