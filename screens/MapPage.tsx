import React, { useEffect, useState } from 'react';
import { getItems } from '../services/storageService';
import { InventoryItem } from '../types';
import { useNavigate } from 'react-router-dom';

const MapPage: React.FC = () => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setItems(getItems());
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col font-sans overflow-hidden relative">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-start pointer-events-none">
                <div>
                     <h1 className="text-3xl font-black text-white drop-shadow-lg tracking-tight">Radar</h1>
                     <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <p className="text-xs font-bold text-green-400 tracking-widest uppercase">
                            Active • {items.length} Signals
                        </p>
                     </div>
                </div>
                <button onClick={() => navigate('/app/home')} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center pointer-events-auto active:scale-95 transition-transform">
                    <span className="material-icons text-white">home</span>
                </button>
            </div>

            {/* Radar UI */}
            <div className="flex-1 flex items-center justify-center relative">
                
                {/* Grid Lines */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                    <div className="w-[80vw] h-[80vw] border border-green-500 rounded-full"></div>
                    <div className="w-[60vw] h-[60vw] border border-green-500 rounded-full absolute"></div>
                    <div className="w-[40vw] h-[40vw] border border-green-500 rounded-full absolute"></div>
                    <div className="w-[20vw] h-[20vw] border border-green-500 rounded-full absolute"></div>
                    <div className="w-full h-[1px] bg-green-500 absolute"></div>
                    <div className="h-full w-[1px] bg-green-500 absolute"></div>
                </div>

                {/* Rotating Scanner */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[100vw] h-[100vw] rounded-full bg-gradient-to-r from-transparent via-green-500/10 to-green-500/40 animate-spin-slow origin-center" style={{ clipPath: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, white 360deg)' }}></div>
                </div>

                {/* Center (User) */}
                <div className="flex flex-col items-center justify-center z-10 relative">
                     <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
                    </div>
                    <div className="mt-1 px-1.5 py-0.5 bg-white/20 backdrop-blur rounded text-[8px] font-bold text-white tracking-wider border border-white/10">YOU</div>
                </div>

                {/* Items as Blips */}
                {items.map((item, index) => {
                     // Generate pseudo-random polar coordinates for consistent placement
                     const angle = (item.name.charCodeAt(0) * 17) % 360;
                     const distance = 20 + ((item.name.charCodeAt(1) * 13) % 35); // 20% to 55% from center
                     
                     return (
                         <div 
                            key={item.id}
                            onClick={() => navigate(`/app/item/${item.id}`)}
                            className="absolute flex flex-col items-center justify-center cursor-pointer z-20 group"
                            style={{ 
                                transform: `rotate(${angle}deg) translate(${distance}vw) rotate(-${angle}deg)` 
                            }}
                         >
                            <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80] group-hover:bg-white transition-colors animate-pulse"></div>
                            {/* Always visible label */}
                            <div className="mt-2 px-2 py-1 bg-black/80 backdrop-blur text-green-400 text-[10px] font-bold rounded border border-green-500/30 whitespace-nowrap z-30 shadow-sm pointer-events-none">
                                {item.name}
                            </div>
                         </div>
                     );
                 })}
            </div>

            {/* Bottom Panel */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="bg-slate-800/90 backdrop-blur border border-slate-700 p-4 rounded-2xl flex items-center justify-between shadow-xl">
                    <div>
                        <p className="text-gray-400 text-xs font-medium">Nearest Item</p>
                        <p className="text-white font-bold">{items.length > 0 ? items[0].name : 'None'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 text-xs font-medium">Range</p>
                        <p className="text-green-400 font-bold">50m</p>
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 4s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default MapPage;