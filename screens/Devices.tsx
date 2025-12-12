import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InventoryItem } from '../types';
import { getItems, deleteItem } from '../services/storageService';

const Devices: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(getItems());
  }, []);

  const handleUnpair = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Unpair this device? It will be removed from your list.')) {
      deleteItem(id);
      setItems(getItems());
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] pb-24 font-sans">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-3xl font-bold text-dark mb-2">My Devices</h1>
        <p className="text-gray-500 text-sm">Manage your paired trackers.</p>
      </div>

      <div className="px-6 space-y-4">
        {items.length === 0 ? (
           <div className="text-center py-10 opacity-50">
               <span className="material-icons text-4xl mb-2">sensors_off</span>
               <p>No devices paired.</p>
           </div>
        ) : (
            items.map((item, idx) => {
                // Mock status simulation
                const isConnected = idx % 3 !== 2; // Every 3rd item simulated as disconnected
                const battery = isConnected ? Math.floor(Math.random() * 60 + 40) : 0;
                const signal = Math.floor(Math.random() * 4); // 0-3 bars
                
                return (
                    <div key={item.id} onClick={() => navigate(`/app/item/${item.id}`)} className="bg-white rounded-[24px] p-5 shadow-sm active:scale-[0.98] transition-transform relative overflow-hidden group">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden shrink-0">
                                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-dark text-lg leading-tight">{item.name}</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`}></div>
                                        <span className={`text-xs font-bold ${isConnected ? 'text-green-600' : 'text-red-400'}`}>
                                            {isConnected ? 'Connected' : 'Disconnected'}
                                        </span>
                                    </div>
                                    
                                    {isConnected && (
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <span className="material-icons text-[14px] rotate-90">battery_std</span>
                                                <span className="text-[10px] font-bold">{battery}%</span>
                                            </div>
                                            <div className="flex items-end gap-0.5 h-3">
                                                {[0,1,2].map(bar => (
                                                    <div key={bar} className={`w-1 rounded-sm ${bar <= signal ? 'bg-primary' : 'bg-gray-200'}`} style={{height: `${(bar+1)*30}%`}}></div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <button 
                                onClick={(e) => handleUnpair(e, item.id)}
                                className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors z-10"
                            >
                                <span className="material-icons text-[18px]">link_off</span>
                            </button>
                        </div>
                    </div>
                );
            })
        )}
        
        <button 
            onClick={() => navigate('/app/add')}
            className="w-full py-5 rounded-[24px] border-2 border-dashed border-gray-300 text-gray-400 font-bold flex items-center justify-center gap-2 hover:bg-white hover:border-blue-200 hover:text-primary transition-all active:scale-[0.99]"
        >
            <span className="material-icons">add_circle_outline</span>
            Add New Item
        </button>
      </div>
    </div>
  );
};

export default Devices;