import { CheckCircle, Clock, ArrowRight, Layout, Brain, Calendar, Users } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface ProductsProps {
  onNavigate: (section: string) => void
}

export function Products({ onNavigate }: ProductsProps) {
  const products = [
    {
      name: 'Drello',
      status: 'live',
      icon: Layout,
      description: 'Our flagship task management and productivity platform designed to help individuals and teams organize their work efficiently.',
      features: [
        'Intuitive project organization',
        'Team collaboration tools',
        'Task tracking and deadlines',
        'User-friendly interface'
      ],
      launched: 'December 2024'
    },
    {
      name: 'Axiom AI',
      status: 'development',
      icon: Brain,
      description: 'Our proprietary AI model being developed to power intelligent features across our product ecosystem with a focus on African business needs.',
      features: [
        'Natural language processing',
        'Task automation capabilities',
        'African context optimization',
        'Integration ready architecture'
      ],
      launched: 'In Development'
    },
    {
      name: 'Skill Board',
      status: 'development',
      icon: Users,
      description: 'A comprehensive skill development and learning platform currently under development to help young Africans build tech skills.',
      features: [
        'Curated learning paths',
        'Skill assessments',
        'Progress tracking',
        'Community features'
      ],
      launched: 'Coming Soon'
    }
  ]

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-black mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building innovative solutions to empower African businesses and youth. 
            Here's what we're working on.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon
            return (
              <div 
                key={product.name}
                className="bg-white border border-gray-200 p-8 hover:border-blue-500 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 flex items-center justify-center ${
                      product.status === 'live' ? 'bg-green-100' :
                      product.name === 'Axiom AI' ? 'bg-purple-100' : 'bg-blue-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        product.status === 'live' ? 'text-green-600' :
                        product.name === 'Axiom AI' ? 'text-purple-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <h3 className="text-xl text-black">{product.name}</h3>
                  </div>
                  
                  <Badge 
                    variant={product.status === 'live' ? 'default' : 'secondary'}
                    className={`${
                      product.status === 'live' 
                        ? 'bg-green-100 text-green-700 border-green-200' 
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    {product.status === 'live' ? (
                      <><CheckCircle className="w-3 h-3 mr-1" /> Live</>
                    ) : (
                      <><Clock className="w-3 h-3 mr-1" /> In Development</>
                    )}
                  </Badge>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-3 mb-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {product.launched}
                  </div>
                  
                  {product.status === 'live' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                    >
                      Learn More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Want to stay updated on our product development?
          </p>
          <Button 
            onClick={() => onNavigate('tytc')}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Join Our Community
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}