# Utility Cron Deployment (testing)

A Next.js web application for managing utility bills with automated Vercel cron job deployments and Supabase database integration.

## Features
- Add and manage utility bills (Rent, Water, Electricity)
- Set bill recurrence (Minutely, Daily, Monthly)
- Supabase database for storage
- Vercel cron job for automated deployment checks
- Bill limit of 3 active bills at a time

## How to Run
1. Run `npm install` to install dependencies
2. Create `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
3. Run `npm run dev` to start development server
4. Open http://localhost:3000 to view in browser
5. Add bills using the form on the left side
6. View deployments on the right side when cron triggers

## Tools/Languages
- **TypeScript** - 65%
- **React/Next.js** - 25%
- **CSS (Tailwind)** - 10%

## What I Learned
- Configuring Vercel cron jobs with `vercel.json` and schedule syntax (`* * * * *`)
- Codes for arrays `.push` and `.length`
- General structuring: `page.tsx` for all client-side `lib` folder for server-side

## Available Scripts

### npm run dev
Starts the Next.js development server with hot reload.
Open http://localhost:3000 to view in browser.

### npm run build
Creates an optimized production build.

### npm run start
Runs the production build locally.

### vercel --prod
Deploys to Vercel production (enables cron jobs).
