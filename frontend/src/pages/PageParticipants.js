import { useState } from 'react';

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
            choixPrix: 'fromage'
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
            choixPrix: 'jambon'
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
            choixPrix: 'fromage'
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
        return choix === 'jambon' ? '🥓' : '🧀';
    };

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
                                {participant.photo ? '📸' : '👤'}
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
                                <span>{getSexeEmoji(participant.sexe)}</span>
                                <span>{participant.prenom}</span>
                            </div>
                            <div className="participant-predictions-details">
                                <span>⚖️ {participant.poids} kg</span>
                                <span>📏 {participant.taille} cm</span>
                            </div>
                        </div>

                        <div className="participant-footer">
                            <div className="participant-date">
                                📅 {formatDate(participant.date)}
                            </div>
                            <div className="participant-prix">
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
                <div className="card participants-empty text-center">
                    <div className="participants-empty-emoji">📝</div>
                    <h3 className="participants-empty-title">
                        Aucun participant pour le moment
                    </h3>
                    <p className="participants-empty-text">
                        Soyez le premier à faire vos pronostics !
                    </p>
                    <button className="btn-primary">
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
                                        {getSexeEmoji(selectedParticipant.sexe)} {selectedParticipant.sexe === 'garcon' ? 'Garçon' : 'Fille'}
                                    </div>
                                    <div className="modal-detail-item">
                                        <strong>Prénom:</strong>
                                        {selectedParticipant.prenom}
                                    </div>
                                    <div className="modal-detail-item">
                                        <strong>Poids:</strong>
                                        ⚖️ {selectedParticipant.poids} kg
                                    </div>
                                    <div className="modal-detail-item">
                                        <strong>Taille:</strong>
                                        📏 {selectedParticipant.taille} cm
                                    </div>
                                    <div className="modal-detail-item">
                                        <strong>Cheveux:</strong>
                                        {selectedParticipant.couleurCheveux} {selectedParticipant.typeCheveux}
                                    </div>
                                    <div className="modal-detail-item">
                                        <strong>Heure:</strong>
                                        🕐 {selectedParticipant.heure}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-section modal-section-prix">
                                <h4 className="modal-section-title">
                                    🏆 Prix souhaité
                                </h4>
                                <div style={{ fontSize: '18px' }}>
                                    {getPrixEmoji(selectedParticipant.choixPrix)} {selectedParticipant.choixPrix === 'jambon' ? 'Jambon' : 'Fromage'} du poids de Pipas
                                </div>
                            </div>

                            <div className="modal-section modal-section-date">
                                <h4 className="modal-section-title">
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