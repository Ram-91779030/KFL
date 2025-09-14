import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  domain?: 'karshakfoodlife' | 'ogbar';
}

export function SEOHead({
  title = "KFL - Karshak Food Life | Premium Natural Foods & Healthy Living",
  description = "Discover premium natural foods from KFL (Karshak Food Life) and OG (ORIGINAL). Premium dry fruits, protein bars, healthy snacks, and organic spices. Farm-fresh quality delivered to your doorstep across India.",
  keywords = "natural foods, dry fruits, protein bars, healthy snacks, organic spices, premium nuts, KFL, Karshak Food Life, OG, ORIGINAL, farm fresh, healthy living, nutrition, wellness",
  image = "https://karshakfoodlife.in/og-image.jpg",
  url = "https://karshakfoodlife.in",
  type = "website",
  siteName = "KFL - Karshak Food Life",
  domain = "karshakfoodlife"
}: SEOHeadProps) {

  const getDomainConfig = () => {
    switch (domain) {
      case 'ogbar':
        return {
          siteName: "OG Bar - ORIGINAL",
          title: "OG Bar - ORIGINAL | Premium Natural Protein Bars",
          description: "Premium natural protein bars from OG (ORIGINAL). Healthy, nutritious, and delicious protein bars made with natural ingredients. Perfect for fitness enthusiasts and health-conscious individuals.",
          url: "https://ogbar.in",
          keywords: "protein bars, natural protein bars, healthy snacks, OG bar, ORIGINAL, fitness nutrition, healthy living, natural ingredients, protein snacks"
        };
      case 'karshakfoodlife':
      default:
        return {
          siteName: "KFL - Karshak Food Life",
          title: "KFL - Karshak Food Life | Premium Natural Foods & Healthy Living",
          description: "Discover premium natural foods from KFL (Karshak Food Life) and OG (ORIGINAL). Premium dry fruits, protein bars, healthy snacks, and organic spices. Farm-fresh quality delivered to your doorstep across India.",
          url: "https://karshakfoodlife.in",
          keywords: "natural foods, dry fruits, protein bars, healthy snacks, organic spices, premium nuts, KFL, Karshak Food Life, OG, ORIGINAL, farm fresh, healthy living, nutrition, wellness"
        };
    }
  };

  const config = getDomainConfig();
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalUrl = url || config.url;
  const finalKeywords = keywords || config.keywords;
  const finalSiteName = siteName || config.siteName;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="KFL - Karshak Food Life" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={finalSiteName} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@KarshakFoodLife" />
      <meta name="twitter:creator" content="@KarshakFoodLife" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#dc2626" />
      <meta name="msapplication-TileColor" content="#dc2626" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={finalSiteName} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": finalSiteName,
          "url": finalUrl,
          "logo": `${finalUrl}/logo.png`,
          "description": finalDescription,
          "foundingDate": "2020",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Health Street, Organic Plaza",
            "addressLocality": "Mumbai",
            "addressRegion": "Maharashtra",
            "postalCode": "400001",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-98765-43210",
            "contactType": "customer service",
            "availableLanguage": ["English", "Hindi"]
          },
          "sameAs": [
            "https://www.facebook.com/karshakfoodlife",
            "https://www.instagram.com/karshakfoodlife",
            "https://www.twitter.com/karshakfoodlife",
            "https://www.youtube.com/karshakfoodlife"
          ]
        })}
      </script>
      
      {/* Structured Data - Website */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": finalSiteName,
          "url": finalUrl,
          "description": finalDescription,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${finalUrl}/products?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
      
      {/* Structured Data - Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": finalSiteName,
          "image": image,
          "description": finalDescription,
          "url": finalUrl,
          "telephone": "+91-98765-43210",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Health Street, Organic Plaza",
            "addressLocality": "Mumbai",
            "addressRegion": "Maharashtra",
            "postalCode": "400001",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 19.0760,
            "longitude": 72.8777
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "09:00",
            "closes": "21:00"
          },
          "priceRange": "₹₹",
          "servedCuisine": "Healthy Food Products"
        })}
      </script>
    </Helmet>
  );
}
