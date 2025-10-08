import { Calendar, User, ArrowRight } from 'lucide-react'
import { Badge } from '../ui/badge'

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  category: string
}

interface NewsCardProps {
  article: NewsArticle
  onClick: () => void
}

export function NewsCard({ article, onClick }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div 
      className="border border-gray-200 bg-white p-6 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-lg group"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <Badge variant="outline" className="text-xs uppercase tracking-wide">
          {article.category}
        </Badge>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          {formatDate(article.publishedAt)}
        </div>
      </div>
      
      <h3 className="text-xl mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
        {article.title}
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {article.excerpt}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <User className="w-4 h-4 mr-1" />
          {article.author}
        </div>
        
        <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
          <span className="text-sm mr-1">Read more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  )
}