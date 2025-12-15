import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setVisited } from '../services/storageService';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null);

  const handleStart = () => {
    setVisited();
    navigate('/app/home');
  };

  const openPaypal = () => {
      window.open('https://www.paypal.com/donate/?hosted_button_id=9AH5PHE6WXS5G', '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-dark overflow-x-hidden selection:bg-blue-100 relative">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 sticky top-0 bg-white/95 backdrop-blur z-50 shadow-sm border-b border-gray-50">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-icons text-2xl">inventory_2</span>
          <span className="font-bold text-xl tracking-tight text-dark">MemoryBox</span>
        </div>
        <button 
          className="bg-gray-100 text-gray-400 px-5 py-2 rounded-full font-bold text-xs cursor-not-allowed"
          disabled
        >
          App Coming Soon
        </button>
      </nav>

      {/* Hero Section */}
      <header className="px-6 pt-8 pb-8 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider mb-4">
          <span className="material-icons text-[12px]">security</span>
          PRIVACY FOCUSED
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-dark mb-4 leading-none tracking-tight">
          Never Forget Where You Left Anything.
        </h1>
        
        <p className="text-gray-500 text-base mb-6 leading-relaxed max-w-sm mx-auto">
          Offline anti-loss tracker. No cloud. Secure device storage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-8 justify-center">
           <button className="flex-1 sm:flex-none bg-gray-900 text-white h-12 px-6 rounded-full font-bold shadow-lg flex items-center justify-center gap-3 opacity-80 cursor-not-allowed">
              <span className="material-icons text-xl">android</span>
              <div className="text-left leading-none">
                 <div className="text-[8px] uppercase opacity-60 font-semibold mb-0.5">Coming Soon on</div>
                 <div className="text-xs font-bold">Android</div>
              </div>
           </button>
           <button 
             onClick={handleStart}
             className="flex-1 sm:flex-none bg-primary text-white h-12 px-6 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-blue-500/30"
            >
              <span className="material-icons text-xl">rocket_launch</span>
              <span className="text-sm">Launch Web App</span>
           </button>
        </div>

        {/* Compressed Trust Indicator */}
        <div className="flex items-center gap-2 justify-center opacity-80 scale-90">
           <div className="flex -space-x-2">
              {[1, 5, 8].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                    <img src={`https://i.pravatar.cc/100?img=${i}`} alt="User" className="w-full h-full object-cover" />
                  </div>
              ))}
           </div>
           <span className="text-xs text-gray-500 font-medium">Trusted by 10k+ users</span>
        </div>
      </header>

      {/* Phone Mockup - Smaller & Less Margin */}
      <div className="px-6 mb-10 flex justify-center">
        <div className="relative w-[220px] aspect-[9/18] bg-dark rounded-[32px] shadow-2xl border-[6px] border-dark overflow-hidden ring-1 ring-gray-900/50">
           {/* Screen Content */}
           <div className="w-full h-full bg-white relative flex flex-col">
              <div className="h-5 w-full bg-white/90 backdrop-blur absolute top-0 z-20 flex justify-center items-center">
                 <div className="w-8 h-3 bg-black rounded-full -mt-1"></div>
              </div>
              <div className="absolute inset-0 bg-blue-50">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/e/ec/OpenStreetMap_Standard_Tile_Layer.png" 
                    className="w-full h-full object-cover opacity-60 grayscale-[20%]"
                    alt="Map"
                />
              </div>
              <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                 <div className="w-16 h-16 bg-blue-500/20 rounded-full animate-ping absolute inset-0"></div>
                 <div className="w-16 h-16 bg-blue-500/10 rounded-full animate-pulse absolute inset-0"></div>
                 <div className="bg-white p-2 rounded-full shadow-lg relative z-10">
                    <span className="material-icons text-primary text-2xl">vpn_key</span>
                 </div>
              </div>
              <div className="absolute bottom-4 left-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-white/50 flex items-center gap-2">
                 <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <span className="material-icons text-xs">check</span>
                 </div>
                 <div>
                    <h3 className="font-bold text-dark text-xs">Keys Found</h3>
                    <p className="text-[8px] text-gray-500">2 mins ago</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Features - Compact */}
      <section className="px-6 py-10 bg-[#F8F9FE] rounded-t-[40px]">
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-black text-dark mb-6 text-center">Why MemoryBox?</h2>
            <div className="grid gap-3">
               <FeatureCard 
                 icon="verified_user" 
                 color="text-blue-600"
                 bg="bg-blue-100"
                 title="Offline First" 
                 desc="Data stays on your device." 
               />
               <FeatureCard 
                 icon="notifications_active" 
                 color="text-orange-500"
                 bg="bg-orange-100"
                 title="Smart Alerts" 
                 desc="Instant proximity notifications." 
               />
            </div>
        </div>
      </section>

      {/* Footer - Compact */}
      <footer className="bg-[#0F172A] text-white px-6 py-10 rounded-t-[40px] -mt-6 pt-16 relative z-10">
         <div className="max-w-md mx-auto text-center">
            <h2 className="text-xl font-bold mb-2">Support Open Source</h2>
            <p className="text-gray-400 mb-6 text-xs max-w-xs mx-auto">
                MemoryBox is free and open source. Help us keep it that way.
            </p>

            <button 
                onClick={openPaypal}
                className="w-full bg-[#003087] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00256b] transition-colors shadow-lg active:scale-[0.98] mb-8"
            >
                <span className="material-icons text-white">favorite</span>
                Donate via PayPal
            </button>

            <div className="flex flex-col items-center gap-6 border-t border-white/10 pt-8">
                <div className="flex gap-6 text-xs text-gray-400 font-medium">
                    <button onClick={() => setModalContent('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
                    <button onClick={() => setModalContent('terms')} className="hover:text-white transition-colors">Terms of Service</button>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
                </div>
                <p className="text-[10px] text-gray-600">© 2023 MemoryBox Guardian.</p>
            </div>
         </div>
      </footer>

      {/* Modal for Privacy/Terms */}
      {modalContent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
           <div className="bg-white w-full max-w-md max-h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                  <h3 className="font-bold text-dark text-lg capitalize">{modalContent}</h3>
                  <button onClick={() => setModalContent(null)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <span className="material-icons text-dark text-sm">close</span>
                  </button>
              </div>
              <div className="p-6 overflow-y-auto text-sm text-gray-600 leading-relaxed space-y-4">
                  {modalContent === 'privacy' ? (
                      <>
                        <p><strong>Last Updated: October 26, 2023</strong></p>
                        <p>At MemoryBox Guardian, we take your privacy seriously. This Privacy Policy explains how we handle your data.</p>
                        <h4 className="font-bold text-dark">1. Data Storage</h4>
                        <p>All data created by MemoryBox Guardian (including item photos, names, locations, and notes) is stored 100% locally on your device using browser LocalStorage and IndexedDB. We do not operate a backend server to store your personal inventory data.</p>
                        <h4 className="font-bold text-dark">2. Analytics</h4>
                        <p>We do not track your usage, location, or personal identity.</p>
                        <h4 className="font-bold text-dark">3. Camera Access</h4>
                        <p>The app requires camera access solely for the purpose of taking photos of your items to store locally. These images are not transmitted to us.</p>
                      </>
                  ) : (
                      <>
                        <h4 className="font-bold text-dark">1. Acceptance of Terms</h4>
                        <p>By accessing and using MemoryBox Guardian, you accept and agree to be bound by the terms and provision of this agreement.</p>
                        <h4 className="font-bold text-dark">2. Use License</h4>
                        <p>MemoryBox Guardian is open-source software. You are free to use it for personal or commercial purposes under the MIT License.</p>
                        <h4 className="font-bold text-dark">3. Disclaimer</h4>
                        <p>The materials on MemoryBox Guardian are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.</p>
                      </>
                  )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, color, bg, title, desc }: any) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4">
     <div className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center ${color} shrink-0`}>
        <span className="material-icons text-xl">{icon}</span>
     </div>
     <div>
        <h3 className="font-bold text-dark text-sm">{title}</h3>
        <p className="text-gray-500 text-xs leading-tight">{desc}</p>
     </div>
  </div>
);

export default Landing;