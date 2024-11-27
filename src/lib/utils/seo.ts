import { SITE_CONFIG } from "../constants";

export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
    },
  };
}

export function generateCanonicalUrl(path: string = "") {
  return `${SITE_CONFIG.url}${path}`;
}

export function generateMetaTags() {
  return {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    keywords: SITE_CONFIG.keywords.join(", "),
    openGraph: {
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.title,
      locale: SITE_CONFIG.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      creator: SITE_CONFIG.twitterHandle,
    },
    alternates: {
      languages: SITE_CONFIG.alternateLanguages,
    },
  };
}
