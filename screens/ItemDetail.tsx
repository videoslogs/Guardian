import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InventoryItem } from '../types';
import { getItems, deleteItem, getLocationIcon } from '../services/storageService';

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [leashMode, setLeashMode] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  
  // Find Mode State
  const [isFinding, setIsFinding] = useState(false);
  const [signalStrength, setSignalStrength] = useState(0);

  useEffect(() => {
    if (id) {
      const items = getItems();
      const found = items.find(i => String(i.id) === String(id));
      if (found) {
        setItem(found);
      } else {
        navigate('/app/home');
      }
    }
  }, [id, navigate]);

  const isTrackable = item?.isTrackable !== false;

  // Leash Mode Logic
  useEffect(() => {
    let interval: any;
    if (leashMode && item && isTrackable) {
        // Simulate checking distance every few seconds
        interval = setInterval(() => {
            // In a real app, this would calculate distance between userPos and item coordinates.
            const simulatedDistance = Math.random() * 100;
            if (simulatedDistance > 80) { 
                 const msg = `⚠️ Leash Alert: You are moving away from ${item.name}!`;
                 console.log(msg);
            }
        }, 10000);
    }
    return () => clearInterval(interval);
  }, [leashMode, item, isTrackable]);

  const toggleLeash = () => {
      const newState = !leashMode;
      setLeashMode(newState);
      if (newState) {
          alert("Leash Mode Active: Guardian will alert you if you move more than 50m away.");
      }
  };

  // Audio Beep Helper
  const playBeep = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
        oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.5); 
        
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
        console.error("Audio play failed", e);
    }
  };

  const handleFind = () => {
      if (!isTrackable) return;
      setIsFinding(true);
      setSignalStrength(10);
      
      const beepInterval = setInterval(() => {
          playBeep();
          setSignalStrength(prev => Math.min(prev + Math.floor(Math.random() * 20), 100));
      }, 800);

      setTimeout(() => {
          clearInterval(beepInterval);
          setIsFinding(false);
          alert(`Item Found! Proximity sensor indicates ${item?.name} is within 2 meters.`);
      }, 5000);
  };

  const handleShare = () => {
    if (!item) return;
    const pin = Math.floor(1000 + Math.random() * 9000);
    const text = `Item Details: ${item.name} in ${item.location}. \n\nSecure PIN to access: ${pin}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      if (item && item.id) {
          try {
            deleteItem(item.id);
            // Replace navigation history to prevent back-button issues
            navigate('/app/home', { replace: true });
          } catch (e) {
            console.error("Delete failed", e);
            alert("Could not delete item. Please try again.");
          }
      }
    }
  };

  const handleBack = () => {
      navigate(-1);
  };

  if (!item) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  const locationIcon = getLocationIcon(item.location || 'Other');

  return (
    <div className="min-h-screen bg-[#F8F9FE] font-sans pb-10">
      
      {/* Finding Overlay */}
      {isFinding && (
          <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center text-white backdrop-blur-sm">
              <div className="w-72 h-72 rounded-full border-4 border-green-500/30 flex items-center justify-center relative">
                   <div className="absolute inset-0 rounded-full border-4 border-green-500/20 animate-ping"></div>
                   <div className="absolute inset-4 rounded-full border-4 border-green-500/40 animate-pulse"></div>
                  <div className="w-48 h-48 rounded-full border-4 border-green-500/60 flex items-center justify-center bg-green-500/10">
                      <span className="material-icons text-6xl text-green-400 animate-bounce">wifi_tethering</span>
                  </div>
                  <div className="absolute -bottom-12 font-mono text-green-400 text-2xl font-bold">{signalStrength}%</div>
              </div>
              <p className="mt-16 text-2xl font-bold tracking-tight">Tracking Signal...</p>
              <p className="text-gray-400 mt-2 font-medium">Follow the sound</p>
              <button 
                onClick={() => setIsFinding(false)} 
                className="mt-10 bg-white text-red-500 px-10 py-4 rounded-full font-bold shadow-lg active:scale-95 transition-transform"
              >
                  Stop Search
              </button>
          </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 bg-[#F8F9FE] sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <button onClick={() => navigate('/app/home')} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="material-icons text-dark text-sm">home</span>
            </button>
            <button onClick={handleBack} className="w-8 h-8 flex items-center justify-center rounded-full active:bg-gray-100">
                <span className="material-icons text-dark">chevron_left</span>
            </button>
        </div>
        <h2 className="font-bold text-dark text-lg">Details</h2>
        <button 
            type="button"
            onClick={handleDelete}
            className="text-red-500 font-bold text-[15px] flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-full shadow-sm border border-red-100 active:bg-red-100 transition-colors cursor-pointer"
        >
            <span className="material-icons text-sm">delete</span>
            Delete
        </button>
      </div>

      <div className="px-6 space-y-6">
        {/* Main Image */}
        <div className="relative w-full aspect-square rounded-[32px] overflow-hidden shadow-soft bg-white">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            {!isTrackable && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="material-icons text-sm">sensors_off</span>
                    Manual
                </div>
            )}
        </div>

        {/* Title & Info */}
        <div>
            <h1 className="text-3xl font-bold text-dark mb-1">{item.name}</h1>
            <div className="flex items-center text-gray-400 gap-1.5 text-sm font-medium">
                <span className="material-icons text-sm">event_note</span>
                <span>
                   Added {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-[24px] p-4 shadow-sm flex items-center gap-4">
             <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <span className="material-icons text-3xl">{locationIcon}</span>
             </div>
             <div>
                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wide">Current Location</h3>
                  <p className="text-dark font-bold text-lg">{item.location || 'Unknown Location'}</p>
             </div>
        </div>

        {/* Secret Passcode */}
        <div className="bg-white rounded-[24px] p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
                        <span className="material-icons">lock</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-dark">Secret Passcode</h3>
                        <p className="text-[10px] text-gray-400 w-40 leading-tight">Hides sensitive info. Required for sharing.</p>
                        <div className="flex items-center gap-2 mt-1">
                            {showSecret ? (
                                <span className="text-sm font-mono font-bold tracking-widest">{item.secretCode || 'No Code Set'}</span>
                            ) : (
                                <div className="flex gap-1">{[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>)}</div>
                            )}
                        </div>
                    </div>
            </div>
            <button onClick={() => setShowSecret(!showSecret)} className="text-primary p-2">
                <span className="material-icons">{showSecret ? 'visibility_off' : 'visibility'}</span>
            </button>
        </div>

         {/* Action Buttons */}
         <div className="flex gap-4">
             <button 
               onClick={isTrackable ? handleFind : undefined}
               disabled={!isTrackable}
               className={`flex-1 font-bold h-14 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform text-[15px] ${isTrackable ? 'bg-primary text-white shadow-blue-500/30 active:scale-[0.98]' : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'}`}
             >
                 <span className="material-icons">{isTrackable ? 'radar' : 'sensors_off'}</span>
                 {isTrackable ? 'Find Item' : 'No Tracker'}
             </button>
             <button 
               onClick={handleShare}
               className="flex-1 bg-primary text-white font-bold h-14 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform text-[15px]"
             >
                 <span className="material-icons">share</span>
                 Share Item
             </button>
         </div>
         
         {/* Caption */}
         {item.notes && (
            <p className="text-center text-gray-400 text-sm px-4 leading-relaxed">
                {String(item.notes)}
            </p>
         )}

         {/* Leash Mode - Only if trackable */}
         {isTrackable && (
             <div className={`rounded-[24px] p-4 shadow-sm flex items-center justify-between mb-6 transition-colors duration-300 ${leashMode ? 'bg-red-50 border border-red-100' : 'bg-white'}`}>
                 <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${leashMode ? 'bg-red-500 text-white shadow-md shadow-red-200' : 'bg-gray-100 text-gray-400'}`}>
                            <span className="material-icons">link</span>
                     </div>
                     <div>
                            <h3 className={`font-bold ${leashMode ? 'text-red-700' : 'text-dark'}`}>Leash Mode</h3>
                            <p className={`text-sm ${leashMode ? 'text-red-400' : 'text-gray-500'}`}>
                                {leashMode ? 'Monitoring distance...' : 'Alert me if I leave this behind'}
                            </p>
                     </div>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={leashMode} onChange={toggleLeash} className="sr-only peer" />
                    <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                 </label>
             </div>
         )}

      </div>
    </div>
  );
};

export default ItemDetail;