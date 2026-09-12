import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MessageSquare, Send, MapPin, CheckCircle, ShieldCheck, Clock, HelpCircle } from 'lucide-react';
import { Contact } from '../components/Contact';
import { FAQ } from '../components/FAQ';
import { SEO } from '../components/SEO';
import { PortfolioConfig } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';

interface ContactPageProps {
  config: PortfolioConfig;
}

export const ContactPage: React.FC<ContactPageProps> = ({ config }) => {
  const contactSchemaGraph = [
    {
      '@type': 'ContactPage',
      '@id': 'https://9t9.pro.bd/contact#page',
      url: 'https://9t9.pro.bd/contact',
      name: 'Contact & Hire Masum 9T9',
      description: 'Get in touch with Masum 9T9 for graphic design, YouTube thumbnails, poster manipulation, UI/UX, or web development projects via Telegram, Email, WhatsApp, or Facebook.',
      mainEntity: { '@id': 'https://9t9.pro.bd/#masum9t9' },
    },
  ];

  return (
    <div className="pt-20 sm:pt-24 pb-16 px-3.5 sm:px-6 lg:px-8 bg-[#0E0A07] text-[#FAF6F0]">
      <SEO
        title="Contact & Hire Masum 9T9 | Graphic Designer & Web Developer"
        description="Get in touch with Masum 9T9 for custom graphic design, YouTube thumbnail design, poster manipulation, UI/UX, and React web development projects."
        canonicalUrl="https://9t9.pro.bd/contact"
        keywords="Contact Masum 9T9, Hire Graphic Designer Bangladesh, Hire Web Developer Bangladesh, Telegram Masum 9T9, 9t9.pro.bd contact"
        breadcrumbs={[
          { name: 'Home', item: 'https://9t9.pro.bd/' },
          { name: 'Contact', item: 'https://9t9.pro.bd/contact' },
        ]}
        customSchema={contactSchemaGraph}
      />

      {/* Main Glass Contact Form Component */}
      <Contact config={config.contact} socials={config.socials} />

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQ faqs={config.faqs} />
      </div>

    </div>
  );
};
