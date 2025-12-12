import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setVisited } from '../services/storageService';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    setVisited();
    navigate('/app/home');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-dark overflow-x-hidden selection:bg-blue-100">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-5 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-icons text-2xl">inventory_2</span>
          <span className="font-bold text-xl tracking-tight text-dark">MemoryBox</span>
        </div>
        <button 
          onClick={handleStart}
          className="bg-blue-50 text-primary px-5 py-2 rounded-full font-bold text-sm hover:bg-blue-100 transition-colors"
        >
          Get App
        </button>
      </nav>

      {/* Hero Section */}
      <header className="px-6 pt-6 pb-12 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider mb-6">
          <span className="material-icons text-[12px]">security</span>
          PRIVACY FOCUSED
        </div>
        
        <h1 className="text-[40px] md:text-5xl font-black text-dark mb-6 leading-[1.1]">
          Never Forget Where You Left Anything Again.
        </h1>
        
        <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-md">
          The offline anti-loss tracker that respects your privacy. No cloud, just memory. Securely store locations directly on your device.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-8">
           <button className="flex-1 sm:flex-none bg-primary text-white h-14 px-8 rounded-full font-bold shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3 active:scale-95 transition-transform">
              <span className="material-icons text-2xl">android</span>
              <div className="text-left leading-none">
                 <div className="text-[9px] uppercase opacity-80 font-semibold mb-0.5">Download on</div>
                 <div className="text-sm font-bold">Android</div>
              </div>
           </button>
           <button 
             onClick={handleStart}
             className="flex-1 sm:flex-none bg-gray-50 text-dark h-14 px-8 rounded-full font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform hover:bg-gray-100"
            >
              <span className="material-icons text-2xl text-gray-600">language</span>
              <div className="text-left leading-none">
                 <div className="text-[9px] uppercase text-gray-500 font-semibold mb-0.5">Use Online</div>
                 <div className="text-sm font-bold">Web App</div>
              </div>
           </button>
        </div>

        <div className="flex items-center gap-3">
           <div className="flex -space-x-3">
              {[1, 5, 8].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                    <img src={`https://i.pravatar.cc/100?img=${i}`} alt="User" className="w-full h-full object-cover" />
                  </div>
              ))}
           </div>
           <span className="text-sm text-gray-500 font-medium">Trusted by 10,000+ users</span>
        </div>
      </header>

      {/* Phone Mockup */}
      <div className="px-6 mb-24 flex justify-center">
        <div className="relative w-full max-w-[300px] aspect-[9/19] bg-dark rounded-[48px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.4)] border-[8px] border-dark overflow-hidden ring-1 ring-gray-900/50 transform rotate-1 hover:rotate-0 transition-transform duration-500">
           {/* Screen Content */}
           <div className="w-full h-full bg-white relative flex flex-col">
              {/* Fake Status Bar */}
              <div className="h-7 w-full bg-white/90 backdrop-blur absolute top-0 z-20 flex justify-between px-6 items-center">
                 <div className="w-12 h-4 bg-black rounded-full mx-auto -mt-2"></div>
              </div>
              
              {/* Map Background */}
              <div className="absolute inset-0 bg-blue-50 overflow-hidden">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/e/ec/OpenStreetMap_Standard_Tile_Layer.png" 
                    className="w-full h-full object-cover opacity-80 grayscale-[20%]"
                    alt="Map"
                />
              </div>
              
              {/* Pins */}
              <div className="absolute top-[30%] left-[30%] text-red-500 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg animate-bounce">
                 <span className="material-icons text-4xl">location_on</span>
              </div>
              <div className="absolute top-[45%] right-[25%] text-orange-500 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg">
                 <span className="material-icons text-4xl">location_on</span>
              </div>
              
              {/* Bottom Card */}
              <div className="absolute bottom-6 left-4 right-4 bg-white/90 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3.5">
                 <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                    <span className="material-icons text-sm">vpn_key</span>
                 </div>
                 <div>
                    <h3 className="font-bold text-dark text-sm">Keys found</h3>
                    <p className="text-[10px] text-gray-500 font-medium">Last seen: Living Room, 2m ago</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Features */}
      <section className="px-6 py-16 bg-[#F8F9FE] rounded-t-[48px]">
        <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-black text-dark mb-3 tracking-tight">Why MemoryBox?</h2>
            <p className="text-gray-500 mb-10 text-lg">Built for peace of mind, engineered for efficiency.</p>

            <div className="space-y-4">
               <FeatureCard 
                 icon="verified_user" 
                 color="text-blue-600"
                 bg="bg-blue-100"
                 title="Offline First" 
                 desc="Your data stays strictly on your device. We don't upload your location history to any cloud server." 
               />
               <FeatureCard 
                 icon="notifications_active" 
                 color="text-blue-600"
                 bg="bg-blue-100"
                 title="Smart Alerts" 
                 desc="Get instant notifications on your watch or phone before you walk too far away from your items." 
               />
               <FeatureCard 
                 icon="battery_saver" 
                 color="text-blue-600"
                 bg="bg-blue-100"
                 title="Battery Efficient" 
                 desc="Optimized for all-day background usage. Less than 1% battery drain per day on average." 
               />
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-black text-dark mb-12 text-center leading-tight tracking-tight">Loved by privacy<br/>advocates</h2>
            
            <div className="space-y-6">
                <TestimonialCard 
                    img="11"
                    name="Alex M."
                    time="2 days ago"
                    quote="Saved me from losing my keys twice this week! Best tracker I've used because it actually works without needing an internet connection."
                />
                <TestimonialCard 
                    img="32"
                    name="Sarah L."
                    time="1 week ago"
                    quote="Finally, a tracker that doesn't track *me*. I love the focus on privacy and that the code is open source. Huge plus!"
                />
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white px-6 py-16 rounded-t-[48px]">
         <div className="max-w-md mx-auto text-center">
            <div className="inline-block bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold mb-8 border border-white/10 tracking-wide text-blue-200">
                Open Source Project
            </div>
            
            <h2 className="text-3xl font-black mb-4 tracking-tight">Support Open Source</h2>
            <p className="text-gray-400 mb-10 text-sm leading-relaxed max-w-xs mx-auto">
                MemoryBox is free and open source. We rely on community support to keep the lights on and the code clean.
            </p>

            <div className="space-y-3 mb-16">
                <button className="w-full bg-white text-dark font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg active:scale-[0.98]">
                    <span className="material-icons text-pink-500">favorite</span>
                    Donate via PayPal
                </button>
                <button className="w-full bg-white/5 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors border border-white/10 active:scale-[0.98]">
                    <span className="material-icons text-amber-300">local_cafe</span>
                    Buy us a coffee
                </button>
            </div>

            <div className="flex flex-col items-center gap-8 border-t border-white/10 pt-10">
                <div className="flex items-center gap-2 opacity-90">
                    <span className="material-icons text-blue-500">inventory_2</span>
                    <span className="font-bold text-lg">MemoryBox Guardian</span>
                </div>
                
                <div className="flex gap-6 text-xs text-gray-400 font-medium">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">GitHub</a>
                </div>
                
                <p className="text-[10px] text-gray-600">© 2023 MemoryBox Guardian. All rights reserved.</p>
            </div>
         </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, color, bg, title, desc }: any) => (
  <div className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-50/50">
     <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center ${color} mb-4`}>
        <span className="material-icons">{icon}</span>
     </div>
     <h3 className="font-bold text-dark text-lg mb-2">{title}</h3>
     <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const TestimonialCard = ({ img, name, time, quote }: any) => (
    <div className="bg-gray-50 p-6 rounded-[28px] border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
            <img src={`https://i.pravatar.cc/100?img=${img}`} alt={name} className="w-10 h-10 rounded-full" />
            <div>
                <h4 className="font-bold text-dark text-sm">{name}</h4>
                <div className="flex text-blue-600 text-[10px]">
                    {[1,2,3,4,5].map(s => <span key={s} className="material-icons text-sm">star</span>)}
                    <span className="text-gray-400 ml-2 font-medium">{time}</span>
                </div>
            </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed italic">"{quote}"</p>
    </div>
);

export default Landing;