import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Get member count
app.get('/make-server-0d02a0b5/members/count', async (c) => {
  try {
    const count = await kv.get('member_count') || 0
    return c.json({ count })
  } catch (error) {
    console.log('Error getting member count:', error)
    return c.json({ count: 0 })
  }
})

// Join TYTC (signup member)
app.post('/make-server-0d02a0b5/members/join', async (c) => {
  try {
    const { name, email, university, course, year, phone, motivation } = await c.req.json()
    
    // Store member data
    const memberId = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    await kv.set(memberId, {
      id: memberId,
      name,
      email,
      university,
      course,
      year,
      phone,
      motivation,
      joinedAt: new Date().toISOString()
    })
    
    // Update member count
    const currentCount = await kv.get('member_count') || 0
    await kv.set('member_count', parseInt(currentCount) + 1)
    
    return c.json({ 
      success: true, 
      message: 'Welcome to TYTC! We\'ll be in touch soon.',
      memberId 
    })
  } catch (error) {
    console.log('Error joining TYTC:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to join TYTC. Please try again.' 
    }, 500)
  }
})

// Get all members (admin)
app.get('/make-server-0d02a0b5/admin/members', async (c) => {
  try {
    const members = await kv.getByPrefix('member_') || []
    return c.json({ members })
  } catch (error) {
    console.log('Error getting members:', error)
    return c.json({ members: [] })
  }
})

// Get news articles
app.get('/make-server-0d02a0b5/news', async (c) => {
  try {
    const news = await kv.getByPrefix('news_') || []
    return c.json(news.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()))
  } catch (error) {
    console.log('Error getting news:', error)
    return c.json([])
  }
})

// Get all members (admin)
app.get('/make-server-0d02a0b5/admin/members', async (c) => {
  try {
    const members = await kv.getByPrefix('member_') || []
    return c.json({ members })
  } catch (error) {
    console.log('Error getting members:', error)
    return c.json({ members: [] })
  }
})

// Initialize default data
app.post('/make-server-0d02a0b5/init', async (c) => {
  try {
    // Initialize member count if not exists
    const memberCount = await kv.get('member_count')
    if (!memberCount) {
      await kv.set('member_count', 0)
    }
    
    // Initialize some real news
    const existingNews = await kv.getByPrefix('news_')
    if (!existingNews || existingNews.length === 0) {
      await kv.set('news_drello_launch', {
        id: 'news_drello_launch',
        title: 'Drello - Our Task Management Platform Officially Launches',
        excerpt: 'After months of development, we\'re excited to announce the official launch of Drello, our flagship task management and productivity platform.',
        content: 'We are thrilled to announce the official launch of Drello, Tyora\'s first flagship product. Drello is a comprehensive task management and productivity platform designed to help individuals and teams organize their work efficiently.\n\nBuilt with modern web technologies and a focus on user experience, Drello offers intuitive project organization, collaborative features, and powerful productivity tools. This launch marks a significant milestone for Tyora as we begin our journey to build Africa\'s tech future.\n\nDrello is now available for beta testing, and we\'re actively gathering feedback from early users to improve the platform further.',
        author: 'Fagite Emmanuel Olamide',
        publishedAt: '2024-12-15T10:00:00Z',
        category: 'Product Launch'
      })
      
      await kv.set('news_axiom_development', {
        id: 'news_axiom_development',
        title: 'Axiom AI Model Development Underway',
        excerpt: 'We\'re working on Axiom, our proprietary AI model that will power intelligent features across our product ecosystem.',
        content: 'Development of Axiom, Tyora\'s proprietary AI model, is well underway. This artificial intelligence system will serve as the foundation for intelligent features across our entire product ecosystem.\n\nAxiom is being designed with a focus on practical applications that can benefit African businesses and students. The model will initially focus on natural language processing and task automation capabilities.\n\nWhile still in development, early prototypes show promising results. We expect to begin alpha testing in the coming months as we work towards integrating AI capabilities into our existing and future products.',
        author: 'Tyora Development Team',
        publishedAt: '2024-12-01T14:30:00Z',
        category: 'Development'
      })
    }
    
    return c.json({ success: true, message: 'Data initialized successfully' })
  } catch (error) {
    console.log('Error initializing data:', error)
    return c.json({ success: false, error: 'Failed to initialize data' }, 500)
  }
})

Deno.serve(app.fetch)