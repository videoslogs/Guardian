import React, { useState, useEffect } from 'react';
import { InventoryItem } from '../types';
import { getItems, getLocationIcon } from '../services/storageService';
import { useNavigate, useLocation } from 'react-router-dom';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<InventoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Restore from session storage if available
    const savedQuery = sessionStorage.getItem('search_query');
    if (savedQuery) {
        setQuery(savedQuery);
        performSearch(savedQuery);
    }
  }, []);

  const performSearch = (val: string) => {
      if (val.length > 0) {
        const allItems = getItems();
        const matched = allItems.filter(item => 
          item.name.toLowerCase().includes(val.toLowerCase()) ||
          item.category.toLowerCase().includes(val.toLowerCase()) ||
          item.notes.toLowerCase().includes(val.toLowerCase())
        );
        setResults(matched);
      } else {
        setResults([]);
      }
  };

  const handleSearch = (val: string) => {
    setQuery(val);
    sessionStorage.setItem('search_query', val);
    performSearch(val);
  };

  const getVisualState = (index: number) => {
    const modes = [
      { // Nearby / Active
        badge: 'Nearby',
        badgeClass: 'bg-blue-100 text-primary',
        signalIcon: 'wifi',
        signalClass: 'text-green-500',
        distance: '10m away',
        actionIcon: 'notifications',
        actionClass: 'bg-blue-100 text-primary'
      },
      { // Standard / Map
        badge: null,
        badgeClass: '',
        signalIcon: 'wifi_tethering',
        signalClass: 'text-yellow-500',
        distance: 'Last seen yesterday',
        actionIcon: 'map',
        actionClass: 'bg-gray-200 text-gray-700'
      },
      { // Offline
        badge: 'Offline',
        badgeClass: 'bg-gray-100 text-gray-400',
        signalIcon: 'wifi_off',
        signalClass: 'text-gray-400',
        distance: 'Disconnected',
        actionIcon: 'notifications_off',
        actionClass: 'bg-gray-100 text-gray-300'
      }
    ];
    return modes[index % modes.length];
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] pb-24 font-sans">
      {/* Header */}
      <div className="px-5 pt-6 pb-2 bg-[#F8F9FE] sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-2">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/app/home')} 
            className="w-10 h-10 -ml-2 flex items-center justify-center text-dark active:scale-90 transition-transform"
          >
            <span className="material-icons text-3xl">chevron_left</span>
          </button>

          {/* Search Input */}
          <div className="flex-1 relative">
            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input 
              type="text" 
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Keys" 
              className="w-full h-12 bg-white rounded-2xl pl-11 pr-10 text-dark font-semibold outline-none shadow-sm focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
              autoFocus
            />
            {query.length > 0 && (
              <button 
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center"
              >
                <span className="material-icons text-[14px]">close</span>
              </button>
            )}
          </div>

          {/* Filter Button */}
          <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-dark active:scale-95 transition-transform">
             <span className="material-icons text-dark">tune</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      {query.length > 0 && (
         <div className="px-6 mb-4">
            <p className="text-gray-500 font-medium text-[15px]">Found {results.length} items</p>
         </div>
      )}

      {/* Empty State */}
      {query.length === 0 && (
        <div className="flex flex-col items-center justify-center pt-20 px-10 text-center opacity-40">
           <span className="material-icons text-6xl mb-4">manage_search</span>
           <p className="font-medium text-lg">Type to find your items</p>
        </div>
      )}

      {/* List */}
      <div className="px-5 space-y-4">
        {results.map((item, index) => {
          const style = getVisualState(index);
          const locationIcon = getLocationIcon(item.location || 'Other');
          
          return (
            <div 
              key={item.id}
              onClick={() => navigate(`/app/item/${item.id}`)}
              className="bg-white rounded-[28px] p-3 pr-5 flex items-center shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-transform cursor-pointer"
            >
              {/* Image & Signal */}
              <div className="relative mr-4">
                <div className="w-[72px] h-[72px] rounded-[20px] overflow-hidden bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-[26px] h-[26px] bg-white rounded-full flex items-center justify-center shadow-sm border-[3px] border-white">
                    <span className={`material-icons text-[14px] ${style.signalClass}`}>
                        {style.signalIcon}
                    </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                   <h3 className="font-bold text-dark text-[17px] truncate leading-tight">
                     {item.name}
                   </h3>
                   {style.badge && (
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${style.badgeClass}`}>
                           {style.badge}
                       </span>
                   )}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-[13px] font-medium truncate">
                   <span className="material-icons text-sm text-gray-400">{locationIcon}</span>
                   <span>{item.location || 'Unknown'}</span>
                </div>
              </div>

              {/* Action Button */}
              <div 
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/app/item/${item.id}`);
                }}
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ml-2 ${style.actionClass}`}
              >
                  <span className="material-icons text-[20px]">{style.actionIcon}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;