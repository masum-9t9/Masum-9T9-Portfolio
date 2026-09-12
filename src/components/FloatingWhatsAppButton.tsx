import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FloatingWhatsAppButtonProps {
  whatsappNumber?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  whatsappNumber = '8801303623838'
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const handleSend = () => {
    const finalMsg = customMsg.trim() || (isBn ? 'Hello Masum 9T9! আমি আপনার সাথে একটি প্রজেক্ট নিয়ে কথা বলতে চাই।' : 'Hello Masum 9T9! I would like to discuss a design/web project with you.');
    const encoded = encodeURIComponent(finalMsg);
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-[20px] right-[20px] z-50 select-none lg:hidden">
      
      {/* Pop-up Quick Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="absolute bottom-16 right-0 w-[290px] sm:w-[340px] p-4 rounded-3xl bg-[#18120C] border border-[#FF7A18]/30 shadow-2xl shadow-black/80 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src="https://i.postimg.cc/bYQL7Lvj/Profile-pic-(3).png"
                    alt="Masum 9T9"
                    className="w-10 h-10 rounded-full object-cover border border-[#FF7A18]"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#18120C]" />
                </div>
                <div>
                  <div className="text-sm font-evantic font-bold text-[#FAF6F0]">Masum 9T9</div>
                  <div className="text-[11px] text-green-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span>{isBn ? 'অনলাইনে সক্রিয়' : 'Online & Ready'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#A9A39A] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bubble Message */}
            <div className="py-3">
              <div className="p-3 rounded-2xl bg-[#221710] border border-[#FF7A18]/20 text-xs text-[#FAF6F0] leading-relaxed">
                {isBn
                  ? 'আসসালামু আলাইকুম! 👋 নতুন প্রজেক্ট, থাম্বনেইল বা ওয়েবসাইট নিয়ে আলোচনা করতে এখনই মেসেজ দিন।'
                  : 'Hey there! 👋 Need a high-impact design or web project? Send me a quick WhatsApp note below!'}
              </div>
            </div>

            {/* Input & Send */}
            <div className="space-y-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder={isBn ? 'আপনার বার্তা লিখুন...' : 'Type your message...'}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#120D09] border border-white/10 text-xs text-[#FAF6F0] placeholder:text-[#A9A39A]/60 focus:outline-none focus:border-[#FF7A18]"
              />
              <button
                onClick={handleSend}
                className="btn-fiery-orange w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 uppercase tracking-wider shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isBn ? 'হোয়াটসঅ্যাপে পাঠান' : 'Chat on WhatsApp'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 rounded-full bg-[#18120C] border-2 border-[#25D366] text-white shadow-[0_4px_25px_rgba(37,211,102,0.4)] flex items-center justify-center cursor-pointer transition-all"
        title={isBn ? 'হোয়াটসঅ্যাপে কথা বলুন' : 'Chat on WhatsApp'}
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-ping pointer-events-none" />
        <i className="fa-brands fa-whatsapp text-2xl text-[#25D366] group-hover:scale-110 transition-transform" />
      </motion.button>

    </div>
  );
};
