import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PageParticipants() {
    const navigate = useNavigate();
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedParticipant, setSelectedParticipant] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/participants')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Erreur réseau');
                }
                return res.json();
            })
            .then(data => {
                setParticipants(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur fetch:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'Non défini';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };

    const getSexeEmoji = (sexe) => {
        return sexe === 'garcon' ? '👦' : '👧';
    };

    const getPrixEmoji = (choix) => {
        return choix === 'jambon' ? '🥓' : '🧀';
    };

    const formatPoids = (poids) => {
        return poids ? parseFloat(poids).toFixed(2) : '0.00';
    };

    const formatTaille = (taille) => {
        return taille ? parseFloat(taille).toFixed(1) : '0.0';
    };

    if (loading) {
        return (
            <div className="loading-container text-center">
                <h2>Chargement des participants...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container text-center">
                <h2>Erreur: {error}</h2>
                <button 
                    onClick={() => window.location.reload()} 
                    className="btn-primary"
                >
                    🔄 Réessayer
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2 className="participants-title text-center">
                👥 Participants ({participants.length})
            </h2>

            <div className="participants-grid">
                {participants.map((participant) => (
                    <div
                        key={participant.id}
                        className="card participant-card"
                        onClick={() => setSelectedParticipant(participant)}
                    >
                        <div className="participant-header">
                            <div className="participant-avatar">
                                {participant.photo ? (
                                    <img 
                                        src={`http://localhost:3001${participant.photo}`}
                                        alt={participant.nom}
                                        style={{
                                            width: '50px', 
                                            height: '50px', 
                                            borderRadius: '50%', 
                                            objectFit: 'cover'
                                        }}
                                    />
                                ) : '👤'}
                            </div>
                            <div>
                                <h3 className="participant-name">
                                    {participant.nom}
                                </h3>
                                <p className="participant-subtitle">
                                    Cliquez pour voir les détails
                                </p>
                            </div>
                        </div>

                        <div className="participant-predictions">
                            <div className="participant-predictions-header">
                                <span>{getSexeEmoji(participant.pronostics.sexe)}</span>
                                <span>{participant.pronostics.prenom || 'Non défini'}</span>
                            </div>
                            <div className="participant-predictions-details">
                                <span>⚖️ {formatPoids(participant.pronostics.poids)} kg</span>
                                <span>📏 {formatTaille(participant.pronostics.taille)} cm</span>
                            </div>
                        </div>

                        <div className="participant-footer">
                            <div className="participant-date">
                                📅 {formatDate(participant.pronostics?.date_naissance)}
                            </div>
                            <div className="participant-prix">
                                {getPrixEmoji(participant.preference_prix)}
                                <span style={{ textTransform: 'capitalize' }}>
                                    {participant.preference_prix}
                                </span>
                            </div>
                            <div className="participant-score">
                                🏆 Score: {participant.score || 0}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {participants.length === 0 && (
                <div className="card participants-empty text-center">
                    <div className="participants-empty-emoji">📝</div>
                    <h3 className="participants-empty-title">
                        Aucun participant pour le moment
                    </h3>
                    <p className="participants-empty-text">
                        Soyez le premier à faire vos pronostics !
                    </p>
                    <button 
                        className="btn-primary"
                        onClick={() => navigate('/participer')}
                    >
                        📝 Faire mes pronostics
                    </button>
                </div>
            )}

            {selectedParticipant && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="card">
                            <button
                                onClick={() => setSelectedParticipant(null)}
                                className="modal-close"
                            >
                                ✕
                            </button>

                            <h3 className="modal-title">
                                Pronostics de {selectedParticipant.nom}
                            </h3>

                            <div className="modal-section modal-section-predictions">
                                <h4 className="modal-section-title">
                                    👶 Bébé
                                </h4>
                                <div className="modal-details-grid">
                                    <div className="modal-detail-item">
                                        <strong>Sexe:</strong>
                                        {getSexeEmoji(selectedParticipant.pronostics?.sexe)} {selectedParticipant.pronostics?.sexe === 'garcon' ? 'Garçon' : 'Fille'}
                                    </div>
                                    <div className="modal-detail-item">
                                        <strong>Prénom:</strong>
                                        {selectedParticipant.pronostics?.prenom || 'Non défini'}
                                    </div>
                                    <div className="modal-detail-item">
                                        <strong>Poids:</strong>
                                        ⚖️ {formatPoids(selectedParticipant.pronostics?.poids)} kg
                                    </div>
                                    <div className="modal-detail-item">
                                        <strong>Taille:</strong>
                                        📏 {formatTaille(selectedParticipant.pronostics?.taille)} cm
                                    </div>
                                    <div className="modal-detail-item">
                                        <strong>Cheveux:</strong>
                                        {selectedParticipant.pronostics?.couleur_cheveux} {selectedParticipant.pronostics?.type_cheveux}
                                    </div>
                                    <div className="modal-detail-item">
                                        <strong>Heure:</strong>
                                        🕐 {selectedParticipant.pronostics?.heure_naissance || 'Non définie'}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-section modal-section-prix">
                                <h4 className="modal-section-title">
                                    🏆 Prix souhaité
                                </h4>
                                <div style={{ fontSize: '18px' }}>
                                    {getPrixEmoji(selectedParticipant.preference_prix)} {selectedParticipant.preference_prix === 'jambon' ? 'Jambon' : 'Fromage'} du poids de Pipas
                                </div>
                            </div>

                            <div className="modal-section modal-section-date">
                                <h4 className="modal-section-title">
                                    📅 Date prévue
                                </h4>
                                <div style={{ fontSize: '18px' }}>
                                    {formatDate(selectedParticipant.pronostics?.date_naissance)}
                                </div>
                            </div>

                            <div className="modal-section modal-section-score">
                                <h4 className="modal-section-title">
                                    🏆 Score actuel
                                </h4>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>
                                    {selectedParticipant.score || 0} points
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