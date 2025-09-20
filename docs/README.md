# FloTable with Views - Unified Deployment

This directory contains the unified documentation and preview application for FloTable with Views.

## Features

- **📚 Complete Documentation**: Installation guides, API reference, best practices
- **🎮 Live Preview**: Interactive demos with restaurant management examples  
- **📱 Responsive Design**: Mobile-optimized with touch-friendly interactions
- **🔍 Multiple Examples**: Different table configurations and use cases

## Local Development

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3001` (or the next available port).

## Production Build

```bash
npm run build
npm start
```

## Deployment

This application can be deployed to any platform that supports Next.js:

- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Use the build command `npm run build` 
- **Docker**: Build with the included Dockerfile
- **Static Export**: Use `npm run build` with `output: 'export'` in next.config.js

## Environment Variables

No environment variables are required for basic functionality. All data is mocked locally.

## Structure

```
docs/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Landing page
│   ├── docs/page.tsx      # Documentation
│   ├── preview/page.tsx   # Live preview
│   ├── examples/page.tsx  # Examples gallery
│   └── layout.tsx         # Root layout
├── src/                   # Demo components and data
│   ├── components/        # Restaurant demo components
│   ├── data/             # Mock data and API
│   ├── types/            # TypeScript definitions
│   └── utils/            # Utility functions
└── public/               # Static assets
```

## Pages

1. **/** - Landing page with overview and quick start
2. **/docs** - Complete documentation with API reference
3. **/preview** - Interactive demos with restaurant tables
4. **/examples** - Gallery of different use cases and code examples

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
