import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, url }) {
  const siteName = "SuureshUSA | P. Suuresh & Associates";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDesc = "Expert US & India cross-border tax advisory, individual filings (FBAR, FATCA, Form 8938, Form 5471), property sale TDS certificates, and corporate FEMA advisory.";
  const finalDesc = description || defaultDesc;
  const canonicalUrl = url || "https://www.suureshusa.com/";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={finalDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" />
    </Helmet>
  );
}
