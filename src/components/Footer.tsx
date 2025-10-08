import { Code, Users, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 64
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({ top: elementPosition, behavior: 'smooth' })
    }
  }

  const navigation = [
    { name: 'About', id: 'about' },
    { name: 'Products', id: 'products' },
    { name: 'TYTC', id: 'tytc' },
    { name: 'News', id: 'news' },
    { name: 'Contact', id: 'contact' }
  ]

  const products = [
    { name: 'Drello', status: 'Live' },
    { name: 'Axiom AI', status: 'In Development' },
    { name: 'Skill Board', status: 'Coming Soon' }
  ]

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white flex items-center justify-center">
                  <span className="text-black text-sm">T</span>
                </div>
                <span className="text-xl tracking-tight">Tyora</span>
              </div>
              
              <p className="text-gray-400 leading-relaxed">
                Building Africa's Tech Future, One Innovation at a Time. 
                Empowering young African tech talent through innovative solutions.
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Founded 2024</span>
                </div>
                <span>•</span>
                <span>Nigeria</span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-lg mb-6">Navigation</h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg mb-6">Products</h3>
              <ul className="space-y-3">
                {products.map((product) => (
                  <li key={product.name} className="flex items-center justify-between">
                    <span className="text-gray-400">{product.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      product.status === 'Live' 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                      {product.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg mb-6">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:hello@tyora.dev" className="hover:text-white transition-colors">
                    hello@tyora.dev
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>+234 (0) 800-TYORA</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Nigeria</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Tyora. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => scrollToSection('tytc')}
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Join TYTC</span>
              </button>
              
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Back to top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}