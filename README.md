# 🚀 Personal Portfolio Website

My personal portfolio website built with Next.js, featuring interactive 3D animations, smooth scrolling, and a cosmic space theme.

## 🔥 Features

- **3D Animations** — Interactive keyboard built with Spline, with skills as keycaps that reveal titles and descriptions on hover
- **Smooth Interactions** — Powered by GSAP and Framer Motion for fluid animations on scroll, hover, and element reveal
- **Space Theme** — Particle effects on a dark background to simulate a cosmic environment
- **Responsive Design** — Fully responsive across all devices
- **Contact Form** — Email integration via Resend
- **Dark/Light Mode** — Theme switching with next-themes

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Animations**: GSAP, Framer Motion, Spline 3D
- **Smooth Scrolling**: Lenis
- **Email**: Resend
- **Validation**: Zod

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nnicholas-c/personal-website.git
   ```

2. Navigate to the project directory:

   ```bash
   cd personal-website
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file and add your environment variables:

   ```env
   RESEND_API_KEY=your_resend_api_key
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

Deploy easily on [Vercel](https://vercel.com):

1. Push your code to GitHub.
2. Import the repository on Vercel.
3. Add your environment variables in the Vercel dashboard.
4. Deploy!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Originally inspired by [Naresh Khatri's 3D Portfolio](https://github.com/Naresh-Khatri/3d-portfolio).
