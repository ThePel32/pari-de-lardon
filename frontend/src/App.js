import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Navigation from './components/Navigation';

import PageAccueil from './pages/PageAccueil';
import PageFormulaire from './pages/PageFormulaire';
import PageParticipants from './pages/PageParticipants';
import PageAdmin from './pages/PageAdmin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Navigation />
        <main className="container" style={{ paddingBottom: '40px' }}>
          <Routes>
            <Route path="/" element={<PageAccueil />} />
            <Route path="/participer" element={<PageFormulaire />} />
            <Route path="/participants" element={<PageParticipants />} />
            <Route path="/admin" element={<PageAdmin />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;