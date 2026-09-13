import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  pageType?: 'website' | 'profile' | 'article' | 'service';
  breadcrumbs?: BreadcrumbItem[];
  customSchema?: Record<string, any>[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = 'Masum 9T9, Nex Masum, Masum 9T9 Official Website, Masum 9T9 Portfolio, Graphic Designer Bangladesh, YouTube Thumbnail Designer Bangladesh, Poster Designer Bangladesh, Web Developer Bangladesh, UI UX Designer, Md. Masum Billah, Masum Gfx, 9t9.pro.bd',
  canonicalUrl = 'https://9t9.pro.bd',
  ogImage = 'https://i.postimg.cc/qv65SNTG/Web-Home-Messenger-view.png',
  pageType = 'website',
  breadcrumbs,
  customSchema = [],
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title.includes('Masum 9T9')
      ? title
      : `${title} | Masum 9T9`;
    document.title = fullTitle;

    // 2. Helper function to update or create meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    // Description & Keywords
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);

    // OpenGraph
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', pageType === 'service' ? 'website' : pageType);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

    // Twitter Card
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // Canonical link
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl);

    // Build Schema.org Graph
    const graph: Record<string, any>[] = [
      {
        '@type': 'Person',
        '@id': 'https://9t9.pro.bd/#masum9t9',
        name: 'Masum 9T9',
        alternateName: ['Nex Masum', 'Md. Masum Billah', 'Masum Gfx', 'Masum', 'Masum9T9'],
        url: 'https://9t9.pro.bd/',
        image: 'https://i.postimg.cc/qv65SNTG/Web-Home-Messenger-view.png',
        jobTitle: 'Senior Graphic Designer, UI/UX Designer & Full-Stack Web Developer',
        telephone: '+8801303623838',
        email: 'masum.9t9.gd@gmail.com',
        sameAs: [
          'https://9t9.pro.bd',
          'https://www.facebook.com/masum.9t9.official',
          'https://www.youtube.com/@ParahinAcademy',
          'https://www.behance.net/masum_9t9_official',
          'https://github.com/masum-9t9/',
          'https://t.me/masum_9t9_official',
          'https://www.fiverr.com/sellers/masum9t9/',
        ],
        knowsAbout: [
          'Graphic Design',
          'Social Media Design',
          'Poster Design',
          'YouTube Thumbnail Design',
          'Branding & Visual Identity',
          'UI/UX Design',
          'Front-End Web Development',
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Content Creation'
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://9t9.pro.bd/#website',
        url: 'https://9t9.pro.bd/',
        name: 'Masum 9T9 Official Portfolio & Digital Studio',
        alternateName: ['Nex Masum Portfolio', '9T9 Pro BD', 'Masum 9T9 Website'],
        description: 'Official portfolio of Masum 9T9 (Md. Masum Billah) featuring Graphic Design, UI/UX, Web Development, and Content Creation.',
        publisher: { '@id': 'https://9t9.pro.bd/#masum9t9' },
        inLanguage: ['en', 'bn'],
      },
    ];

    // Add BreadcrumbList if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.item,
        })),
      });
    }

    // Append custom page schemas
    if (customSchema && customSchema.length > 0) {
      graph.push(...customSchema);
    }

    const jsonLdData = {
      '@context': 'https://schema.org',
      '@graph': graph,
    };

    let scriptElement = document.querySelector('script[type="application/ld+json"]');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(jsonLdData);
  }, [title, description, keywords, canonicalUrl, ogImage, pageType, breadcrumbs, customSchema]);

  return null;
};
