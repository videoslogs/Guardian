import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './screens/Landing';
import Home from './screens/Home';
import AddItem from './screens/AddItem';
import Search from './screens/Search';
import Settings from './screens/Settings';
import ItemDetail from './screens/ItemDetail';
import Help from './screens/Help';
import MapPage from './screens/MapPage';
import Devices from './screens/Devices';
import { checkIsFirstTime } from './services/storageService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    setIsFirstTime(checkIsFirstTime());
    setLoading(false);
  }, []);

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-primary">Loading...</div>;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={isFirstTime ? <Landing /> : <Navigate to="/app/home" replace />} />
        
        {/* Help Screen (Standalone) */}
        <Route path="/help" element={<Help />} />

        <Route path="/app" element={<Layout />}>
           <Route path="home" element={<Home />} />
           <Route path="search" element={<Search />} />
           <Route path="devices" element={<Devices />} />
           <Route path="settings" element={<Settings />} />
           <Route path="map" element={<MapPage />} />
           {/* Placeholder for categories route, mapping to Home for now */}
           <Route path="categories" element={<Navigate to="/app/search" replace />} />
        </Route>
        
        {/* Full screen routes (no bottom nav) */}
        <Route path="/app/add" element={<AddItem />} />
        <Route path="/app/item/:id" element={<ItemDetail />} />
      </Routes>
    </HashRouter>
  );
};

export default App;