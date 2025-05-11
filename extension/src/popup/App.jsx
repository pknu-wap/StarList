import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import LoginPage from './pages/LoginPage';
import SyncStartPage from './pages/SyncStartPage';
import SyncStatusPage from './pages/SyncStatusPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<LoginPage/>}/>
        <Route path='pages/MainPage' element={<MainPage/>}/>
        <Route path='pages/SyncStartPage' element={<SyncStartPage/>}/>
        <Route path='pages/SyncStatusPage' element={<SyncStatusPage/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;