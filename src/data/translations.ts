import { PortfolioConfig } from '../types';

export const UI_TRANSLATIONS = {
  bn: {
    nav: {
      home: 'হোম',
      hero: 'হোম',
      about: 'আমার সম্পর্কে',
      skills: 'দক্ষতা',
      services: 'সেবা',
      projects: 'প্রজেক্ট',
      uiUxDesign: 'ইউআই-ইউএক্স ডিজাইন',
      frontendDev: 'ফ্রন্টএন্ড ডেভেলপমেন্ট',
      graphicsDesign: 'গ্রাফিক্স ডিজাইন',
      designProjects: 'গ্রাফিক্স ডিজাইন',
      codingProjects: 'কোডিং প্রজেক্ট',
      portfolio: 'ডিজাইন প্রজেক্ট',
      ecosystem: 'কোডিং প্রজেক্ট',
      experience: 'অভিজ্ঞতা',
      testimonials: 'রিভিউ',
      contact: 'যোগাযোগ',
    },
    languageBadge: 'বাংলা',
    switchLanguageTooltip: 'English এ সুইচ করুন',
    hero: {
      availableForWork: 'নতুন প্রজেক্টের জন্য উন্মুক্ত',
      viewProjects: 'প্রজেক্ট দেখুন',
      contactMe: 'যোগাযোগ করুন',
    },
    about: {
      title: 'আমার সম্পর্কে',
      subtitle: 'প্যাশনেট ভিজ্যুয়াল স্টোরিটেলার ও গ্রাফিক্স ডিজাইনার',
      storyHeading: 'ডিজিটাল ক্রিয়েটিভিটির যাত্রাপথ',
      visionHeading: 'আমার লক্ষ্য ও ভিশন',
      careerGoalsHeading: 'ক্যারিয়ার গোলস',
      educationHeading: 'শিক্ষাগত যোগ্যতা ও ট্রেনিং',
      downloadCv: 'সিভি দেখুন',
    },
    skills: {
      badge: 'দক্ষতা ও সফটওয়্যার',
      title: 'আমার টেকনিক্যাল ও ক্রিয়েটিভ স্কিলস',
      subtitle: 'প্রফেশনাল সফটওয়্যার এবং ভিজ্যুয়াল ডিজাইন ফিল্ডে আমার অভিজ্ঞতা',
      softwareTab: 'সফটওয়্যার',
      fieldTab: 'ডিজাইন ফিল্ড',
    },
    services: {
      badge: 'আমার সেবাসমূহ',
      title: 'আপনার ব্র্যান্ডের জন্য প্রিমিয়াম ডিজাইন সার্ভিস',
      subtitle: 'আই-ক্যাচিং এবং হাই-কনভার্টিং ভিজ্যুয়াল কন্টেন্ট সমাধান',
      featuresTitle: 'প্রধান বৈশিষ্ট্যসমূহ:',
      deliverables: 'ডেলিভারি ফরম্যাট:',
      turnaround: 'ডেলিভারি সময়:',
      orderButton: 'অর্ডার করতে যোগাযোগ করুন',
    },
    experience: {
      badge: 'কর্মজীবন ও অভিজ্ঞতা',
      title: 'প্রফেশনাল কাজের অভিজ্ঞতা',
      subtitle: 'গত কয়েক বছরে বিভিন্ন কোম্পানি ও ক্লায়েন্টের সাথে কাজের অভিজ্ঞতা',
      keyProjects: 'প্রধান প্রজেক্টসমূহ:',
    },
    portfolio: {
      badge: 'পোর্টফোলিও প্রদর্শনী',
      title: 'আমার সেরা ক্রিয়েটিভ প্রজেক্টসমূহ',
      subtitle: 'হাই-কনভার্টিং নাটক পোস্টার, ইউটিউব থাম্বনেল, এডুকেশন কভার ও কাস্টম থিম',
      filterAll: 'সবগুলো',
      filterPoster: 'নাটক পোস্টার',
      filterYtThumbnail: 'নাটক থাম্বনেল',
      filterEducation: 'এডুকেশন থাম্বনেল',
      filterCustomTheme: 'কাস্টম থিম',
      viewDetails: 'বিস্তারিত দেখুন',
      livePreview: 'লাইভ দেখুন',
    },
    ecosystem: {
      badge: 'ডিজিটাল ইকোসিস্টেম',
      title: 'ওয়েব প্ল্যাটফর্ম ও প্রজেক্ট ইকোসিস্টেম',
      subtitle: 'আমার ডিজাইন ও প্রযুক্তিতে তৈরি বিভিন্ন প্ল্যাটফর্ম',
      visitWebsite: 'ওয়েবসাইট ভিজিট করুন',
      viewPlatform: 'প্ল্যাটফর্ম দেখুন',
    },
    testimonials: {
      badge: 'ক্লায়েন্টদের মতামত',
      title: 'সন্তুষ্ট ক্লায়েন্টদের কথা',
      subtitle: 'আমার কাজ সম্পর্কে ক্লায়েন্ট ও ক্রিয়েটরদের মূল্যবান রিভিউ',
      addReviewButton: 'আপনার মতামত দিন',
      addReviewBtn: 'আপনার মতামত দিন',
      ratingLabel: 'রেটিং',
      formTitle: 'নতুন মতামত জমা দিন',
      namePlaceholder: 'আপনার নাম',
      rolePlaceholder: 'পদবী (যেমন: ইউটিউবার / সিইও)',
      companyPlaceholder: 'কোম্পানি / চ্যানেল নাম',
      commentPlaceholder: 'আপনার মতামত লিখুন...',
      submitButton: 'মতামত জমা দিন',
    },
    achievements: {
      badge: 'সাফল্যের পরিসংখ্যান',
      title: 'সংখ্যায় আমার কাজের অগ্রগতি',
      subtitle: 'কঠোর পরিশ্রম ও ক্লায়েন্টদের ভালোবাসার প্রতিফলন',
    },
    faq: {
      badge: 'সাধারণ প্রশ্নাবলী',
      title: 'প্রায়শই জিজ্ঞাসিত প্রশ্নসমূহ',
      subtitle: 'প্রজেক্ট অর্ডার, সময়সীমা ও ফাইল ফরম্যাট সম্পর্কিত প্রশ্নের উত্তর',
      searchPlaceholder: 'প্রশ্ন খুঁজুন...',
    },
    contact: {
      badge: 'যোগাযোগ করুন',
      title: 'আসুন একসাথে অসাধারণ কিছু তৈরি করি',
      subtitle: 'নতুন প্রজেক্ট বা যেকোনো জিজ্ঞাসার জন্য মেসেজ দিন',
      formHeading: 'মেসেজ পাঠান',
      sendMessageHeading: 'মেসেজ পাঠান',
      nameLabel: 'আপনার নাম',
      namePlaceholder: 'আপনার নাম লিখুন',
      emailLabel: 'ইমেইল এড্রেস',
      emailPlaceholder: 'example@gmail.com',
      phoneLabel: 'ফোন নম্বর',
      phonePlaceholder: '01303-623838',
      subjectLabel: 'বিষয়',
      serviceCategoryLabel: 'প্রজেক্টের ক্যাটাগরি',
      subjectPlaceholder: 'প্রজেক্টের ধরণ (যেমন: থাম্বনেল ডিজাইন)',
      messageLabel: 'মেসেজ বা প্রজেক্ট বিবরণ',
      messagePlaceholder: 'আপনার প্রজেক্টের বিস্তারিত লিখুন...',
      sendButton: 'মেসেজ সাবমিট করুন',
      submitBtn: 'মেসেজ সাবমিট করুন',
      sendingButton: 'পাঠানো হচ্ছে...',
      successTitle: 'মেসেজ সফলভাবে পাঠানো হয়েছে!',
      successSub: 'আমি দ্রুত আপনার সাথে যোগাযোগ করব।',
      directContact: 'সরাসরি যোগাযোগ করুন',
      directCall: 'সরাসরি কল বা হোয়াটসঅ্যাপ',
      officialEmail: 'অফিশিয়াল ইমেইল এড্রেস',
      locationLabel: 'অবস্থান',
      emailUs: 'ইমেইল করুন',
      callUs: 'ফোন করুন',
      telegramUs: 'টেলিগ্রাম',
      whatsappUs: 'হোয়াটসঅ্যাপ',
    },
    footer: {
      roleTag: 'নতুন প্রজেক্টের জন্য এভেলেবল',
      availableForProjects: 'নতুন প্রজেক্টের জন্য এভেলেবল',
      bio: 'ডেভেলপার, কন্টেন্ট ক্রিয়েটর ও ডিজাইনার। পোস্টার ডিজাইন, হাই-সিটিআর ইউটিউব থাম্বনেল, এডুকেশন ভিজ্যুয়াল এবং কাস্টম থিম ডিজাইনে বিশেষজ্ঞ।',
      brandBio: 'ডেভেলপার, কন্টেন্ট ক্রিয়েটর ও ডিজাইনার। পোস্টার ডিজাইন, হাই-সিটিআর ইউটিউব থাম্বনেল, এডুকেশন ভিজ্যুয়াল এবং কাস্টম থিম ডিজাইনে বিশেষজ্ঞ।',
      quickNav: 'দ্রুত নেভিগেশন',
      copyright: 'সর্বস্বত্ব সংরক্ষিত।',
      rightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
      craftedWith: 'ডিজাইন এক্সিলেন্স এর জন্য তৈরি',
      backToTop: 'উপরে যান',
      scrollTop: 'উপরে যান',
    },
  },
  en: {
    nav: {
      home: 'Home',
      hero: 'Home',
      about: 'About',
      skills: 'Skills',
      services: 'Services',
      projects: 'Projects',
      uiUxDesign: 'UI-UX Design',
      frontendDev: 'Frontend Development',
      graphicsDesign: 'Graphics Design',
      designProjects: 'Graphics Design',
      codingProjects: 'Coding Projects',
      portfolio: 'Design Projects',
      ecosystem: 'Coding Projects',
      experience: 'Experience',
      testimonials: 'Reviews',
      contact: 'Contact',
    },
    languageBadge: 'EN',
    switchLanguageTooltip: 'Switch to বাংলা',
    hero: {
      availableForWork: 'Available for Work',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
    },
    about: {
      title: 'About Me',
      subtitle: 'Passionate Visual Storyteller & Graphics Designer',
      storyHeading: 'The Digital Creative Journey',
      visionHeading: 'Mission & Vision',
      careerGoalsHeading: 'Career Goals',
      educationHeading: 'Education & Training',
      downloadCv: 'View Resume',
    },
    skills: {
      badge: 'Skills & Software',
      title: 'Technical & Creative Skills',
      subtitle: 'My expertise across professional software and visual design fields',
      softwareTab: 'Software',
      fieldTab: 'Design Fields',
    },
    services: {
      badge: 'Services Offered',
      title: 'Premium Design Services for Your Brand',
      subtitle: 'Eye-catching and high-converting visual content solutions',
      featuresTitle: 'Key Features:',
      deliverables: 'Deliverable Formats:',
      turnaround: 'Turnaround Time:',
      orderButton: 'Get in Touch to Order',
    },
    experience: {
      badge: 'Career & Experience',
      title: 'Professional Experience',
      subtitle: 'Working history with clients, channels, and companies over the years',
      keyProjects: 'Key Projects:',
    },
    portfolio: {
      badge: 'Portfolio Showcase',
      title: 'Featured Creative Projects',
      subtitle: 'High-converting drama posters, YouTube thumbnails, education covers & custom themes',
      filterAll: 'All',
      filterPoster: 'Natok Poster',
      filterYtThumbnail: 'Natok Thumbnail',
      filterEducation: 'Education Thumbnail',
      filterCustomTheme: 'Custom Theme',
      viewDetails: 'View Details',
      livePreview: 'Live Preview',
    },
    ecosystem: {
      badge: 'Digital Ecosystem',
      title: 'Web Platforms & Ecosystem Showcase',
      subtitle: 'Featured platforms built with design and technological precision',
      visitWebsite: 'Visit Website',
      viewPlatform: 'View Platform',
    },
    testimonials: {
      badge: 'Client Testimonials',
      title: 'What Clients Say',
      subtitle: 'Valuable feedback from creators, directors, and business owners',
      addReviewButton: 'Submit Review',
      addReviewBtn: 'Submit Review',
      ratingLabel: 'Rating',
      formTitle: 'Submit Your Review',
      namePlaceholder: 'Your Name',
      rolePlaceholder: 'Role (e.g. YouTuber / CEO)',
      companyPlaceholder: 'Company / Channel Name',
      commentPlaceholder: 'Write your testimonial here...',
      submitButton: 'Submit Review',
    },
    achievements: {
      badge: 'Milestones & Impact',
      title: 'My Progress in Numbers',
      subtitle: 'A reflection of hard work, dedication, and client satisfaction',
    },
    faq: {
      badge: 'Frequently Asked Questions',
      title: 'Got Questions? Look Here',
      subtitle: 'Clear answers regarding project orders, turnaround times, and file deliverables',
      searchPlaceholder: 'Search questions...',
    },
    contact: {
      badge: 'Get in Touch',
      title: "Let's Create Something Amazing Together",
      subtitle: 'Send a message for new projects or any inquiries',
      formHeading: 'Send a Message',
      sendMessageHeading: 'Send a Message',
      nameLabel: 'Your Name',
      namePlaceholder: 'Enter your name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'example@gmail.com',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '01303-623838',
      subjectLabel: 'Subject',
      serviceCategoryLabel: 'Project Category',
      subjectPlaceholder: 'Project Type (e.g. Thumbnail Design)',
      messageLabel: 'Message or Project Details',
      messagePlaceholder: 'Tell me about your project details...',
      sendButton: 'Submit Message',
      submitBtn: 'Submit Message',
      sendingButton: 'Sending...',
      successTitle: 'Message Sent Successfully!',
      successSub: 'I will get back to you as soon as possible.',
      directContact: 'Direct Contact Details',
      directCall: 'Direct Call or WhatsApp',
      officialEmail: 'Official Email Address',
      locationLabel: 'Location',
      emailUs: 'Email Us',
      callUs: 'Call Us',
      telegramUs: 'Telegram',
      whatsappUs: 'WhatsApp',
    },
    footer: {
      roleTag: 'Available for New Projects',
      availableForProjects: 'Available for New Projects',
      bio: 'Designer & Web Developer. Specialized in poster design, high-CTR YouTube thumbnails, educational visuals, and custom theme designs.',
      brandBio: 'Designer & Web Developer. Specialized in poster design, high-CTR YouTube thumbnails, educational visuals, and custom theme designs.',
      quickNav: 'Quick Navigation',
      copyright: 'All rights reserved.',
      rightsReserved: 'All rights reserved.',
      craftedWith: 'crafted with love for Design Excellence',
      backToTop: 'Back to Top',
      scrollTop: 'Back to Top',
    },
  },
};

export const ENGLISH_PORTFOLIO_CONFIG: PortfolioConfig = {
  hero: {
    greeting: "Hello, I'm",
    name: "Masum 9T9",
    role: "Graphics Designer • UI/UX Designer • Web Developer • Content Creator",
    rotatingRoles: [
      "Poster Design Specialist",
      "YouTube Thumbnail Creator",
      "Education Graphics Artist",
      "Custom Theme Designer",
      "Brand Visual Creator"
    ],
    bio: "I specialize in creating modern, high-converting digital graphics art. From professional posters and high-CTR YouTube thumbnails to educational visuals and custom themes, I take your brand to the next level.",
    statusBadge: "Available for Work",
    availableForHire: true,
    profileImage: "https://i.postimg.cc/gJT7B3XX/Profile-pic.png",
    ctaPrimaryText: "View Projects",
    ctaSecondaryText: "Contact Me"
  },
  about: {
    title: "About Me",
    subtitle: "Designer & Web Developer",
    storyHeading: "The Journey of Digital Creativity",
    storyParagraphs: [
      "For over 3 years, I have been passionately creating digital graphic art and thumbnail designs. Transforming ordinary visuals into compelling artwork is my core mission.",
      "I believe a great thumbnail or poster is more than just an image — it is the key driver to capture audience attention and build trust within the first 5 seconds.",
      "From mobile design apps (Ibis Paint X, Pixellab) to desktop professional software (Photoshop, Illustrator, PS CC 2019) – I leverage every tool to achieve top quality."
    ],
    visionHeading: "My Mission & Vision",
    visionText: "To provide world-class visual branding to Bangla and international content creators and businesses, ensuring premium quality, high engagement, and originality.",
    careerGoalsHeading: "Career Goals",
    careerGoalsText: "To deliver top-tier custom thumbnails and brand content to leading YouTubers, educational platforms, and entrepreneurs to help 10x their subscriber engagement and brand value.",
    resumeUrl: "#resume-modal",
    education: [
      {
        degree: "Diploma in Graphics & Digital Media",
        institution: "Parahin Academy",
        year: "2026",
        details: "Advanced photorealistic poster compositing, YouTube thumbnail psychology, and vector art."
      },
      {
        degree: "High-Conversion Thumbnail & UI Design",
        institution: "Online Professional Creator Academy",
        year: "2024 - 2025",
        details: "Color theory, typography hierarchy, brand identity, and custom layouts."
      }
    ],
    highlights: [
      { label: "Experience", value: "3+ Years" },
      { label: "Completed Projects", value: "100+" },
      { label: "Happy Clients", value: "50+" },
      { label: "Rating", value: "5.0 / 5.0" }
    ]
  },
  skills: [
    {
      id: "photoshop",
      name: "Photoshop",
      category: "software",
      proficiency: 75,
      iconName: "https://i.postimg.cc/7Z3fjNN9/photoshop.png",
      description: "Photorealistic poster design, photo manipulation, lighting & shadow dynamics.",
      tags: ["Poster Art", "Manipulation", "Retouching"]
    },
    {
      id: "illustrator",
      name: "Illustrator",
      category: "software",
      proficiency: 60,
      iconName: "https://i.postimg.cc/BnTXRCCB/illustrator.png",
      description: "Vector art, logo design, custom shiny shapes, and iconography.",
      tags: ["Vector Art", "Logo", "Typography"]
    },
    {
      id: "ibis_paint",
      name: "Ibis Paint X",
      category: "software",
      proficiency: 95,
      iconName: "https://i.postimg.cc/9QdrsBBP/ibispaint.jpg",
      description: "Mobile digital painting, custom texture brushwork, and creative thumbnail art.",
      tags: ["Mobile Art", "Digital Painting", "Anime Art"]
    },
    {
      id: "pixellab",
      name: "Pixellab",
      category: "software",
      proficiency: 95,
      iconName: "https://i.postimg.cc/cLRrPccF/pixellab.png",
      description: "Mobile 3D typography, poster banner layout, and custom typography composition.",
      tags: ["3D Typography", "Banner", "Bangla Design"]
    },
    {
      id: "ps_cc_2019",
      name: "PS CC 2019",
      category: "software",
      proficiency: 85,
      iconName: "https://i.postimg.cc/bwxs4RRV/pstouch.avif",
      description: "Advanced color grading, layer masking, and Camera Raw filter enhancement.",
      tags: ["Color Grading", "Compositing", "FX"]
    },
    {
      id: "poster_design",
      name: "Poster Design",
      category: "design_field",
      proficiency: 99,
      iconName: "Palette",
      description: "High-impact movie, event, and promotional poster artwork.",
      tags: ["Promotional", "Movie Poster", "Social Media"]
    },
    {
      id: "yt_thumbnail",
      name: "YouTube Thumbnail",
      category: "design_field",
      proficiency: 99,
      iconName: "Youtube",
      description: "High-CTR dramatic and clean thumbnail designs built to boost clicks.",
      tags: ["High CTR", "Clickbait Free", "Vlog & Tech"]
    },
    {
      id: "edu_thumbnail",
      name: "Education Thumbnail",
      category: "design_field",
      proficiency: 96,
      iconName: "GraduationCap",
      description: "Premium cover art for online courses, classes, and educational tutorials.",
      tags: ["Course Art", "Educational", "Class Banner"]
    }
  ],
  services: [
    {
      id: "poster_design_service",
      title: "Poster Design",
      shortDesc: "High-impact creative design for events, promotions, branding, and movie posters.",
      iconName: "Maximize2",
      features: [
        "Photorealistic Compositing",
        "High-Resolution Print & Web Ready",
        "Custom Color Grading & Shadow Effects",
        "Brand Guidelines Compliant"
      ],
      deliverables: "PSD, PNG, JPG (4K Output)",
      turnaroundTime: "24-48 Hours"
    },
    {
      id: "yt_thumbnail_service",
      title: "YouTube Thumbnail Design",
      shortDesc: "Specialized thumbnails engineered to rapidly boost video views and Click-Through Rate (CTR).",
      iconName: "PlayCircle",
      features: [
        "Eye-Catching Expressions & Cutouts",
        "High-Readability Bold Typography",
        "Psychological Color Palette",
        "3D Illumination & Depth"
      ],
      deliverables: "PNG (1080p Ultra Clear)",
      turnaroundTime: "12-24 Hours"
    },
    {
      id: "edu_thumbnail_service",
      title: "Education Thumbnail",
      shortDesc: "Sleek and professional cover art tailored for online academies, courses, and tutorials.",
      iconName: "BookOpen",
      features: [
        "Clean & Clear Infographic Art",
        "Subject-Specific Icons & Symbols",
        "Brand Consistency Maintained",
        "Multiple Variants Supported"
      ],
      deliverables: "PSD, PNG, PDF",
      turnaroundTime: "24 Hours"
    },
    {
      id: "content_creation_service",
      title: "Content Creation & Branding",
      shortDesc: "Social media promotion, Facebook page banners, and Reel cover creatives.",
      iconName: "Share2",
      features: [
        "Facebook Covers & Post Banners",
        "Custom Social Graphics Package",
        "Uniform Color Branding",
        "Story & Reel Themes"
      ],
      deliverables: "JPG, PNG, Vector",
      turnaroundTime: "1-2 Days"
    },
    {
      id: "custom_theme_service",
      title: "Custom Theme Design",
      shortDesc: "Responsive, clean, and stylish UI customization for bloggers and websites.",
      iconName: "Code2",
      features: [
        "Blogger & Web-Friendly Coding",
        "Responsive & Fast Loading UI",
        "Custom Color & Font Matching",
        "Easy Editable Widget Structure"
      ],
      deliverables: "HTML/CSS Code & Documentation",
      turnaroundTime: "2-3 Days"
    }
  ],
  experiences: [
    {
      id: "exp_1",
      year: "2026 - Present",
      role: "Senior Graphics Designer",
      company: "Parahin Academy",
      location: "Bangladesh (Remote)",
      description: "Responsible for course thumbnails, social media campaign banners, and overall brand identity creation.",
      keyProjects: ["600+ Thumbnails", "Official Rebranding", "Promo Content"]
    },
    {
      id: "exp_2",
      year: "2023 - 2026",
      role: "Freelance Thumbnail & Poster Specialist",
      company: "YouTube Creator Network",
      location: "Global Clients",
      description: "Designing high-CTR thumbnails and video artwork for 20+ popular YouTube channels.",
      keyProjects: ["100+ YouTube Thumbnails", "Tech & Travel Channel Rebranding"]
    }
  ],
  portfolio: [
    {
      id: "port_1",
      title: "Songsar-er Bondhon — Official Drama Poster Design",
      category: "natok_poster",
      categoryLabel: "Natok Poster Design",
      imageUrl: "https://i.postimg.cc/j28Vv1VJ/Songsar-er-bondhon.jpg",
      description: "Official key visual & poster artwork for the family drama 'Songsar-er Bondhon' presented by Raad Multimedia.",
      longDescription: "Designed to reflect family emotion, love, and depth of relationships. Features warm sunset tones, well-composed cast arrangements, and eye-catching custom typography to grab audience attention.",
      viewsCount: "94K+ Views",
      achievement: "Official Drama Hit Poster",
      technologies: ["Ibis Paint X", "Pixellab"],
      clientName: "Raad Multimedia",
      year: "2025",
      liveUrl: "https://youtu.be/RJniX0nZwNU?si=Lhq1jAD5VFn2aiOD"
    },
    {
      id: "port_2",
      title: "Hayre Kopal — High-CTR YouTube Thumbnail Design",
      category: "natok_thumbnail",
      categoryLabel: "Natok Thumbnail",
      imageUrl: "https://i.postimg.cc/wTv3H8BY/Hayre-Kopal.jpg",
      description: "High-converting thumbnail designed for the hit drama 'Hayre Kopal' on Meo Entertainment with 2.3M+ views.",
      longDescription: "High-converting thumbnail created for Meo Entertainment channel. Uses dramatic facial expressions and vibrant color grading to ensure maximum CTR and retention.",
      viewsCount: "2.3M+ Views",
      achievement: "2.3M+ Views Trending Drama Thumbnail",
      technologies: ["Pixellab"],
      clientName: "Meo Entertainment",
      year: "2025",
      liveUrl: "https://youtu.be/CYm9tW22qLo?si=6XM_GbUiYTWSUNXw"
    },
    {
      id: "port_3",
      title: "Class 8 Exam Strategy: HulkenStein Infinity School Thumbnail",
      category: "education",
      categoryLabel: "Education Thumbnail",
      imageUrl: "https://i.postimg.cc/hvxNBYx5/edu-1.jpg",
      description: "Premium thumbnail created for 8th Grade Exam Guide. Features dark-golden color scheme and clear typography for high CTR.",
      longDescription: "Designed for HulkenStein Infinity School channel. Features high contrast typography and clear focus elements for maximum student engagement.",
      viewsCount: "15K+ Views",
      achievement: "High-CTR Educational Record",
      technologies: ["Pixellab", "Ibis Paint X"],
      clientName: "HulkenStein Infinity School",
      year: "2025",
      liveUrl: "https://youtu.be/3DhY3Fkm1YY?si=d-4Gzbuu__mekr4Q"
    },
    {
      id: "port_4",
      title: "Premium Dark Luxury Custom Theme",
      category: "custom_theme",
      categoryLabel: "Custom Theme",
      imageUrl: "https://i.postimg.cc/rsFF9mFd/fbd8b403-9dba-42c1-a984-1293f50492cd.jpg",
      description: "Super-fast custom theme design with glassmorphism UI for blogger and portfolio websites.",
      longDescription: "Custom theme built for bloggers and portfolio sites. Features glassmorphism UI, SEO optimization, and 100/100 Lighthouse performance score.",
      viewsCount: "N/A",
      achievement: "100/100 Lighthouse Performance",
      technologies: ["HTML5", "CSS3", "Tailwind", "JavaScript"],
      clientName: "Masum 9T9",
      year: "2026",
      liveUrl: "https://9t9.pro.bd"
    },
    {
      id: "port_5",
      title: "Scholarship Exam 2025: HulkenStein Infinity School Thumbnail",
      category: "education",
      categoryLabel: "Education Thumbnail",
      imageUrl: "https://i.postimg.cc/XJ2Y5pzZ/edu-2.jpg",
      description: "Successful educational project reaching 17K+ views. Uses focus illumination and clear color hierarchy.",
      longDescription: "Reached 17K+ views on YouTube. Features precise color hierarchy, focus illumination, and readable font styling.",
      viewsCount: "17K+ Views",
      achievement: "Popular YouTube Educational Search",
      technologies: ["Pixellab", "Ibis Paint X"],
      clientName: "HulkenStein Infinity School",
      year: "2025",
      liveUrl: "https://youtu.be/NEROv4rdatA?si=xJo7Pj2AEj0k7boo"
    },
    {
      id: "port_6",
      title: "Hayre Kopal — Official Drama Poster Design",
      category: "natok_poster",
      categoryLabel: "Natok Poster Design",
      imageUrl: "https://i.postimg.cc/Qxmcs9WJ/hyre-kopal-poster.jpg",
      description: "Official first-look poster design for the hit drama 'Hayre Kopal' with 2.3M+ views on Meo Entertainment.",
      longDescription: "Official promotional poster created for the blockbuster drama 'Hayre Kopal'. Features 3D custom typography, natural warm color grading, and professional credit block layout.",
      viewsCount: "2.3M+ Reach",
      achievement: "2.3M+ Trending Drama Poster",
      technologies: ["Pixellab"],
      clientName: "Meo Entertainment",
      year: "2025",
      liveUrl: "https://youtu.be/CYm9tW22qLo?si=6XM_GbUiYTWSUNXw"
    },
    {
      id: "port_ui_1",
      title: "Parahin Academy — Learning Management Mobile App UI Design",
      category: "mobile_app_ui",
      categoryLabel: "Mobile App UI",
      imageUrl: "https://i.postimg.cc/rsFF9mFd/fbd8b403-9dba-42c1-a984-1293f50492cd.jpg",
      description: "Modern, intuitive, and interactive learning platform mobile app UI design system (Figma) for 10,000+ learners.",
      longDescription: "Complete mobile learning design system created for Parahin Academy students. Features dark mode optimization, course navigation, video lecture player, and student progress tracking dashboard.",
      viewsCount: "10K+ Learners",
      achievement: "Complete Figma Design System",
      technologies: ["Figma", "UI/UX", "Prototyping", "Mobile UX"],
      clientName: "Parahin Academy",
      year: "2026",
      liveUrl: "https://9t9.pro.bd"
    },
    {
      id: "port_ui_2",
      title: "Creative Studio Dark Analytics Dashboard UI",
      category: "dashboard_ui",
      categoryLabel: "Dashboard UI",
      imageUrl: "https://i.postimg.cc/hvxNBYx5/edu-1.jpg",
      description: "Luxury dark theme analytics dashboard tracking digital content performance, YouTube metrics, and creator revenue.",
      longDescription: "Analytics interface crafted for content creators and agencies. Features real-time CTR charts, retention curves, and channel performance visualizers.",
      viewsCount: "25+ Agencies",
      achievement: "High-Conversion Dashboard Architecture",
      technologies: ["Figma", "Design Systems", "UI Architecture"],
      clientName: "Creator Studio Global",
      year: "2025",
      liveUrl: "https://9t9.pro.bd"
    },
    {
      id: "port_web_1",
      title: "Masum 9T9 — Modern Bilingual Portfolio Web App",
      category: "portfolio_web",
      categoryLabel: "Web Development",
      imageUrl: "https://i.postimg.cc/Qxmcs9WJ/hyre-kopal-poster.jpg",
      description: "Ultra-fast interactive personal portfolio and service platform built with React 19, TypeScript, Motion, and Tailwind CSS.",
      longDescription: "Features 90+ Lighthouse score, bilingual English & Bengali support, custom sound effects, live interactive project price calculator, and instant CV PDF engine.",
      viewsCount: "Active",
      achievement: "100% Performance & Responsiveness",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Motion"],
      clientName: "Masum 9T9",
      year: "2026",
      liveUrl: "https://9t9.pro.bd"
    }
  ],
  featuredEcosystem: [
    {
      id: "eco_1",
      badge: "Portfolio Platform",
      title: "Portfolio Website & Digital Showcase",
      subtitle: "Interactive Creative Technologist Showcase & Web App",
      mainUrl: "https://www.9t9.pro.bd",
      githubUrl: "https://github.com/masum-9t9/portfolio-theme",
      imageUrl: "https://i.postimg.cc/rsFF9mFd/fbd8b403-9dba-42c1-a984-1293f50492cd.jpg",
      description: "A professional creative technologist portfolio featuring graphic design, branding, UI/UX concepts, and full-stack web applications. Built with React 19, TypeScript, and Tailwind CSS for peak performance and micro-interactions.",
      category: "Full-Stack Web App",
      categoryBadges: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Motion"],
      status: "Production Ready",
      duration: "2026 / 3 Months",
      uiuxDesignerName: "Masum 9T9",
      developerName: "Masum 9T9",
      completionProgress: 100,
      designVersion: "v4.5 Stable",
      techStack: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Tailwind CSS", "Firebase", "Node.js"],
      stats: [
        { label: "ACHIEVEMENT", value: "100+ Projects" },
        { label: "Clients", value: "50+ Global" }
      ],
      keyFeatures: [
        "Responsive Design across Desktop, Tablet & Mobile",
        "Smooth Animations & Motion Transitions",
        "SEO Friendly with Meta & OpenGraph Integration",
        "Modern UI with Glassmorphism & High Contrast",
        "Fast Performance & Instant Page Loading",
        "Full Accessibility (WCAG AA Standard)",
        "Dark Mode Luxury Palette with Subtle Glows",
        "Reusable Modular React Components System"
      ],
      galleryImages: [
        "https://i.postimg.cc/rsFF9mFd/fbd8b403-9dba-42c1-a984-1293f50492cd.jpg",
        "https://i.postimg.cc/j28Vv1VJ/Songsar-er-bondhon.jpg",
        "https://i.postimg.cc/wTv3H8BY/Hayre-Kopal.jpg"
      ],
      links: [
        {
          label: "Live Demo",
          url: "https://9t9.pro.bd",
          type: "web"
        },
        {
          label: "GitHub Repository",
          url: "https://github.com/masum-9t9/portfolio-theme",
          type: "github"
        }
      ]
    },
    {
      id: "eco_2",
      badge: "Custom Theme",
      title: "Premium Dark Luxury Custom Theme",
      subtitle: "Ultra-Fast Glassmorphic Web & Blogger Theme",
      mainUrl: "https://9t9.pro.bd",
      githubUrl: "https://github.com/masum-9t9/custom-dark-theme",
      imageUrl: "https://i.postimg.cc/rsFF9mFd/fbd8b403-9dba-42c1-a984-1293f50492cd.jpg",
      description: "An ultra-responsive dark theme engineered with glassmorphism UI, 100/100 Lighthouse performance score, zero lag, and semantic HTML5/CSS3 architecture for modern web applications and blogs.",
      category: "Frontend Web Theme",
      categoryBadges: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "Glassmorphism"],
      status: "Completed",
      duration: "2026",
      uiuxDesignerName: "Masum 9T9",
      developerName: "Masum 9T9",
      completionProgress: 100,
      designVersion: "v4.0 Master",
      techStack: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "ES6+"],
      stats: [
        { label: "Performance", value: "100/100" },
        { label: "Load Speed", value: "0.4s Fast" }
      ],
      keyFeatures: [
        "Responsive Layout across all screen sizes",
        "100/100 Lighthouse Performance Score",
        "SEO Friendly Schema Metadata",
        "Glassmorphic Card UI & High Contrast",
        "Fast Performance & Lightweight Footprint",
        "Full Accessibility & Keyboard Navigation",
        "Dark Mode Default Atmosphere",
        "Reusable Components & Clean Code"
      ],
      galleryImages: [
        "https://i.postimg.cc/rsFF9mFd/fbd8b403-9dba-42c1-a984-1293f50492cd.jpg",
        "https://i.postimg.cc/hvxNBYx5/edu-1.jpg"
      ],
      links: [
        {
          label: "Live Demo",
          url: "https://9t9.pro.bd",
          type: "web"
        },
        {
          label: "GitHub Repository",
          url: "https://github.com/masum-9t9/custom-dark-theme",
          type: "github"
        }
      ]
    },
    {
      id: "eco_3",
      badge: "Educational Hub",
      title: "Parahin Academy Tech Media Platform",
      subtitle: "Interactive Educational Ecosystem & Video Hub",
      mainUrl: "https://www.youtube.com/@ParahinAcademy",
      githubUrl: "https://github.com/masum-9t9/parahin-academy-web",
      imageUrl: "https://i.postimg.cc/hvxNBYx5/edu-1.jpg",
      description: "Comprehensive educational web platform for Parahin Academy, delivering tech video tutorials, graphic design courses, interactive quizzes, and downloadable resources.",
      category: "Educational Web Platform",
      categoryBadges: ["React", "Node.js", "Firebase", "Tailwind", "REST API"],
      status: "Production Ready",
      duration: "2025 - 2026",
      uiuxDesignerName: "Masum 9T9",
      developerName: "Masum 9T9",
      completionProgress: 95,
      designVersion: "v2.2 Pro",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Firebase"],
      stats: [
        { label: "Students", value: "10,000+" },
        { label: "Courses", value: "50+ Tutorials" }
      ],
      keyFeatures: [
        "Responsive Video Player & Course Interface",
        "Smooth Animations & Micro-Interactions",
        "SEO Friendly Video Metadata Integration",
        "Modern UI with High-Contrast Dark Scheme",
        "Fast Performance & Instant Resource Loading",
        "Accessibility & Keyboard Controls",
        "Dark Mode Optimized Palette",
        "Reusable Modular Architecture"
      ],
      galleryImages: [
        "https://i.postimg.cc/hvxNBYx5/edu-1.jpg",
        "https://i.postimg.cc/XJ2Y5pzZ/edu-2.jpg"
      ],
      links: [
        {
          label: "Live Demo",
          url: "https://www.youtube.com/@ParahinAcademy",
          type: "web"
        },
        {
          label: "GitHub Repository",
          url: "https://github.com/masum-9t9/parahin-academy-web",
          type: "github"
        }
      ]
    },
    {
      id: "eco_4",
      badge: "Creative Tooling",
      title: "High-CTR Visuals Engine & Asset Manager",
      subtitle: "Automated Web Asset & Design Management Portal",
      mainUrl: "https://9t9.pro.bd",
      githubUrl: "https://github.com/masum-9t9/visuals-engine",
      imageUrl: "https://i.postimg.cc/wTv3H8BY/Hayre-Kopal.jpg",
      description: "Web-based asset catalog and manager to preview, organize, and share high-conversion YouTube thumbnails, drama posters, and graphic design deliverables in real-time.",
      category: "Web Application",
      categoryBadges: ["React", "TypeScript", "Canvas API", "Tailwind"],
      status: "Completed",
      duration: "2025",
      uiuxDesignerName: "Masum 9T9",
      developerName: "Masum 9T9",
      completionProgress: 100,
      designVersion: "v1.8 Tool",
      techStack: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
      stats: [
        { label: "Assets", value: "1,000+ Files" },
        { label: "Views", value: "2.3M+ Reach" }
      ],
      keyFeatures: [
        "Responsive Design for Mobile & Desktop",
        "Smooth Animations & Image Zoom Effects",
        "SEO Friendly URL Slug Generation",
        "Modern UI with Clean Glass Cards",
        "Fast Performance & Client-Side Caching",
        "Accessibility & Screen Reader Friendly",
        "Dark Mode Aesthetic Palette",
        "Reusable Canvas & Grid Components"
      ],
      galleryImages: [
        "https://i.postimg.cc/wTv3H8BY/Hayre-Kopal.jpg",
        "https://i.postimg.cc/j28Vv1VJ/Songsar-er-bondhon.jpg"
      ],
      links: [
        {
          label: "Live Demo",
          url: "https://9t9.pro.bd",
          type: "web"
        },
        {
          label: "GitHub Repository",
          url: "https://github.com/masum-9t9/visuals-engine",
          type: "github"
        }
      ]
    }
  ],
  testimonials: [
    {
      id: "test_mh",
      name: "Megh Heem",
      role: "Drama Director",
      company: "Raad Multimedia & Meo Entertainment",
      avatarUrl: "https://i.postimg.cc/d1zKSjFk/Megh-Heem.jpg",
      rating: 5,
      comment: "What impresses me most about Masum brother is how he translates a story's emotional core into the poster's visual composition. For our drama 'Hayre Kopal', I was quite selective about the key visual and thumbnail. The way he sculpted custom Bengali typography with dramatic lighting grabbed immediate attention—a huge reason why the drama crossed 2.3M+ views on YouTube. I trust his artistic vision blindly for my productions.",
      projectType: "Natok Poster & Thumbnail",
      designImageUrl: "https://i.postimg.cc/Qxmcs9WJ/hyre-kopal-poster.jpg"
    },
    {
      id: "test_mr",
      name: "Al Mahi Rahman",
      role: "Senior Instructor",
      company: "HulkenStein Infinity School",
      avatarUrl: "https://i.postimg.cc/VLJCtYG2/Al-Mahi-Rahman.jpg",
      rating: 5,
      comment: "In educational content, a thumbnail needs clarity and focus above pure aesthetics. Masum designed the class thumbnails for our 'Class 8 Exam Strategy' and 'Scholarship Exam 2025' live series with incredible precision. The color contrast and legibility made key topics pop immediately, pushing our YouTube CTR past 14%. His punctuality and willingness to refine feedback make him a valuable partner.",
      projectType: "Education Thumbnail",
      designImageUrl: "https://i.postimg.cc/hvxNBYx5/edu-1.jpg"
    },
    {
      id: "test_tr",
      name: "Tanveer Rahman",
      role: "CU Admission Candidate",
      company: "Chittagong University (CU)",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=TanveerRahman",
      rating: 5,
      comment: "During the intense admission test prep, Masum brother's lecture slides were a breath of fresh air. He formatted complex English grammar rules and shortcuts into intuitive visual breakdowns and clean charts. Instead of dense text walls, every slide was designed for quick retention. It genuinely made my study sessions more productive and structured.",
      projectType: "Educational Slide & Content"
    },
    {
      id: "test_ip",
      name: "Md. Isradul Khan Plabon",
      role: "DU Student",
      company: "Dhaka University (DU)",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=IsradulPlabon",
      rating: 5,
      comment: "At Parahin Academy, the presentation slides and notes for HSC & Admission English were designed by Masum. The soft color palettes and clean typography made long lectures comfortable to read without eye strain. Having key concepts visually highlighted allowed us to grasp the essence of a lecture in seconds. He truly knows how design can serve effective learning.",
      projectType: "Academic Slide Design"
    },
    {
      id: "test_an",
      name: "Asif Uzzaman Naeem",
      role: "Creator & Digital Marketer",
      company: "Universidade de Lisboa, Portugal",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=AsifNaeem",
      rating: 5,
      comment: "Working with Masum on my YouTube channel artwork and visual branding was a seamless experience. He pays attention to pixel perfection and color harmony that immediately elevates brand perception. What stands out most is his patient approach—he doesn't rush through iterations until the final output meets exact brand guidelines. Exceptional craft.",
      projectType: "Branding & Channel Art"
    },
    {
      id: "test_tv_rifat",
      name: "Tanvir Ahmed Rifat",
      role: "Content Producer",
      company: "Raad Multimedia & Natok Hub",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=TanvirRifat",
      rating: 5,
      comment: "Working alongside Masum on the promotional key visual for our family drama 'Songsar-er Bondhon' was genuinely rewarding. He blended character cutouts with a warm sunset palette and custom emotional typography that reflected the story's soul. The moment we released the poster on social media, the audience response was overwhelming. A truly dedicated designer.",
      projectType: "Natok Poster Design",
      designImageUrl: "https://i.postimg.cc/j28Vv1VJ/Songsar-er-bondhon.jpg"
    },
    {
      id: "test_mh_dev",
      name: "Shahriar Alam Robin",
      role: "Co-Founder & Client",
      company: "NexaCraft Studio",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShahriarRobin",
      rating: 5,
      comment: "When a talented UI designer also happens to write high-performance React and Tailwind code, the results are outstanding. Masum built a modern glassmorphic dark interface for our web app with silky smooth motion and responsive layout. It achieved a 100/100 Google Lighthouse score with pristine code structure. My entire client team was thoroughly impressed.",
      projectType: "UI/UX & Web Development",
      designImageUrl: "https://i.postimg.cc/rsFF9mFd/fbd8b403-9dba-42c1-a984-1293f50492cd.jpg"
    },
    {
      id: "test_sa",
      name: "Siam Ahmed",
      role: "Creative Director",
      company: "Creative Canvas BD",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=SiamAhmed",
      rating: 5,
      comment: "A deep understanding of color theory, spacing, and brand identity shines through all of Masum 9T9's creative work. After he overhauled our agency's social media templates and channel graphics, our organic audience engagement saw a measurable boost. His ability to interpret brief requirements while adding thoughtful artistic touches makes him a go-to collaborator.",
      projectType: "Branding & Social Graphics"
    }
  ],
  achievements: [
    {
      id: "ach_1",
      number: 100,
      suffix: "+",
      label: "Completed Projects",
      iconName: "CheckCircle2"
    },
    {
      id: "ach_2",
      number: 50,
      suffix: "+",
      label: "Satisfied Clients",
      iconName: "Smile"
    },
    {
      id: "ach_3",
      number: 3,
      suffix: "+ Years",
      label: "Work Experience",
      iconName: "Award"
    },
    {
      id: "ach_4",
      number: 1000,
      suffix: "+",
      label: "Custom Art Assets",
      iconName: "Layers"
    },
    {
      id: "ach_5",
      number: 1200,
      suffix: "+",
      label: "Cups of Coffee ☕",
      iconName: "Coffee"
    }
  ],
  faqs: [
    {
      id: "faq_1",
      question: "How can I place a project order?",
      answer: "You can send project details via the contact form on the website, directly on WhatsApp (+8801303-623838), or by email (masum.9t9.gd@gmail.com). I will review your request immediately and respond with details.",
      category: "Order"
    },
    {
      id: "faq_2",
      question: "How long does it take to create a thumbnail or poster?",
      answer: "Usually 12 to 24 hours for YouTube thumbnails and 24 to 48 hours for poster art. Express delivery options are available for urgent projects.",
      category: "Turnaround"
    },
    {
      id: "faq_3",
      question: "What file formats will I receive?",
      answer: "Depending on your needs, high-resolution PNG, JPG, HD PDF, and source files (Photoshop PSD or Illustrator AI) are provided.",
      category: "Deliverables"
    },
    {
      id: "faq_4",
      question: "What if I need revisions on the design?",
      answer: "I offer unlimited revisions on every project until you are 100% satisfied with the outcome.",
      category: "Revisions"
    },
    {
      id: "faq_5",
      question: "What payment methods do you accept?",
      answer: "Payments can be made via Bkash, Nagad, Rocket, or Bank Transfer. A 50% advance may apply depending on the project type.",
      category: "Payment"
    }
  ],
  socials: {
    facebook: "https://www.facebook.com/masum.9t9.official",
    youtube: "https://www.youtube.com/@ParahinAcademy",
    telegram: "https://t.me/masum_9t9_official",
    whatsapp: "https://wa.me/8801303623838",
    email: "masum.9t9.gd@gmail.com",
    phone: "01303-623838",
    behance: "https://www.behance.net/masum_9t9_official",
    fiverr: "https://www.fiverr.com/sellers/masum9t9/",
    github: "https://github.com/masum-9t9/"
  },
  contact: {
    phone: "01303-623838",
    emailPrimary: "masum.9t9.gd@gmail.com",
    emailSecondary: "parahinacademy@gmail.com",
    telegramUsername: "@masum_9t9_official",
    whatsappNumber: "+8801303623838",
    location: "Satkhira, Khulna, Bangladesh",
    googleSheetScriptUrl: "https://script.google.com/macros/s/AKfycbybx_ey85GMFxDSMHXH3ljkaM4s4PRircG3XPOWVYjYkLTfwJJqFo85wnKzjsbR51FIfg/exec",
    telegramBotToken: (import.meta as unknown as { env: Record<string, string> }).env?.VITE_TELEGRAM_BOT_TOKEN || "",
    telegramChatId: (import.meta as unknown as { env: Record<string, string> }).env?.VITE_TELEGRAM_CHAT_ID || ""
  }
};
