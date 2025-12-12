import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Help: React.FC = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filter, setFilter] = useState('All');

  const faqs = [
    {
      q: "How does offline tracking work?",
      a: "MemoryBox stores location data locally on your device's internal storage. We do not transmit coordinates to any external server."
    },
    {
      q: "What is the battery life of the Guardian?",
      a: "The Guardian app is optimized for low power consumption, typically using less than 1% of battery per day running in the background."
    },
    {
      q: "Is my location data stored on the cloud?",
      a: "No. Your data never leaves your phone unless you manually export a backup file."
    },
    {
      q: "My device isn't syncing.",
      a: "Ensure Bluetooth is enabled. If issues persist, try restarting the app or re-pairing the item in Settings."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FE] font-sans pb-10">
       {/* Header */}
       <div className="px-6 pt-6 pb-2 flex justify-between items-center bg-[#F8F9FE]">
          <div className="flex items-center gap-3">
             <button onClick={() => navigate('/app/home')} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="material-icons text-dark text-sm">home</span>
             </button>
             <h1 className="text-3xl font-bold text-dark tracking-tight">Help Center</h1>
          </div>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-dark">
             <span className="material-icons">chat_bubble</span>
          </button>
       </div>

       {/* Search */}
       <div className="px-6 py-4">
          <div className="relative shadow-sm">
             <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
             <input 
                type="text" 
                placeholder="How can we help you?"
                className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-dark placeholder-gray-400 font-medium outline-none border border-transparent focus:border-blue-200"
             />
          </div>
       </div>

       {/* Filters */}
       <div className="pl-6 mb-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-3 pr-6">
             {['All', 'General', 'Technical', 'Data & Privacy'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${
                     filter === f 
                     ? 'bg-primary text-white border-primary shadow-md shadow-blue-200' 
                     : 'bg-white text-gray-600 border-gray-100 shadow-sm'
                  }`}
                >
                   {f}
                </button>
             ))}
          </div>
       </div>

       {/* FAQs */}
       <div className="px-6 space-y-3 mb-8">
          {faqs.map((faq, idx) => (
             <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm transition-all border border-transparent hover:border-gray-100">
                <div 
                   className="flex justify-between items-center cursor-pointer" 
                   onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                   <h3 className="font-bold text-dark text-[15px] pr-4 leading-snug">{faq.q}</h3>
                   <span className={`material-icons text-gray-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}>
                      expand_more
                   </span>
                </div>
                {openIndex === idx && (
                   <div className="mt-3 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-3 animate-fade-in">
                      {faq.a}
                   </div>
                )}
             </div>
          ))}
       </div>

       {/* Contact Support Card */}
       <div className="px-6">
          <div className="bg-white rounded-[32px] p-8 text-center shadow-soft relative overflow-hidden">
             {/* Decorative Circle */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50/80 rounded-full"></div>
             
             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary relative z-10">
                <span className="material-icons text-3xl">headset_mic</span>
             </div>
             
             <h3 className="text-xl font-bold text-dark mb-2 relative z-10">Still need help?</h3>
             <p className="text-gray-500 text-sm mb-6 leading-relaxed relative z-10 max-w-[240px] mx-auto">
                Can't find the answer you're looking for? Reach out to our customer support team.
             </p>

             <button 
                onClick={() => window.location.href = "mailto:newshade87@gmail.com"}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2 relative z-10"
             >
                <span className="material-icons text-sm">email</span>
                Contact Support
             </button>
          </div>
       </div>
       
       <button onClick={() => navigate(-1)} className="mx-auto block mt-8 mb-6 text-gray-400 font-bold text-sm hover:text-dark transition-colors">
          Go Back
       </button>
    </div>
  );
};

export default Help;