import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Calendar, User, X } from 'lucide-react'
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

interface NewsModalProps {
  article: NewsArticle | null
  isOpen: boolean
  onClose: () => void
}

export function NewsModal({ article, isOpen, onClose }: NewsModalProps) {
  if (!article) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="text-xs uppercase tracking-wide">
              {article.category}
            </Badge>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <DialogTitle className="text-2xl text-left leading-tight">
            {article.title}
          </DialogTitle>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(article.publishedAt)}
            </div>
          </div>
        </DialogHeader>
        
        <div className="prose prose-gray max-w-none">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}