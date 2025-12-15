import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Category, InventoryItem } from '../types';
import { saveItem, updateItem, getItems, resizeImage, getSuggestions, getLocationOptions } from '../services/storageService';

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Living Room');
  const [category, setCategory] = useState<Category>(Category.MISC);
  const [notes, setNotes] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [isTrackable, setIsTrackable] = useState(true);
  const [createdAt, setCreatedAt] = useState<number>(Date.now());
  
  // Suggestion State
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const [showNameSuggestions, setShowNameSuggestions] = useState(false);
  
  // Toggle State (Visual only for now)
  const [verificationReminder, setVerificationReminder] = useState(false);
  const [notifyMoved, setNotifyMoved] = useState(true);

  const locationOptions = getLocationOptions();

  useEffect(() => {
    setNameSuggestions(getSuggestions('name'));
    
    if (id) {
        const items = getItems();
        const found = items.find(i => i.id === id);
        if (found) {
            setName(found.name);
            setImage(found.image);
            setLocation(found.location);
            setCategory(found.category);
            setNotes(found.notes);
            setSecretCode(found.secretCode || '');
            setIsTrackable(found.isTrackable !== false);
            setCreatedAt(found.createdAt);
        }
    }
  }, [id]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsAnalyzing(true);
      const file = e.target.files[0];
      
      const resizedBase64 = await resizeImage(file);
      setImage(resizedBase64);

      setTimeout(() => {
        setIsAnalyzing(false);
        if (!id) {
            const cats = Object.values(Category);
            const randomCat = cats[Math.floor(Math.random() * cats.length)];
            setCategory(randomCat);
        }
      }, 1500);
    }
  };

  const handleSave = () => {
    if (!name || !image) {
      alert('Please provide an image and a name.');
      return;
    }

    const newItem: InventoryItem = {
      id: id || Date.now().toString(),
      name,
      location,
      category, 
      notes,
      image,
      secretCode: secretCode || undefined,
      createdAt: createdAt,
      tags: [category.toLowerCase()],
      isTrackable
    };

    if (id) {
        updateItem(newItem);
    } else {
        saveItem(newItem);
    }
    
    // Simulate Verification Reminder Setup
    if (verificationReminder) {
        alert('Verification reminder set for 30 days from now.');
    }

    navigate(id ? '/app/manage' : '/app/home');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] font-sans pb-32">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 bg-[#F8F9FE] sticky top-0 z-10">
        <div className="flex items-center gap-3">
             <button onClick={() => navigate('/app/home')} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="material-icons text-dark text-sm">home</span>
             </button>
             <button onClick={() => navigate(-1)} className="text-gray-500 font-medium text-[15px]">
                Cancel
             </button>
        </div>
        <h2 className="font-bold text-dark text-lg">{id ? 'Edit Item' : 'Add New Item'}</h2>
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      <div className="px-6 space-y-6">
        
        {/* Photo Upload Area */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-square max-h-[340px] bg-white rounded-[32px] border-2 border-dashed border-blue-200 relative flex flex-col items-center justify-center cursor-pointer active:scale-[0.99] transition-transform overflow-hidden shadow-sm"
        >
          {image ? (
            <>
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                         <span className="material-icons animate-spin text-3xl mb-2">autorenew</span>
                         <p className="font-medium text-sm">AI Identifying...</p>
                    </div>
                )}
                {!isAnalyzing && (
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                        <span className="material-icons text-xs">auto_awesome</span>
                        {category}
                    </div>
                )}
            </>
          ) : (
            <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-primary">
                    <span className="material-icons text-3xl">add_a_photo</span>
                </div>
                <h3 className="text-dark font-bold text-base">Tap to add photo</h3>
                <p className="text-primary text-sm font-medium mt-1">Use AI to identify object</p>
                
                <div className="absolute bottom-4 right-4 bg-white border border-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <span className="material-icons text-primary text-sm">auto_awesome</span>
                    <span className="text-dark text-xs font-bold">AI Ready</span>
                </div>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
          />
        </div>

        {/* Item Name */}
        <div className="relative">
            <label className="block text-sm font-bold text-dark mb-2">Item Name</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={() => setShowNameSuggestions(true)}
              onBlur={() => setTimeout(() => setShowNameSuggestions(false), 200)}
              placeholder="e.g. My Blue Wallet"
              className="w-full p-4 bg-white rounded-2xl text-dark placeholder-gray-400 font-medium outline-none border border-transparent focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm"
              autoComplete="off"
            />
            {showNameSuggestions && nameSuggestions.length > 0 && (
                <div 
                    onMouseDown={(e) => e.preventDefault()}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-blue-50 z-20 overflow-hidden"
                >
                    {nameSuggestions.map((s, i) => (
                        <div 
                            key={i} 
                            onClick={() => {
                                setName(s);
                                setShowNameSuggestions(false);
                            }}
                            className="p-3 text-sm font-medium text-gray-600 border-b border-gray-50 last:border-0 hover:bg-blue-50 active:bg-blue-100 cursor-pointer flex items-center gap-2"
                        >
                            <span className="material-icons text-xs text-blue-300">history</span>
                            {s}
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Tracking Type Toggle */}
        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-gray-50">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isTrackable ? 'bg-blue-100 text-primary' : 'bg-gray-100 text-gray-400'}`}>
                    <span className="material-icons">{isTrackable ? 'bluetooth' : 'sensors_off'}</span>
                </div>
                <div>
                    <h3 className="font-bold text-dark text-sm">Bluetooth Tracker</h3>
                    <p className="text-xs text-gray-500">{isTrackable ? 'Item has a smart tag' : 'Standard item (Manual)'}</p>
                </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isTrackable} onChange={() => setIsTrackable(!isTrackable)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
        </div>

        {/* Visual Location Picker */}
        <div>
           <label className="block text-sm font-bold text-dark mb-2">Where is it?</label>
           
           {/* Manual Input */}
           <div className="relative mb-3">
               <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">place</span>
               <input 
                 type="text" 
                 value={location}
                 onChange={(e) => setLocation(e.target.value)}
                 placeholder="Select or type custom location..."
                 className="w-full p-4 pl-12 bg-white rounded-2xl text-dark placeholder-gray-400 font-medium outline-none border border-transparent focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm"
               />
           </div>

           <div className="overflow-x-auto no-scrollbar pb-2">
              <div className="flex space-x-3">
                 {locationOptions.map(loc => {
                     const isSelected = location === loc.label;
                     return (
                         <button
                            key={loc.label}
                            onClick={() => setLocation(loc.label)}
                            className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl border-2 transition-all flex-shrink-0 ${
                                isSelected 
                                ? 'border-primary bg-blue-50 text-primary' 
                                : 'border-gray-100 bg-white text-gray-400 hover:border-blue-100'
                            }`}
                         >
                             <span className="material-icons text-2xl mb-1">{loc.icon}</span>
                             <span className="text-[10px] font-bold text-center leading-tight px-1">{loc.label}</span>
                         </button>
                     );
                 })}
              </div>
           </div>
        </div>

        {/* Notes */}
        <div>
            <label className="block text-sm font-bold text-dark mb-2">Notes</label>
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={4}
              placeholder="Describe the item or contents..."
              className="w-full p-4 bg-white rounded-2xl text-dark placeholder-gray-400 font-medium outline-none border border-transparent focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm resize-none"
            />
        </div>

        {/* Security & Alerts Card */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <span className="material-icons text-primary">security</span>
                <h3 className="font-bold text-dark text-base">Security & Alerts</h3>
            </div>
            
            <p className="text-xs text-gray-500 mb-6 leading-relaxed bg-blue-50 p-3 rounded-xl border border-blue-100">
                <span className="font-bold text-primary">How it works:</span> Security features help you monitor your items. 
                <br/>• <strong>Passcode:</strong> Hides details behind a pin.
                <br/>• <strong>Verification:</strong> Reminds you to physically check the item.
                <br/>• <strong>Moved Alert:</strong> Notifies you if GPS signal changes.
            </p>

            <div className="mb-6">
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-dark">Secret Code</label>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold">For sensitive items</span>
                </div>
                <input 
                    type="password" 
                    value={secretCode}
                    onChange={e => setSecretCode(e.target.value)}
                    placeholder="• • • •"
                    className="w-full p-3 bg-gray-100 rounded-xl text-dark font-bold tracking-widest outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all text-center"
                />
            </div>

            <div className="space-y-5">
                {/* Toggle 1 */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-dark">Verification Reminder</p>
                        <p className="text-xs text-blue-400">Remind me to check in 30 days</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={verificationReminder} onChange={() => setVerificationReminder(!verificationReminder)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>

                <div className="h-px bg-gray-50 w-full"></div>

                {/* Toggle 2 */}
                <div className={`flex items-center justify-between ${!isTrackable ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                    <div>
                         <p className="text-sm font-bold text-dark">Notify if moved</p>
                         <p className="text-xs text-blue-400">Uses GPS to detect position change</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={notifyMoved} onChange={() => setNotifyMoved(!notifyMoved)} className="sr-only peer" disabled={!isTrackable} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
            </div>
        </div>

      </div>

      {/* Floating Action Button (Main Save) */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F8F9FE] via-[#F8F9FE] to-transparent z-20">
          <button 
             onClick={handleSave}
             className="w-full bg-primary text-white font-bold h-14 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform text-[15px]"
          >
             <span className="material-icons">save</span>
             {id ? 'Update Item' : 'Save Item'}
          </button>
      </div>
    </div>
  );
};

export default AddItem;