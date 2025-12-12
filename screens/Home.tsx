import React, { useEffect, useState } from 'react';
import { InventoryItem, Category } from '../types';
import { getItems, getSuggestions, getLocationIcon } from '../services/storageService';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(getItems());
  }, []);

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(i => i.category === filter);

  // Categories for the filter chips
  const displayCategories = [
    { label: 'All', icon: 'grid_view', val: 'All' },
    { label: 'Home', icon: 'home', val: Category.HOME },
    { label: 'Office', icon: 'work', val: Category.WORK },
    { label: 'Bag', icon: 'backpack', val: Category.BAG },
    { label: 'Car', icon: 'directions_car', val: Category.CAR },
    { label: 'Misc', icon: 'category', val: Category.MISC },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FE] pb-24">
      {/* Custom Header */}
      <div className="px-6 pt-8 pb-4 bg-[#F8F9FE]">
        <div className="flex justify-between items-center mb-6 relative">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-primary">
               <span className="material-icons text-xl">shield</span>
             </div>
             <span className="text-xl font-bold text-dark tracking-tight">Guardian</span>
           </div>
           
           {/* Notification Bell */}
           <button 
             onClick={() => setShowNotifications(!showNotifications)} 
             className="relative p-2 active:bg-gray-100 rounded-full transition-colors"
           >
             <span className="material-icons text-dark">notifications</span>
             <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F8F9FE]"></span>
           </button>

           {/* Notification Dropdown */}
           {showNotifications && (
             <div className="absolute top-12 right-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-fade-in">
               <h4 className="font-bold text-sm mb-3 text-dark">Alerts</h4>
               <div className="space-y-3">
                 <div className="flex gap-3 items-start">
                   <div className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full shrink-0"></div>
                   <div>
                     <p className="text-xs font-medium text-dark">Backup Reminder</p>
                     <p className="text-[10px] text-gray-400">Please export your data regularly.</p>
                   </div>
                 </div>
                 <div className="flex gap-3 items-start">
                   <div className="w-2 h-2 mt-1.5 bg-green-500 rounded-full shrink-0"></div>
                   <div>
                     <p className="text-xs font-medium text-dark">System Active</p>
                     <p className="text-[10px] text-gray-400">Offline tracking is running.</p>
                   </div>
                 </div>
               </div>
               <div className="mt-3 pt-2 border-t border-gray-50 text-center">
                 <button onClick={() => setShowNotifications(false)} className="text-xs text-primary font-bold">Close</button>
               </div>
             </div>
           )}
        </div>

        <h1 className="text-3xl font-bold text-dark mb-6 leading-tight">
          What are you<br />looking for today?
        </h1>

        {/* Search Bar */}
        <div className="relative shadow-sm">
          <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
          <input 
            type="text" 
            placeholder="Find keys, wallet, or bag..."
            className="w-full bg-white rounded-full py-4 pl-12 pr-12 outline-none text-dark placeholder-gray-400 font-medium shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
            onClick={() => navigate('/app/search')}
            readOnly
          />
          <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">mic</span>
        </div>
      </div>

      {/* Categories */}
      <div className="pl-6 mb-8 overflow-x-auto no-scrollbar">
        <div className="flex space-x-3 pr-6">
            {displayCategories.map(cat => (
                <button
                    key={cat.label}
                    onClick={() => setFilter(cat.val as any)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all shadow-sm ${
                        filter === cat.val 
                        ? 'bg-primary text-white shadow-blue-200' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <span className="material-icons text-[18px]">{cat.icon}</span>
                    {cat.label}
                </button>
            ))}
        </div>
      </div>

      {/* My Items Section */}
      <div className="px-6 mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-dark">My Items</h2>
        <button 
          onClick={() => navigate('/app/search')} 
          className="text-primary font-semibold text-sm flex items-center"
        >
          Manage <span className="material-icons text-sm ml-1">chevron_right</span>
        </button>
      </div>

      {/* Grid */}
      <div className="px-6 grid grid-cols-2 gap-4">
        {filteredItems.map((item, index) => {
           // Mock visuals for aesthetics
           const battery = Math.floor(Math.random() * (100 - 40) + 40);
           const isOffline = index % 3 === 2; // Every 3rd item "offline" for demo
           const locationIcon = getLocationIcon(item.location || 'Other');
           
           return (
            <div 
                key={item.id} 
                className="bg-white rounded-[24px] p-3 shadow-soft active:scale-95 transition-transform" 
                onClick={() => navigate(`/app/item/${item.id}`)}
            >
                <div className="h-32 rounded-2xl bg-gray-100 relative overflow-hidden mb-3">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    
                    {/* Status Icon Overlay */}
                    <div className="absolute bottom-2 right-2 bg-white/90 w-8 h-8 rounded-full flex items-center justify-center shadow-sm backdrop-blur-sm">
                        <span className={`material-icons text-[16px] ${isOffline ? 'text-red-400' : 'text-primary'}`}>
                            {isOffline ? 'bluetooth_disabled' : 'bluetooth'}
                        </span>
                    </div>
                </div>
                
                <div className="px-1">
                    <h3 className="font-bold text-dark text-[15px] leading-tight mb-1 truncate">{item.name}</h3>
                    <div className="flex items-center gap-1 text-gray-500 mb-3">
                        <span className="material-icons text-[14px] text-gray-400">{locationIcon}</span>
                        <p className="text-xs truncate font-medium">
                            {item.location || 'Unknown'}
                        </p>
                    </div>

                    {/* Battery/Status Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-0.5">
                           {[1,2,3,4].map(bar => (
                               <div 
                                key={bar} 
                                className={`w-1 h-2.5 rounded-sm ${
                                    isOffline 
                                    ? 'bg-gray-200' 
                                    : (bar <= 3 ? 'bg-primary' : 'bg-blue-100')
                                }`}
                               ></div>
                           ))}
                        </div>
                        <span className={`text-[10px] font-bold ${isOffline ? 'text-gray-400' : 'text-gray-500'}`}>
                            {isOffline ? 'offline' : `${battery}%`}
                        </span>
                    </div>
                </div>
            </div>
           );
        })}

        {/* Add New Card (Always at the end) */}
        <div 
            onClick={() => navigate('/app/add')}
            className="rounded-[24px] border-2 border-dashed border-gray-300 bg-transparent flex flex-col items-center justify-center h-full min-h-[200px] active:bg-gray-50 transition-colors cursor-pointer"
        >
            <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                <span className="material-icons text-primary text-2xl">add</span>
            </div>
            <h3 className="font-bold text-dark text-[15px]">Add New</h3>
            <p className="text-xs text-primary font-medium mt-1">Pair a new tracker</p>
        </div>
      </div>
    </div>
  );
};

export default Home;