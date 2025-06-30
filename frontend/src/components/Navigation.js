import React from 'react';

function Navigation({ currentPage, setCurrentPage }) {
    return (
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
    );
}

export default Navigation;