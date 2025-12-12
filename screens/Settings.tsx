import React, { useRef, useState, useEffect } from 'react';
import { exportData, importData, getSettings, saveSettings } from '../services/storageService';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState(getSettings());
  const [showExportOptions, setShowExportOptions] = useState(false);

  const toggleSetting = (key: string) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const setSensitivity = (val: 'Low' | 'Medium' | 'High') => {
      const newSettings = { ...settings, sensitivity: val };
      setSettings(newSettings);
      saveSettings(newSettings);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      importData(e.target.files[0], (success) => {
        if (success) {
          alert('Data imported successfully!');
          window.location.reload();
        } else {
          alert('Failed to import data. Invalid format.');
        }
      });
    }
  };

  const handleSupport = () => {
      window.location.href = "mailto:newshade87@gmail.com?subject=MemoryBox Support";
  };

  const handleShareApp = () => {
      if (navigator.share) {
          navigator.share({
              title: 'MemoryBox Guardian',
              text: 'Check out MemoryBox Guardian - the offline privacy tracker!',
              url: window.location.href
          });
      } else {
          alert('Share Link copied: ' + window.location.href);
      }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6 pb-32 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 mt-2">
        <h1 className="text-3xl font-bold text-dark">Settings</h1>
        <div className="bg-green-100 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-700 tracking-wide">GUARDIAN ACTIVE</span>
        </div>
      </div>

      <div className="space-y-8">
        
        {/* Data Guardian */}
        <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 pl-1">Data Guardian</h3>
            <div className="bg-white rounded-[24px] shadow-sm overflow-hidden">
                
                {/* Import */}
                <div onClick={handleImportClick} className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                            <span className="material-icons">cloud_download</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-dark text-[15px]">Import Backup</h4>
                            <p className="text-gray-400 text-xs font-medium">Restore from .json file</p>
                        </div>
                    </div>
                    <span className="material-icons text-gray-300">chevron_right</span>
                </div>

                <div className="h-px bg-gray-50 w-full ml-20"></div>

                {/* Export */}
                <div onClick={() => setShowExportOptions(!showExportOptions)} className="p-4 flex flex-col active:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                                <span className="material-icons">cloud_upload</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-dark text-[15px]">Export Data</h4>
                                <p className="text-gray-400 text-xs font-medium">Backup your items</p>
                            </div>
                        </div>
                        <span className={`material-icons text-gray-300 transition-transform ${showExportOptions ? 'rotate-90' : ''}`}>chevron_right</span>
                    </div>
                    
                    {/* Export Sub-options */}
                    {showExportOptions && (
                        <div className="mt-4 flex gap-2 pl-16 overflow-x-auto">
                            <button onClick={(e) => { e.stopPropagation(); exportData('json'); }} className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-bold text-dark hover:bg-blue-100">JSON (Backup)</button>
                            <button onClick={(e) => { e.stopPropagation(); exportData('csv'); }} className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-bold text-dark hover:bg-green-100">Excel (CSV)</button>
                            <button onClick={(e) => { e.stopPropagation(); exportData('txt'); }} className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-bold text-dark hover:bg-orange-100">Text Notes</button>
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* Notifications */}
        <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 pl-1">Notifications</h3>
            <div className="bg-white rounded-[24px] shadow-sm overflow-hidden">
                
                {/* Push Alerts */}
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                            <span className="material-icons">notifications_active</span>
                        </div>
                        <h4 className="font-bold text-dark text-[15px]">Push Alerts</h4>
                    </div>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={settings.pushAlerts} onChange={() => toggleSetting('pushAlerts')} className="sr-only peer" />
                        <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>

                <div className="h-px bg-gray-50 w-full ml-20"></div>

                {/* Sound Effects */}
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                            <span className="material-icons">volume_up</span>
                        </div>
                        <h4 className="font-bold text-dark text-[15px]">Sound Effects</h4>
                    </div>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={settings.soundEffects} onChange={() => toggleSetting('soundEffects')} className="sr-only peer" />
                        <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
            </div>
        </section>

        {/* Tracker Sensitivity */}
        <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 pl-1">Tracker Sensitivity</h3>
            <div className="bg-white rounded-[24px] p-6 shadow-sm">
                
                <div 
                    className="relative h-12 flex items-center cursor-pointer touch-none"
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const width = rect.width;
                        const percent = x / width;
                        if (percent < 0.33) setSensitivity('Low');
                        else if (percent < 0.66) setSensitivity('Medium');
                        else setSensitivity('High');
                    }}
                >
                    {/* Background Track */}
                    <div className="absolute w-full h-3 bg-gray-100 rounded-full"></div>
                    
                    {/* Active Track */}
                    <div 
                        className="absolute h-3 bg-blue-100 rounded-full transition-all duration-300 ease-out" 
                        style={{ width: settings.sensitivity === 'Low' ? '33%' : settings.sensitivity === 'Medium' ? '66%' : '100%' }}
                    ></div>
                    
                    {/* Thumb */}
                    <div 
                        className="absolute h-8 w-8 bg-white shadow-lg border border-blue-100 rounded-full flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 active:scale-95"
                        style={{ 
                            left: settings.sensitivity === 'Low' ? '16.5%' : settings.sensitivity === 'Medium' ? '50%' : '83.5%', 
                            transform: 'translateX(-50%)' 
                        }}
                    >
                        <div className={`w-3 h-3 rounded-full transition-colors ${settings.sensitivity === 'Low' ? 'bg-green-400' : settings.sensitivity === 'Medium' ? 'bg-primary' : 'bg-red-400'}`}></div>
                    </div>
                </div>

                <div className="flex justify-between text-[11px] font-bold text-gray-400 mt-2 px-6 uppercase tracking-wider select-none">
                    <span 
                        className={`transition-colors cursor-pointer ${settings.sensitivity === 'Low' ? 'text-primary' : 'hover:text-gray-600'}`}
                        onClick={() => setSensitivity('Low')}
                    >Low</span>
                    <span 
                        className={`transition-colors cursor-pointer ${settings.sensitivity === 'Medium' ? 'text-primary' : 'hover:text-gray-600'}`}
                        onClick={() => setSensitivity('Medium')}
                    >Medium</span>
                    <span 
                        className={`transition-colors cursor-pointer ${settings.sensitivity === 'High' ? 'text-primary' : 'hover:text-gray-600'}`}
                        onClick={() => setSensitivity('High')}
                    >High</span>
                </div>
            </div>
        </section>

        {/* General */}
        <section>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 pl-1">General</h3>
            <div className="bg-white rounded-[24px] shadow-sm overflow-hidden">
                
                {/* Help Center */}
                <div onClick={() => navigate('/help')} className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                            <span className="material-icons">help</span>
                        </div>
                        <h4 className="font-bold text-dark text-[15px]">Help Center</h4>
                    </div>
                    <span className="material-icons text-gray-300">chevron_right</span>
                </div>

                <div className="h-px bg-gray-50 w-full ml-20"></div>

                {/* Contact Support */}
                <div onClick={handleSupport} className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                            <span className="material-icons">mail</span>
                        </div>
                        <h4 className="font-bold text-dark text-[15px]">Contact Support</h4>
                    </div>
                    <span className="material-icons text-gray-300">chevron_right</span>
                </div>

                <div className="h-px bg-gray-50 w-full ml-20"></div>

                 {/* Share App */}
                 <div onClick={handleShareApp} className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <span className="material-icons">share</span>
                        </div>
                        <h4 className="font-bold text-dark text-[15px]">Share App</h4>
                    </div>
                    <span className="material-icons text-gray-300">chevron_right</span>
                </div>
            </div>
        </section>

      </div>

      <div className="mt-10 text-center">
        <p className="text-sm font-medium text-gray-400">MemoryBox Guardian v1.0.3</p>
        <p className="text-xs text-gray-300 mt-1">Offline Mode Active</p>
      </div>

      {/* Hidden File Input for Import */}
      <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".json" 
            onChange={handleFileChange}
      />
    </div>
  );
};

export default Settings;