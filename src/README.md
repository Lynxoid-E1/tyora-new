# Tyora Website

Official website for Tyora - Building Africa's Tech Future

## About Tyora

Tyora is a youth-focused software and AI company founded in 2024 in Nigeria. We're building innovative solutions to empower the next generation of African tech talent.

### Our Products

- **Drello** - Task management and productivity platform (Launched)
- **Axiom** - AI model in development
- **TYTC** - Tyora Youth Tech Club

## Development

### Prerequisites

- Node.js 18+ and npm
- Git

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/tyora-website.git
cd tyora-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with your Supabase credentials:
```
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_ANON_KEY=your_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Visit `http://localhost:3000` to see the website.

### Admin Dashboard

To access the admin dashboard for viewing TYTC members, visit:
`http://localhost:3000/admin.html`

### Building for Production

```bash
npm run build
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Set environment variables in Netlify dashboard

## Backend

The backend uses Supabase Edge Functions. The server code is in `/supabase/functions/server/`.

## License

MIT License - see LICENSE file for details

## Contact

- **Founder**: Fagite Emmanuel Olamide
- **Website**: https://tyora.dev
- **Location**: Nigeria

---

Built with React, TypeScript, Tailwind CSS, and Supabase.