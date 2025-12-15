import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InventoryItem } from '../types';
import { getItems, deleteItem, getLocationIcon } from '../services/storageService';

const ManageItems: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(getItems());
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    // Explicitly stop propagation to prevent navigation
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this item permanently?')) {
      deleteItem(id);
      // Update state locally to immediately reflect changes
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleEdit = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/app/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] pb-24 font-sans">
      <div className="px-6 pt-6 pb-4 bg-[#F8F9FE] sticky top-0 z-10 flex items-center gap-3 shadow-sm">
        <button onClick={() => navigate('/app/home')} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform">
            <span className="material-icons text-dark text-sm">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold text-dark">Manage Inventory</h1>
      </div>

      <div className="px-6 space-y-3 mt-2">
        {items.length === 0 && (
            <div className="text-center py-20 opacity-50">
                <p>No items found.</p>
            </div>
        )}
        {items.map((item) => (
          <div key={item.id} className="relative bg-white p-3 rounded-2xl shadow-sm flex items-center gap-3 active:scale-[0.99] transition-transform">
            
            {/* Clickable Overlay for Navigation - Prevents conflict with buttons */}
            <div 
                className="absolute inset-0 z-0 cursor-pointer" 
                onClick={() => navigate(`/app/item/${item.id}`)}
            ></div>

            <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0 relative z-0 pointer-events-none">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 min-w-0 relative z-0 pointer-events-none">
                <h3 className="font-bold text-dark text-sm truncate">{item.name}</h3>
                
                <div className="flex flex-col gap-0.5 mt-1">
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <span className="material-icons text-[12px]">{getLocationIcon(item.location)}</span>
                        <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-[10px] font-medium">
                        <span className="material-icons text-[10px]">event</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>

                {item.isTrackable === false && (
                    <span className="inline-block mt-1.5 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-bold rounded">MANUAL</span>
                )}
            </div>

            <div className="flex items-center gap-2 relative z-10">
                <button 
                    type="button"
                    onClick={(e) => handleEdit(e, item.id)}
                    className="w-9 h-9 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center active:bg-blue-100 transition-colors shadow-sm border border-blue-100 cursor-pointer"
                >
                    <span className="material-icons text-[18px]">edit</span>
                </button>
                <button 
                    type="button"
                    onClick={(e) => handleDelete(e, item.id)}
                    className="w-9 h-9 bg-red-50 text-red-500 rounded-full flex items-center justify-center active:bg-red-100 transition-colors shadow-sm border border-red-100 cursor-pointer"
                >
                    <span className="material-icons text-[18px]">delete</span>
                </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="fixed bottom-6 right-6 z-20">
          <button 
             onClick={() => navigate('/app/add')}
             className="w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center active:scale-90 transition-transform"
          >
              <span className="material-icons text-2xl">add</span>
          </button>
      </div>
    </div>
  );
};

export default ManageItems;