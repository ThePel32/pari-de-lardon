import React from 'react';

function Header() {
    return(
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
    )
}

export default Header;