import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import Navigation from './components/Navigation';

import PageAccueil from './pages/PageAccueil';
import PageFormulaire from './pages/PageFormulaire';
import PageParticipants from './pages/PageParticipants';
import PageAdmin from './pages/PageAdmin';

function App() {
  const [currentPage, setCurrentPage] = useState('accueil');

  return (
    <div className="App">
      <Header />

      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />

      <main className="container" style={{ paddingBottom: '40px' }}>
        {currentPage === 'accueil' && (
          <PageAccueil setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'formulaire' && <PageFormulaire />}
        {currentPage === 'participants' && <PageParticipants />}
        {currentPage === 'admin' && <PageAdmin />}
      </main>
    </div>
  );
}

export default App;