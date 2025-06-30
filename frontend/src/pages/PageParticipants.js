import React, { useState } from 'react';

function PageParticipants() {
  // TODO: Remplacer par des données du backend
    const [participants] = useState([
        {
        id: 1,
        nom: 'Marie',
        photo: null,
        sexe: 'fille',
        prenom: 'Emma',
        poids: 3.2,
        taille: 48,
        couleurCheveux: 'blond',
        typeCheveux: 'lisse',
        date: '2025-07-15',
        heure: '14:30',
        choixPrix: 'fromage '
        },
        {
        id: 2,
        nom: 'Thomas',
        photo: null,
        sexe: 'garcon',
        prenom: 'Lucas',
        poids: 3.8,
        taille: 52,
        couleurCheveux: 'brun',
        typeCheveux: 'ondule',
        date: '2025-07-18',
        heure: '09:15',
        choixPrix: 'jambon '
        },
        {
        id: 3,
        nom: 'Sophie',
        photo: null,
        sexe: 'fille',
        prenom: 'Léa',
        poids: 3.5,
        taille: 50,
        couleurCheveux: 'chatain',
        typeCheveux: 'boucle',
        date: '2025-07-20',
        heure: '16:45',
        choixPrix: 'fromage '
        }
    ]);

    const [selectedParticipant, setSelectedParticipant] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });
    };

    const getSexeEmoji = (sexe) => {
        return sexe === 'garcon' ? '👦' : '👧';
    };

    const getPrixEmoji = (choix) => {
        return choix === 'jambon ' ? '🥓' : '🧀';
    };

    return (
        <div>
        <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '30px',
            color: 'var(--gris-fonce)',
            fontSize: '28px'
        }}>
            👥 Participants ({participants.length})
        </h2>

        <div style={{ 
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            maxWidth: '1000px',
            margin: '0 auto'
        }}>
            {participants.map((participant) => (
            <div 
                key={participant.id}
                className="card"
                style={{
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                }
                }}
                onClick={() => setSelectedParticipant(participant)}
            >
                <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                marginBottom: '15px'
                }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--gris-clair)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                }}>
                    {participant.photo ? '📸' : '👤'}
                </div>
                <div>
                    <h3 style={{ 
                    margin: '0 0 5px 0',
                    color: 'var(--gris-fonce)',
                    fontSize: '20px'
                    }}>
                    {participant.nom}
                    </h3>
                    <p style={{ 
                    margin: 0,
                    color: 'var(--gris-moyen)',
                    fontSize: '14px'
                    }}>
                    Cliquez pour voir les détails
                    </p>
                </div>
                </div>

                <div style={{
                background: 'var(--jaune-creme)',
                padding: '15px',
                borderRadius: '12px',
                marginBottom: '15px'
                }}>
                <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px'
                }}>
                    <span style={{ fontSize: '20px' }}>
                    {getSexeEmoji(participant.sexe)}
                    </span>
                    <span style={{ 
                    fontWeight: '500',
                    color: 'var(--gris-fonce)'
                    }}>
                    {participant.prenom}
                    </span>
                </div>
                <div style={{ 
                    display: 'flex',
                    gap: '15px',
                    fontSize: '14px',
                    color: 'var(--gris-moyen)'
                }}>
                    <span>⚖️ {participant.poids} kg</span>
                    <span>📏 {participant.taille} cm</span>
                </div>
                </div>

                <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
                }}>
                <div style={{ fontSize: '14px', color: 'var(--gris-moyen)' }}>
                    📅 {formatDate(participant.date)}
                </div>
                <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '14px'
                }}>
                    {getPrixEmoji(participant.choixPrix)}
                    <span style={{ textTransform: 'capitalize' }}>
                    {participant.choixPrix}
                    </span>
                </div>
                </div>
            </div>
            ))}
        </div>

        {participants.length === 0 && (
            <div className="card" style={{ 
            textAlign: 'center',
            maxWidth: '500px',
            margin: '0 auto'
            }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>📝</div>
            <h3 style={{ 
                color: 'var(--gris-fonce)',
                marginBottom: '15px'
            }}>
                Aucun participant pour le moment
            </h3>
            <p style={{ 
                color: 'var(--gris-moyen)',
                marginBottom: '25px'
            }}>
                Soyez le premier à faire vos pronostics !
            </p>
            <button className="btn-primary">
                📝 Faire mes pronostics
            </button>
            </div>
        )}

        {selectedParticipant && (
            <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
            }}>
            <div className="card" style={{
                maxWidth: '500px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative'
            }}>
                <button 
                onClick={() => setSelectedParticipant(null)}
                style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: 'var(--gris-moyen)'
                }}
                >
                ✕
                </button>

                <h3 style={{ 
                textAlign: 'center',
                marginBottom: '25px',
                color: 'var(--gris-fonce)',
                fontSize: '24px'
                }}>
                Pronostics de {selectedParticipant.nom}
                </h3>

                <div style={{ marginBottom: '20px' }}>
                <div style={{
                    background: 'var(--jaune-creme)',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '20px'
                }}>
                    <h4 style={{ 
                    marginBottom: '15px',
                    color: 'var(--gris-fonce)'
                    }}>
                    👶 Bébé
                    </h4>
                    <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '15px',
                    fontSize: '16px'
                    }}>
                    <div>
                        <strong>Sexe:</strong><br/>
                        {getSexeEmoji(selectedParticipant.sexe)} {selectedParticipant.sexe === 'garcon' ? 'Garçon' : 'Fille'}
                    </div>
                    <div>
                        <strong>Prénom:</strong><br/>
                        {selectedParticipant.prenom}
                    </div>
                    <div>
                        <strong>Poids:</strong><br/>
                        ⚖️ {selectedParticipant.poids} kg
                    </div>
                    <div>
                        <strong>Taille:</strong><br/>
                        📏 {selectedParticipant.taille} cm
                    </div>
                    <div>
                        <strong>Cheveux:</strong><br/>
                        {selectedParticipant.couleurCheveux} {selectedParticipant.typeCheveux}
                    </div>
                    <div>
                        <strong>Heure:</strong><br/>
                        🕐 {selectedParticipant.heure}
                    </div>
                    </div>
                </div>

                <div style={{
                    background: '#ffe5d9',
                    padding: '20px',
                    borderRadius: '15px',
                    textAlign: 'center'
                }}>
                    <h4 style={{ 
                    marginBottom: '10px',
                    color: 'var(--gris-fonce)'
                    }}>
                    🏆 Prix souhaité
                    </h4>
                    <div style={{ fontSize: '18px' }}>
                    {getPrixEmoji(selectedParticipant.choixPrix)} {selectedParticipant.choixPrix === 'jambon ' ? 'Jambon ' : 'Fromage '} du poids de Pipas
                    </div>
                </div>

                <div style={{
                    background: 'var(--gris-clair)',
                    padding: '20px',
                    borderRadius: '15px',
                    marginTop: '20px',
                    textAlign: 'center'
                }}>
                    <h4 style={{ 
                    marginBottom: '10px',
                    color: 'var(--gris-fonce)'
                    }}>
                    📅 Date prévue
                    </h4>
                    <div style={{ fontSize: '18px' }}>
                    {formatDate(selectedParticipant.date)}
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}

export default PageParticipants;