import { ArrowRight, Code, Zap, Target } from 'lucide-react'
import { Button } from './ui/button'

interface HeroProps {
  onNavigate: (section: string) => void
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="pt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700">Nigeria's Emerging Tech Company</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl tracking-tight text-black">
                  Building Africa's
                  <br />
                  <span className="text-blue-600">Tech Future</span>
                </h1>
                
                <p className="text-xl text-gray-600 max-w-lg">
                  One Innovation at a Time
                </p>
                
                <p className="text-gray-700 leading-relaxed max-w-lg">
                  Tyora is a youth-focused software and AI company founded in 2023. 
                  We're building innovative solutions to empower the next generation 
                  of African tech talent.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => onNavigate('products')}
                  className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-base"
                >
                  Explore Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('tytc')}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-base"
                >
                  Join TYTC
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl text-black">2024</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-black">1</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Product Live</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-black">Nigeria</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Based</div>
                </div>
              </div>
            </div>

            {/* Visual Elements */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-gray-50 p-8 border border-gray-200">
                    <Code className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-lg text-black mb-2">Software Development</h3>
                    <p className="text-sm text-gray-600">
                      Building robust applications with modern technologies
                    </p>
                  </div>
                  
                  <div className="bg-black text-white p-8">
                    <Zap className="w-12 h-12 text-white mb-4" />
                    <h3 className="text-lg mb-2">AI Innovation</h3>
                    <p className="text-sm text-gray-300">
                      Developing Axiom AI for African businesses
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6 pt-12">
                  <div className="bg-blue-600 text-white p-8">
                    <Target className="w-12 h-12 text-white mb-4" />
                    <h3 className="text-lg mb-2">Youth Focus</h3>
                    <p className="text-sm text-blue-100">
                      Empowering the next generation of tech leaders
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-8 border border-gray-200">
                    <div className="w-12 h-12 bg-purple-600 flex items-center justify-center mb-4">
                      <span className="text-white text-xl">T</span>
                    </div>
                    <h3 className="text-lg text-black mb-2">Tyora Youth Tech Club</h3>
                    <p className="text-sm text-gray-600">
                      Building a community of young innovators
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}