import { projectId, publicAnonKey } from './supabase/info'

export interface RequestOptions {
  method?: string
  body?: any
  timeout?: number
}

export async function makeRequest(endpoint: string, options: RequestOptions = {}) {
  const { method = 'GET', body, timeout = 10000 } = options
  
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    const url = `https://${projectId}.supabase.co/functions/v1/make-server-0d02a0b5${endpoint}`
    
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        ...(body && { 'Content-Type': 'application/json' })
      },
      signal: controller.signal,
      ...(body && { body: JSON.stringify(body) })
    }
    
    const response = await fetch(url, requestOptions)
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out')
    }
    throw error
  }
}

// Fallback data when server is unavailable
export const fallbackData = {
  news: [
    {
      id: 'fallback_drello',
      title: 'Drello - Our Task Management Platform Officially Launches',
      excerpt: 'After months of development, we\'re excited to announce the official launch of Drello, our flagship task management and productivity platform.',
      content: 'We are thrilled to announce the official launch of Drello, Tyora\'s first flagship product. Drello is a comprehensive task management and productivity platform designed to help individuals and teams organize their work efficiently.\n\nBuilt with modern web technologies and a focus on user experience, Drello offers intuitive project organization, collaborative features, and powerful productivity tools. This launch marks a significant milestone for Tyora as we begin our journey to build Africa\'s tech future.\n\nDrello is now available for beta testing, and we\'re actively gathering feedback from early users to improve the platform further.',
      author: 'Fagite Emmanuel Olamide',
      publishedAt: '2024-12-15T10:00:00Z',
      category: 'Product Launch'
    },
    {
      id: 'fallback_axiom',
      title: 'Axiom AI Model Development Underway',
      excerpt: 'We\'re working on Axiom, our proprietary AI model that will power intelligent features across our product ecosystem.',
      content: 'Development of Axiom, Tyora\'s proprietary AI model, is well underway. This artificial intelligence system will serve as the foundation for intelligent features across our entire product ecosystem.\n\nAxiom is being designed with a focus on practical applications that can benefit African businesses and students. The model will initially focus on natural language processing and task automation capabilities.\n\nWhile still in development, early prototypes show promising results. We expect to begin alpha testing in the coming months as we work towards integrating AI capabilities into our existing and future products.',
      author: 'Tyora Development Team',
      publishedAt: '2024-12-01T14:30:00Z',
      category: 'Development'
    }
  ],
  memberCount: 0
}