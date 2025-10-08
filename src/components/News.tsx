import { useState, useEffect } from 'react'
import { NewsCard } from './news/NewsCard'
import { NewsModal } from './news/NewsModal'
import { Newspaper, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { makeRequest, fallbackData } from '../utils/api'

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  category: string
}

export function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let mounted = true
    
    const loadNews = async () => {
      if (mounted) {
        await fetchNews()
      }
    }
    
    loadNews()
    
    return () => {
      mounted = false
    }
  }, [])

  const fetchNews = async () => {
    try {
      const data = await makeRequest('/news', { timeout: 8000 })
      setArticles(data || [])
      setHasError(false)
    } catch (error) {
      console.log('Error fetching news:', error.message)
      // Use fallback data when server is unavailable
      setArticles(fallbackData.news)
      setHasError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedArticle(null), 300)
  }

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 text-sm mb-6">
            <Newspaper className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700">Latest Updates</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl text-black mb-4">
            News & Updates
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest developments, product launches, and company milestones
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {articles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onClick={() => handleArticleClick(article)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-gray-500 mb-2">No news articles yet</h3>
            <p className="text-gray-400">Check back soon for updates on our progress!</p>
          </div>
        )}

        {articles.length > 0 && (
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Want to stay updated with all our announcements?
            </p>
            <Button 
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Follow Our Progress
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      <NewsModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}