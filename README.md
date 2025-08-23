📘 Product App

A simple application built with Next.js 15 (App Router) and NextAuth.js to demonstrate authentication, public and protected routes, and basic product management features.

🌐 Live Site: https://next-product-app-steel.vercel.app/

💻 GitHub Repository: https://github.com/mithun41/next-productApp

🚀 Features
🔓 Public Pages

Landing Page

Navbar, Hero, Product Highlights, Footer

Products Page (/products)

Product Details Page

🔐 Authentication

Login with NextAuth.js

Google OAuth or Credentials login

Redirects to /products after successful login

🔒 Protected Page

Add Product Page

Only accessible to logged-in users

Form to add a new product and store in database

Redirect unauthenticated users to /login

🏗️ Tech Stack

Frontend: Next.js 15 (App Router), TailwindCSS

Auth: NextAuth.js

Backend: Next.js Route Handlers (/api)

Database: MongoDB

Deployment: Vercel

⚙️ Setup & Installation

Clone the repository:

git clone https://github.com/mithun41/next-productApp.git
cd next-product-app

Install dependencies:

npm install

Create a .env.local file:
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string

npm run dev
Visit http://localhost:3000 🚀
