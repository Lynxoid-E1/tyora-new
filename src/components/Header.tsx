import { useState, useEffect } from 'react'
import { Menu, X, Code, Users, Briefcase, BookOpen, Home, Info, Phone } from 'lucide-react'

interface HeaderProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [memberCount, setMemberCount] = useState(0)

  useEffect(() => {
    fetchMemberCount()
  }, [])

  const fetchMemberCount = async () => {
    try {
      const response = await fetch(`https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-0d02a0b5/members/count`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        }
      })
      const data = await response.json()
      setMemberCount(data.count || 0)
    } catch (error) {
      console.log('Error fetching member count:', error)
    }
  }

  const navigation = [
    { name: 'Home', id: 'hero', icon: Home },
    { name: 'About', id: 'about', icon: Info },
    { name: 'Products', id: 'products', icon: Code },
    { name: 'TYTC', id: 'tytc', icon: Users },
    { name: 'News', id: 'news', icon: BookOpen },
    { name: 'Contact', id: 'contact', icon: Phone }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('hero')}
          >
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <span className="text-white text-sm">T</span>
            </div>
            <span className="text-xl tracking-tight text-black">Tyora</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </nav>

          {/* Member Count & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{memberCount} TYTC Members</span>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            <div className="flex items-center space-x-2 text-sm text-gray-600 py-2 border-b border-gray-100">
              <Users className="w-4 h-4" />
              <span>{memberCount} TYTC Members</span>
            </div>
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id)
                    setIsMenuOpen(false)
                  }}
                  className={`flex items-center space-x-2 w-full px-3 py-2 text-sm text-left transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}