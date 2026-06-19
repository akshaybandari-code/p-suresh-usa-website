# SuureshUSA | P. Suuresh & Associates

Expert US & India cross-border tax advisory, individual filings (FBAR, FATCA, Form 8938), property sale TDS certificates, and corporate FEMA advisory.

## Features

- **Cross-Border Tax Expertise:** Specialized advisory for NRIs and corporate entities.
- **Service Directory:** Detailed practice areas including Individual/Expat and Corporate compliance.
- **Resource Center:** Comprehensive checklists and interactive compliance calendars.
- **Gov Updates Tracker:** Latest regulatory updates, IRS News, and FATCA guidance.
- **Dark Mode Support:** Clean, premium dynamic UI adaptive to system preference.
- **Performance Optimized:** Fast, responsive, built with modern web technologies.

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (via Tailwind v4 @theme configuration)
- **Routing:** React Router v6
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **SEO & Metadata:** React Helmet Async

## Setup and Installation

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Environment Variables

Rename `.env.example` to `.env` and fill in the necessary keys (for example, EmailJS credentials). The variables are prefixed with `VITE_` and are safely exposed to the React environment.

```bash
# Example
VITE_EMAILJS_SERVICE_ID="YOUR_SERVICE_ID"
VITE_EMAILJS_TEMPLATE_ID="YOUR_TEMPLATE_ID"
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID="YOUR_AUTOREPLY_TEMPLATE_ID"
VITE_EMAILJS_PUBLIC_KEY="YOUR_PUBLIC_KEY"
```

## Running the Application

To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Disclaimer

This project is for informational marketing purposes. It provides general information only and should not be construed as legal, tax, or accounting advice.
