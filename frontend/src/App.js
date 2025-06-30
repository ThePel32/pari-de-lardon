import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('accueil');

  return (
    <div className="App">
      {/* Header avec notre logo */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '20px 0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, var(--rose-pastel), var(--bleu-pastel))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            marginBottom: '8px'
          }}>
            👶 Le Pari du Lardon 🍼
          </h1>
          <p style={{
            textAlign: 'center',
            color: 'var(--gris-moyen)',
            fontSize: '14px',
            fontFamily: 'Poppins'
          }}>
            Pronostics pour la naissance de Pipas
          </p>
        </div>
      </header>

      {/* Navigation simple */}
      <nav style={{ padding: '20px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            <button 
              className={currentPage === 'accueil' ? 'btn-primary' : 'btn-tertiary'}
              onClick={() => setCurrentPage('accueil')}
            >
              🏠 Accueil
            </button>
            <button 
              className={currentPage === 'formulaire' ? 'btn-primary' : 'btn-tertiary'}
              onClick={() => setCurrentPage('formulaire')}
            >
              📝 Participer
            </button>
            <button 
              className={currentPage === 'participants' ? 'btn-primary' : 'btn-tertiary'}
              onClick={() => setCurrentPage('participants')}
            >
              👥 Participants
            </button>
            <button 
              className={currentPage === 'admin' ? 'btn-primary' : 'btn-tertiary'}
              onClick={() => setCurrentPage('admin')}
            >
              🔐 Admin
            </button>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="container" style={{ paddingBottom: '40px' }}>
        {currentPage === 'accueil' && <PageAccueil setCurrentPage={setCurrentPage} />}
        {currentPage === 'formulaire' && <PageFormulaire />}
        {currentPage === 'participants' && <PageParticipants />}
        {currentPage === 'admin' && <PageAdmin />}
      </main>
    </div>
  );
}

// Page d'accueil (basée sur notre wireframe)
function PageAccueil({ setCurrentPage }) {
  return (
    <div className="text-center">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '80px', marginBottom: '30px' }}>👶</div>
        
        <h2 style={{ 
          fontSize: '28px', 
          marginBottom: '20px',
          color: 'var(--gris-fonce)'
        }}>
          Pipas arrive bientôt ! 🎉
        </h2>
        
        <p style={{ 
          fontSize: '18px', 
          lineHeight: '1.6',
          marginBottom: '30px',
          color: 'var(--gris-moyen)'
        }}>
          Faites vos pronostics sur la naissance de notre petit bout ! 
          Devinez le sexe, le prénom, le poids, la taille, et bien plus encore...
        </p>

        <div style={{
          background: 'var(--jaune-creme)',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '30px'
        }}>
          <p style={{ fontWeight: '500', marginBottom: '10px' }}>🏆 Prix pour le gagnant :</p>
          <p>Un jambon ou un fromage du poids de Pipas à la naissance !</p>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            className="btn-primary"
            onClick={() => setCurrentPage('formulaire')}
            style={{ fontSize: '18px', padding: '15px 30px' }}
          >
            🎯 Faire mes pronostics
          </button>
          <button 
            className="btn-secondary"
            onClick={() => setCurrentPage('participants')}
          >
            👀 Voir les participants
          </button>
        </div>
      </div>
    </div>
  );
}

function PageFormulaire() {
  return (
    <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 className="text-center mb-40">📝 Vos pronostics</h2>
      <p className="text-center">Formulaire à développer...</p>
    </div>
  );
}

function PageParticipants() {
  return (
    <div className="card">
      <h2 className="text-center mb-40">👥 Liste des participants</h2>
      <p className="text-center">Liste à développer...</p>
    </div>
  );
}

function PageAdmin() {
  return (
    <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 className="text-center mb-40">🔐 Administration</h2>
      <p className="text-center">Interface admin à développer...</p>
    </div>
  );
}

export default App;