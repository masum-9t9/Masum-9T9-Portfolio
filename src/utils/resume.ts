/**
 * Handles Viewing and Downloading Masum 9T9's Official Resume / CV
 * Supports both English and Bangla versions.
 */

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.body.appendChild(script);
  });
};

export const viewResume = (lang: 'bn' | 'en' = 'bn') => {
  window.open(`/resume.html?lang=${lang}`, '_blank', 'noopener,noreferrer');
};

export const downloadResume = async (lang: 'bn' | 'en' = 'bn') => {
  const isBangla = lang === 'bn';
  const fileName = isBangla ? 'Masum_9T9_Resume_Bangla.pdf' : 'Masum_9T9_Resume_English.pdf';

  const roles = isBangla
    ? "গ্রাফিক্স ডিজাইনার • UI/UX স্পেশালিস্ট • ফ্রন্টএন্ড ডেভেলপার • কন্টেন্ট ক্রিয়েটর"
    : "Senior Graphic Designer • UI/UX Specialist • Frontend Developer • Content Creator";

  const tagline = isBangla
    ? "ডিজিটাল ক্রিয়েটিভিটি ও কোডিং ইঞ্জিনিয়ারিংয়ের মেলবন্ধনে বিশ্বমানের ব্র্যান্ডিং, হাই-কনভার্টিং UI/UX এবং আধুনিক রিয়েক্ট ওয়েব অ্যাপ্লিকেশন তৈরি।"
    : "Bridging the gap between creative visual artistry and modern frontend engineering—delivering high-converting UI/UX, premium branding, and dynamic web apps.";

  const location = isBangla
    ? "সাতক্ষীরা / ঢাকা, বাংলাদেশ (রিমোটলি গ্লোবাল কাজ উপলব্ধ)"
    : "Sylhet / Dhaka, Bangladesh (Available Worldwide)";

  const summaryHdr = isBangla ? "প্রফেশনাল সামারি (Professional Summary)" : "Professional Summary";
  const summaryTxt = isBangla
    ? "গত ৩ বছরের বেশি সময় ধরে গ্রাফিক্স ডিজাইন, ইউআই/ইউএক্স ইন্টারফেস ডিজাইন, ফ্রন্টএন্ড ওয়েব ডেভেলপমেন্ট এবং কন্টেন্ট ক্রিয়েশনের ফিল্ডে সক্রিয়ভাবে কাজ করছি। আধুনিক ওয়েব স্ট্যাক (HTML5, CSS3, Tailwind CSS, JavaScript, React, Next.js) এবং ক্রিয়েটিভ ডিজাইন টুলস (Photoshop, Illustrator, Figma) ব্যবহারে পারদর্শী। ইউটিউব থাম্বনেইল সাইকোলজি ও হাই-কনভার্টিং ডিজিটাল ব্র্যান্ডিংয়ে অভিজ্ঞ। একইসাথে 'পাড়াহীন একাডেমি' প্ল্যাটফর্মের প্রতিষ্ঠাতা হিসেবে হাজারো লার্নারকে টেকনোলজি ও ক্রিয়েটিভ স্কিল শেখাতে প্রতিশ্রুতিবদ্ধ।"
    : "Experienced Creative Technologist with 3+ years of proven expertise in Graphic Design, UI/UX Systems, Frontend Web Development, and Digital Media Creation. Highly proficient in Adobe Creative Cloud (Photoshop, Illustrator), Figma, React, TypeScript, and Tailwind CSS. Recognized for high-CTR YouTube thumbnail psychology, intuitive conversion-driven web design, and educational leadership as Founder of Parahin Academy.";

  const expHdr = isBangla ? "কাজের অভিজ্ঞতা (Work Experience)" : "Work Experience";
  const skillsHdr = isBangla ? "দক্ষতা ও প্রযুক্তিগত জ্ঞান (Technical Skills)" : "Technical Skills & Competencies";
  const eduHdr = isBangla ? "শিক্ষা ও সার্টিফিকেশন (Education & Certifications)" : "Education & Certifications";
  const footerHdr = isBangla ? "অফিশিয়াল ভেরিফাইড পোর্টফোলিও লিংক" : "Official Verified Portfolio Links";

  // Create temporary container for PDF capture with the EXACT styling of public/resume.html
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '840px'; // Optimized high-resolution width for A4
  container.style.padding = '36px 36px 40px 36px';
  container.style.background = '#0E0A07';
  container.style.color = '#FAF6F0';
  container.style.fontFamily = "'Hind Siliguri', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
  container.style.boxSizing = 'border-box';
  container.style.lineHeight = '1.6';

  container.innerHTML = `
    <div style="background: #15100C; border: 1px solid #2D1E16; border-radius: 20px; padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.85);">
      
      <!-- Hero Header -->
      <div style="display: flex; align-items: center; gap: 24px; margin-bottom: 24px; border-bottom: 1px solid #2D1E16; padding-bottom: 24px;">
        <div style="width: 100px; height: 100px; flex-shrink: 0; position: relative;">
          <img
            src="https://i.postimg.cc/bYQL7Lvj/Profile-pic-(3).png"
            alt="Md. Masum Billah (Masum 9T9)"
            crossorigin="anonymous"
            style="width: 100%; height: 100%; border-radius: 20px; object-fit: cover; border: 2.5px solid #FF7A18; background: #1C1510; box-shadow: 0 0 20px rgba(255,122,24,0.35);"
          />
        </div>

        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 style="font-size: 28px; font-weight: 800; color: #FFFFFF; margin: 0; letter-spacing: -0.5px;">
              Md. Masum Billah
            </h1>
            <span style="font-size: 16px; font-weight: 700; color: #DFC29A; font-family: 'Evantic', serif;">(Masum 9T9)</span>
            <span style="color: #FF7A18; font-size: 18px; font-weight: bold;">✓</span>
          </div>

          <div style="font-size: 14px; font-weight: 700; color: #FF7A18; margin-top: 4px;">
            ${roles}
          </div>

          <div style="font-size: 12px; color: #A9A39A; margin-top: 6px; line-height: 1.45;">
            ${tagline}
          </div>
        </div>
      </div>

      <!-- Quick Contact Grid -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: #1D1510; border: 1px solid #2D1E16; border-radius: 12px; padding: 12px 16px; margin-bottom: 24px; font-size: 11.5px; color: #D8D2C8;">
        <div>📞 <strong style="color:#FAF6F0;">+880 1303-623838</strong></div>
        <div>✉️ <span style="color:#FAF6F0;">masum.9t9.gd@gmail.com</span></div>
        <div>🌐 <span style="color:#FF7A18; font-weight:700;">https://9t9.pro.bd</span></div>
        <div>📍 <span>${isBangla ? 'সাতক্ষীরা, বাংলাদেশ' : 'Dhaka / Satkhira, BD'}</span></div>
      </div>

      <!-- Stats Row -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 24px;">
        <div style="background: #19120D; border: 1px solid #2D1E16; border-radius: 12px; padding: 10px 14px; text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: #FFFFFF;">৩<span style="color: #FF7A18;">+</span> ${isBangla ? 'বছর' : 'Years'}</div>
          <div style="font-size: 11px; color: #A9A39A; margin-top: 2px;">${isBangla ? 'কাজের অভিজ্ঞতা' : 'Experience'}</div>
        </div>
        <div style="background: #19120D; border: 1px solid #2D1E16; border-radius: 12px; padding: 10px 14px; text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: #FFFFFF;">১০০<span style="color: #FF7A18;">+</span></div>
          <div style="font-size: 11px; color: #A9A39A; margin-top: 2px;">${isBangla ? 'সম্পন্ন প্রজেক্ট' : 'Projects Done'}</div>
        </div>
        <div style="background: #19120D; border: 1px solid #2D1E16; border-radius: 12px; padding: 10px 14px; text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: #FFFFFF;">৫০<span style="color: #FF7A18;">+</span></div>
          <div style="font-size: 11px; color: #A9A39A; margin-top: 2px;">${isBangla ? 'হ্যাপি ক্লায়েন্ট' : 'Happy Clients'}</div>
        </div>
        <div style="background: #19120D; border: 1px solid #2D1E16; border-radius: 12px; padding: 10px 14px; text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: #FFFFFF;">১০০<span style="color: #FF7A18;">%</span></div>
          <div style="font-size: 11px; color: #A9A39A; margin-top: 2px;">${isBangla ? 'ক্লায়েন্ট সন্তুষ্টি' : 'Satisfaction'}</div>
        </div>
      </div>

      <!-- Professional Summary -->
      <div style="margin-bottom: 22px;">
        <div style="font-size: 14px; font-weight: 800; color: #FAF6F0; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #2D1E16; padding-bottom: 6px;">
          <span style="width: 4px; height: 16px; background: #FF7A18; border-radius: 2px; display: inline-block;"></span>
          ${summaryHdr}
        </div>
        <p style="font-size: 11.5px; color: #D8D2C8; background: #1D1510; border: 1px solid #2D1E16; border-radius: 10px; padding: 12px 14px; margin: 0; text-align: justify; line-height: 1.6;">
          ${summaryTxt}
        </p>
      </div>

      <!-- Work Experience -->
      <div style="margin-bottom: 22px;">
        <div style="font-size: 14px; font-weight: 800; color: #FAF6F0; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #2D1E16; padding-bottom: 6px;">
          <span style="width: 4px; height: 16px; background: #FF7A18; border-radius: 2px; display: inline-block;"></span>
          ${expHdr}
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="background: #19120D; border: 1px solid #2D1E16; border-radius: 10px; padding: 10px 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12.5px; font-weight: 800; color: #FAF6F0;">${isBangla ? 'ফাউন্ডার ও লিড ক্রিয়েটর' : 'Founder & Lead Creator'} — <strong style="color:#FF7A18;">Parahin Academy</strong></span>
              <span style="font-size: 10.5px; font-weight: 700; color: #FF7A18; background: rgba(255,122,24,0.15); border: 1px solid rgba(255,122,24,0.3); padding: 2px 8px; border-radius: 6px;">2024 — ${isBangla ? 'বর্তমান' : 'Present'}</span>
            </div>
            <div style="font-size: 11px; color: #A9A39A; margin-top: 3px;">${isBangla ? 'টেক এডুকেশন এবং ডিজিটাল ক্রিয়েটিভিটি প্ল্যাটফর্ম পরিচালনা। শিক্ষার্থী ও উদ্যোক্তাদের জন্য আধুনিক ওয়েব কোডিং, গ্রাফিক্স ডিজাইন ও ডিজিটাল স্কিলের কোর্স ও টিউটোরিয়াল তৈরি।' : 'Directing an online tech education and creative media platform empowering thousands of learners in web coding, graphic design, and content creation.'}</div>
          </div>

          <div style="background: #19120D; border: 1px solid #2D1E16; border-radius: 10px; padding: 10px 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12.5px; font-weight: 800; color: #FAF6F0;">${isBangla ? 'সিনিয়র UI/UX ও গ্রাফিক্স ডিজাইনার' : 'Senior UI/UX & Graphic Designer'} — <strong style="color:#FF7A18;">Freelance & Agency</strong></span>
              <span style="font-size: 10.5px; font-weight: 700; color: #FF7A18; background: rgba(255,122,24,0.15); border: 1px solid rgba(255,122,24,0.3); padding: 2px 8px; border-radius: 6px;">2023 — ${isBangla ? 'বর্তমান' : 'Present'}</span>
            </div>
            <div style="font-size: 11px; color: #A9A39A; margin-top: 3px;">${isBangla ? 'দেশি ও আন্তর্জাতিক উদ্যোক্তা, ব্র্যান্ড এবং ইউটিউব ক্রিয়েটরদের জন্য হাই-সিটিআর থাম্বনেইল, সোশ্যাল মিডিয়া কিট, লোগো ব্র্যান্ডিং ও ফিগমা ইউআই সিস্টেম তৈরি।' : 'Designed high-CTR visual assets, brand identities, YouTube media packages, and Figma design systems for 50+ international businesses and creators.'}</div>
          </div>

          <div style="background: #19120D; border: 1px solid #2D1E16; border-radius: 10px; padding: 10px 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12.5px; font-weight: 800; color: #FAF6F0;">${isBangla ? 'ফ্রন্টএন্ড ওয়েব ডেভেলপার' : 'Frontend Web Developer'} — <strong style="color:#FF7A18;">Web & App Solutions</strong></span>
              <span style="font-size: 10.5px; font-weight: 700; color: #FF7A18; background: rgba(255,122,24,0.15); border: 1px solid rgba(255,122,24,0.3); padding: 2px 8px; border-radius: 6px;">2023 — ${isBangla ? 'বর্তমান' : 'Present'}</span>
            </div>
            <div style="font-size: 11px; color: #A9A39A; margin-top: 3px;">${isBangla ? 'React, TypeScript, Tailwind CSS ও আধুনিক এপিআই ব্যবহারের মাধ্যমে দ্রুতগতির, ফুললি রেসপন্সিভ এবং এসইও অপ্টিমাইজড ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট।' : 'Building lightning-fast, pixel-perfect, and fully responsive React web applications with clean TypeScript code and Tailwind styling.'}</div>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <div style="margin-bottom: 22px;">
        <div style="font-size: 14px; font-weight: 800; color: #FAF6F0; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #2D1E16; padding-bottom: 6px;">
          <span style="width: 4px; height: 16px; background: #FF7A18; border-radius: 2px; display: inline-block;"></span>
          ${skillsHdr}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div style="background: #19120D; border: 1px solid #2D1E16; border-radius: 10px; padding: 10px 12px;">
            <div style="font-size: 11.5px; font-weight: 700; color: #DFC29A; margin-bottom: 6px;">🎨 UI/UX & Graphics Design</div>
            <div style="display: flex; flex-wrap: wrap; gap: 5px;">
              <span style="background: rgba(255,122,24,0.15); border: 1px solid rgba(255,122,24,0.35); color: #FF7A18; font-size: 10.5px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">Figma UI System</span>
              <span style="background: rgba(255,122,24,0.15); border: 1px solid rgba(255,122,24,0.35); color: #FF7A18; font-size: 10.5px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">High-CTR Thumbnails</span>
              <span style="background: #120D09; border: 1px solid #2D1E16; color: #D8D2C8; font-size: 10.5px; font-weight: 600; padding: 3px 8px; border-radius: 6px;">Drama Poster Design</span>
              <span style="background: #120D09; border: 1px solid #2D1E16; color: #D8D2C8; font-size: 10.5px; font-weight: 600; padding: 3px 8px; border-radius: 6px;">Photoshop Compositing</span>
              <span style="background: #120D09; border: 1px solid #2D1E16; color: #D8D2C8; font-size: 10.5px; font-weight: 600; padding: 3px 8px; border-radius: 6px;">Vector Illustration</span>
            </div>
          </div>

          <div style="background: #19120D; border: 1px solid #2D1E16; border-radius: 10px; padding: 10px 12px;">
            <div style="font-size: 11.5px; font-weight: 700; color: #DFC29A; margin-bottom: 6px;">⚡ Frontend Web Stack & Tools</div>
            <div style="display: flex; flex-wrap: wrap; gap: 5px;">
              <span style="background: rgba(255,122,24,0.15); border: 1px solid rgba(255,122,24,0.35); color: #FF7A18; font-size: 10.5px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">React 19 & TypeScript</span>
              <span style="background: rgba(255,122,24,0.15); border: 1px solid rgba(255,122,24,0.35); color: #FF7A18; font-size: 10.5px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">Tailwind CSS v4</span>
              <span style="background: #120D09; border: 1px solid #2D1E16; color: #D8D2C8; font-size: 10.5px; font-weight: 600; padding: 3px 8px; border-radius: 6px;">JavaScript ES6+</span>
              <span style="background: #120D09; border: 1px solid #2D1E16; color: #D8D2C8; font-size: 10.5px; font-weight: 600; padding: 3px 8px; border-radius: 6px;">HTML5 & Modern CSS</span>
              <span style="background: #120D09; border: 1px solid #2D1E16; color: #D8D2C8; font-size: 10.5px; font-weight: 600; padding: 3px 8px; border-radius: 6px;">Git, GitHub & Vite</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Education & Footer Links -->
      <div style="border-top: 1px solid #2D1E16; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; background: #19120D; border-radius: 12px; padding: 14px 18px;">
        <div style="flex: 1; padding-right: 16px;">
          <div style="font-size: 12px; font-weight: 800; color: #FAF6F0; margin-bottom: 4px;">
            🎓 ${isBangla ? 'শিক্ষা:' : 'Education:'} <span style="color: #DFC29A; font-weight: normal;">B.A / Degree Pass Course, জাতীয় বিশ্ববিদ্যালয়</span>
          </div>
          <div style="font-size: 11px; color: #A9A39A; margin-bottom: 6px;">
            📜 ${isBangla ? 'সার্টিফিকেশন: UI/UX ডিজাইন, ক্রিয়েটিভ মিডিয়া আর্ট ও ফ্রন্টএন্ড ওয়েব ডেভেলপমেন্ট' : 'Certifications: UI/UX Design, Creative Media Arts & Modern Web Development'}
          </div>
          <div style="font-size: 10px; color: #A9A39A; font-family: monospace;">
            © 2026 Md. Masum Billah (Masum 9T9). Verified Portfolio: <strong style="color: #FF7A18;">https://9t9.pro.bd</strong>
          </div>
        </div>

        <div style="text-align: center; flex-shrink: 0; padding-left: 14px; border-left: 1px solid #2D1E16;">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?data=https://9t9.pro.bd&size=80x80"
            alt="QR Code"
            crossorigin="anonymous"
            style="width: 60px; height: 60px; border-radius: 8px; border: 1px solid #2D1E16; background: #FFFFFF; padding: 2px;"
          />
          <div style="font-size: 9px; font-weight: 700; color: #A9A39A; margin-top: 3px;">
            9t9.pro.bd
          </div>
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(container);

  try {
    await Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
    ]);

    const html2canvas = (window as any).html2canvas;
    const jsPDFModule = (window as any).jspdf;
    const PDFClass = jsPDFModule ? jsPDFModule.jsPDF : null;

    if (!html2canvas || !PDFClass) {
      window.open(`/resume.html?lang=${lang}&download=true`, '_blank');
      return;
    }

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#0E0A07'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new PDFClass('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);
  } catch (err) {
    console.error('Failed to generate PDF:', err);
    window.open(`/resume.html?lang=${lang}&download=true`, '_blank');
  } finally {
    document.body.removeChild(container);
  }
};

