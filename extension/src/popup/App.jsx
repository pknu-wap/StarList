import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import LoginPage from './pages/LoginPage';
import SaveSuccessPage from './pages/SaveSuccessPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<LoginPage/>}/>
        <Route path='pages/SaveSuccessPage' element={<SaveSuccessPage/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;