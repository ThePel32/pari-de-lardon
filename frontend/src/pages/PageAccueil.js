import React from 'react';

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

export default PageAccueil;