export default function NotePage() {
  return (
    <div className="min-h-screen bg-[#0E0A07] text-[#FAF6F0] py-16 px-4 sm:px-8 max-w-4xl mx-auto font-sans">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#FF7A18]">✦ MASUM 9T9 ✦</h1>
        <p className="text-[#FFA053] mt-2 italic font-semibold">💌 A NOTE FOR DEVELOPERS AND USERS</p>
        <p className="text-sm text-[#A9A39A] mt-1">Welcome & Thank You for Downloading the Masum 9T9 Portfolio System</p>
      </div>

      <div className="bg-[#16100B] border border-[#FF7A18]/30 rounded-xl p-6 sm:p-8 space-y-6 shadow-lg shadow-[#FF7A18]/10">
        <section>
          <h2 className="text-xl font-bold text-[#FF7A18] border-b border-[#FF7A18]/20 pb-2 mb-3">👋 Welcome Message</h2>
          <p className="text-[#FAF6F0]/90 leading-relaxed">
            Hello there! Thank you for downloading and exploring my portfolio project repository. I am truly thrilled that you are taking the time to inspect or use my codebase. It means a lot to me as a designer and developer!
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#FF7A18] border-b border-[#FF7A18]/20 pb-2 mb-3">📌 Project Summary & Credits</h2>
          <ul className="space-y-2 text-sm text-[#FAF6F0]/80">
            <li><strong className="text-[#FFA053]">Owner & Lead Developer:</strong> Md. Masum Billah (Masum 9T9)</li>
            <li><strong className="text-[#FFA053]">Design System:</strong> Fiery Amber & Obsidian Dark Theme</li>
            <li><strong className="text-[#FFA053]">Core Stack:</strong> React 19, TypeScript 5.8, Tailwind CSS v4, Vite</li>
            <li><strong className="text-[#FFA053]">Official Web Portal:</strong> <a href="https://9t9.pro.bd" className="text-[#FF7A18] underline">9t9.pro.bd</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#FF7A18] border-b border-[#FF7A18]/20 pb-2 mb-3">💡 Quick Start Guide</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-[#FAF6F0]/80">
            <li>Run <code className="bg-[#0E0A07] px-2 py-0.5 rounded text-[#FFA053]">npm install</code></li>
            <li>Create a <code className="bg-[#0E0A07] px-2 py-0.5 rounded text-[#FFA053]">.env</code> file from <code className="bg-[#0E0A07] px-2 py-0.5 rounded text-[#FFA053]">.env.example</code></li>
            <li>Run <code className="bg-[#0E0A07] px-2 py-0.5 rounded text-[#FFA053]">npm run dev</code> for local server</li>
            <li>Run <code className="bg-[#0E0A07] px-2 py-0.5 rounded text-[#FFA053]">npm run build</code> for production</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#FF7A18] border-b border-[#FF7A18]/20 pb-2 mb-3">📞 Contact & Connect</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="https://9t9.pro.bd" className="text-[#FF7A18] hover:underline">Website</a>
            <a href="https://github.com/masum-9t9" className="text-[#FF7A18] hover:underline">GitHub</a>
            <a href="mailto:hello@9t9.pro.bd" className="text-[#FF7A18] hover:underline">Email</a>
            <a href="https://wa.me/8801303623838" className="text-[#FF7A18] hover:underline">WhatsApp</a>
          </div>
        </section>

        <div className="text-center pt-6 border-t border-[#FF7A18]/20 text-xs text-[#A9A39A]">
          <p>Copyright © 2026 Md. Masum Billah (Masum 9T9). All Rights Reserved.</p>
          <p className="mt-1 text-[#FFA053]">✦ Built with Passion, Precision, and Fire • Masum 9T9 ✦</p>
        </div>
      </div>
    </div>
  );
}