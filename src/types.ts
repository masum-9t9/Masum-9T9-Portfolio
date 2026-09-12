export interface HeroData {
  greeting: string;
  name: string;
  role: string;
  rotatingRoles: string[];
  bio: string;
  statusBadge: string;
  availableForHire: boolean;
  profileImage: string;
  logoImage?: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
}

export interface AboutData {
  title: string;
  subtitle: string;
  storyHeading: string;
  storyParagraphs: string[];
  visionHeading: string;
  visionText: string;
  careerGoalsHeading: string;
  careerGoalsText: string;
  resumeUrl: string;
  education: {
    degree: string;
    institution: string;
    year: string;
    details: string;
  }[];
  highlights: {
    label: string;
    value: string;
  }[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'design' | 'development' | 'content' | 'software' | 'design_field';
  proficiency: number;
  iconName: string;
  description: string;
  tags: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  features: string[];
  deliverables: string;
  turnaroundTime: string;
}

export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
  keyProjects: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'poster' | 'yt_thumbnail' | 'education' | 'custom_theme' | 'natok_poster' | 'natok_thumbnail' | 'all' | string;
  categoryLabel: string;
  imageUrl: string;
  description: string;
  longDescription?: string;
  viewsCount?: string;
  achievement?: string;
  technologies: string[];
  clientName?: string;
  year?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  completionProgress?: number | string;
  designVersion?: string;
  designerName?: string;
  designerUrl?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  projectType: string;
  designImageUrl?: string;
}

export interface AchievementItem {
  id: string;
  number: number;
  suffix: string;
  label: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SocialLinks {
  facebook: string;
  youtube: string;
  telegram: string;
  whatsapp: string;
  email: string;
  phone: string;
  behance?: string;
  fiverr?: string;
  github?: string;
  dribbble?: string;
}

export interface ContactConfig {
  phone: string;
  emailPrimary: string;
  emailSecondary: string;
  telegramUsername: string;
  whatsappNumber: string;
  location: string;
  googleSheetScriptUrl: string;
  telegramBotToken: string;
  telegramChatId: string;
}

export interface EcosystemLink {
  label: string;
  url: string;
  type?: 'web' | 'android' | 'playstore' | string;
}

export interface FeaturedEcosystemItem {
  id: string;
  badge: string;
  title: string;
  subtitle?: string;
  mainUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  keyFeatures: string[];
  galleryImages: string[];
  links: EcosystemLink[];
  completionProgress?: number | string;
  designVersion?: string;
  uiuxDesignerName?: string;
  uiuxDesignerUrl?: string;
  developerName?: string;
  developerUrl?: string;
  category?: string;
  categoryBadges?: string[];
  status?: string;
  duration?: string;
  techStack?: string[];
  documentationUrl?: string;
  caseStudyUrl?: string;
}

export interface PortfolioConfig {
  hero: HeroData;
  about: AboutData;
  skills: SkillItem[];
  services: ServiceItem[];
  experiences: ExperienceItem[];
  portfolio: PortfolioItem[];
  portfolioItems?: PortfolioItem[];
  featuredEcosystem?: FeaturedEcosystemItem[];
  ecosystemProjects?: FeaturedEcosystemItem[];
  testimonials: TestimonialItem[];
  achievements: AchievementItem[];
  faqs: FAQItem[];
  socials: SocialLinks;
  contact: ContactConfig;
}
