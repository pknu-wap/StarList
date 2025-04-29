import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import SyncStartPage from './pages/SyncStartPage';

import './App.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<SyncStartPage/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;