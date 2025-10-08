import { Target, Users, Code, MapPin, Calendar } from 'lucide-react'

export function About() {
  const stats = [
    { label: 'Founded', value: '2024', icon: Calendar },
    { label: 'Location', value: 'Nigeria', icon: MapPin },
    { label: 'Focus', value: 'Youth Tech', icon: Users },
    { label: 'Products', value: '1 Live', icon: Code }
  ]

  const values = [
    {
      icon: Target,
      title: 'Youth Empowerment',
      description: 'We believe in empowering young Africans with the tools and skills needed to succeed in the digital economy.'
    },
    {
      icon: Code,
      title: 'Innovation First',
      description: 'We\'re committed to building innovative solutions that address real problems faced by African businesses and students.'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Through TYTC, we\'re building a strong community of young tech enthusiasts who support and learn from each other.'
    }
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-black mb-4">
            About Tyora
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building Africa's Tech Future, One Innovation at a Time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Story */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl text-black mb-4">Our Story</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Tyora was founded in 2024 by Fagite Emmanuel Olamide with a vision to 
                  empower the next generation of African tech talent. As a youth-focused 
                  software and AI company, we're building innovative solutions that address 
                  the unique challenges faced by African businesses and students.
                </p>
                <p>
                  Our journey began with the development of Drello, our flagship task 
                  management platform, which launched in December 2024. We're currently 
                  working on Axiom, our proprietary AI model, and Skill Board, a 
                  comprehensive learning platform.
                </p>
                <p>
                  Through the Tyora Youth Tech Club (TYTC), we're also building a community 
                  of young innovators who will shape Africa's technological future.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-white border border-gray-200 p-6 text-center">
                    <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl text-black mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">{stat.label}</div>
                  </div>
                )
              })}
            </div>

            <div className="bg-black text-white p-8">
              <h4 className="text-xl mb-4">Our Mission</h4>
              <p className="text-gray-300 leading-relaxed">
                To build innovative software solutions and AI technologies that empower 
                African youth and businesses, while fostering a community of the next 
                generation of tech leaders across the continent.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-2xl text-black text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white border border-gray-200 p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl text-black mb-4">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}