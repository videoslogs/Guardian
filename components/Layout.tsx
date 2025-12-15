import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 shadow-2xl relative overflow-hidden font-sans">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 z-50 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.03)] px-2">
        <div className="flex justify-between items-end h-20 pb-4 px-2">
          
          {/* Home */}
          <NavLink
            to="/app/home"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 space-y-1 transition-colors ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`
            }
          >
            <span className="material-icons text-2xl">grid_view</span>
            <span className="text-[10px] font-medium">Home</span>
          </NavLink>

          {/* Radar (Formerly Map) */}
          <NavLink
            to="/app/map"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 space-y-1 transition-colors ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`
            }
          >
            <span className="material-icons text-2xl">radar</span>
            <span className="text-[10px] font-medium">Radar</span>
          </NavLink>

          {/* Center Action Button (Add) */}
          <div className="relative w-16 flex justify-center">
            <NavLink
              to="/app/add"
              className="absolute -top-10 bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform active:scale-95 shadow-blue-500/30 ring-4 ring-gray-50"
            >
              <span className="material-icons text-3xl">add</span>
            </NavLink>
          </div>

          {/* Devices */}
           <NavLink
            to="/app/devices"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 space-y-1 transition-colors ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`
            }
          >
            <span className="material-icons text-2xl">sensors</span>
            <span className="text-[10px] font-medium">Devices</span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/app/settings"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 space-y-1 transition-colors ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`
            }
          >
            <span className="material-icons text-2xl">settings</span>
            <span className="text-[10px] font-medium">Settings</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Layout;