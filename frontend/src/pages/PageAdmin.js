import { useState } from 'react';

function PageAdmin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [resultsData, setResultsData] = useState({
        sexe: '',
        prenom: '',
        poids: '',
        taille: '',
        couleurCheveux: '',
        typeCheveux: '',
        dateNaissance: '',
        heureNaissance: '',
        poidsExact: ''
    });

    const [resultsSaved, setResultsSaved] = useState(false);

    const participants = [
        {
            id: 1,
            nom: 'Marie',
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
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        // TODO: Vraie authentification avec le backend
        if (password === 'pipas2025') {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Mot de passe incorrect');
        }
    };

    const handleResultChange = (e) => {
        const { name, value } = e.target;
        setResultsData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveResults = (e) => {
        e.preventDefault();
        // TODO: Sauvegarder en base
        console.log('Résultats sauvegardés:', resultsData);
        setResultsSaved(true);
        setTimeout(() => setResultsSaved(false), 3000);
    };

    const calculateScores = () => {
        if (!resultsData.sexe || !resultsData.poids) {
            return [];
        }

        return participants.map(participant => {
            let score = 0;
            let details = [];

            if (participant.sexe === resultsData.sexe) {
                score += 20;
                details.push('Sexe: +20');
            }

            const diffPoids = Math.abs(parseFloat(participant.poids) - parseFloat(resultsData.poids));
            const pointsPoids = Math.max(0, 20 - diffPoids * 10);
            score += pointsPoids;
            details.push(`Poids: +${pointsPoids.toFixed(1)}`);

            if (resultsData.taille) {
                const diffTaille = Math.abs(parseInt(participant.taille) - parseInt(resultsData.taille));
                const pointsTaille = Math.max(0, 15 - diffTaille * 2);
                score += pointsTaille;
                details.push(`Taille: +${pointsTaille.toFixed(1)}`);
            }

            if (participant.couleurCheveux === resultsData.couleurCheveux) {
                score += 10;
                details.push('Couleur cheveux: +10');
            }

            if (participant.typeCheveux === resultsData.typeCheveux) {
                score += 5;
                details.push('Type cheveux: +5');
            }

            if (resultsData.dateNaissance && participant.date) {
                const diffJours = Math.abs(
                    (new Date(participant.date) - new Date(resultsData.dateNaissance)) / (1000 * 60 * 60 * 24)
                );
                const pointsDate = Math.max(0, 10 - diffJours);
                score += pointsDate;
                details.push(`Date: +${pointsDate.toFixed(1)}`);
            }

            return {
                ...participant,
                score: Math.round(score * 10) / 10,
                details
            };
        }).sort((a, b) => b.score - a.score);
    };

    if (!isAuthenticated) {
        return (
            <div className="login-container">
                <div className="card">
                    <h2 className="login-title text-center">
                        🔐 Connexion Admin
                    </h2>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label className="form-label">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Entrez le mot de passe admin"
                                className={`form-input ${loginError ? 'form-input-error' : ''}`}
                            />
                            {loginError && (
                                <p className="form-error">
                                    {loginError}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ width: '100%', padding: '12px' }}
                        >
                            🔑 Se connecter
                        </button>
                    </form>

                    <div className="admin-demo-info">
                        <strong>Démo:</strong> mot de passe = <code>pipas2025</code>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2 className="admin-title">
                    🔐 Administration
                </h2>
                <button
                    onClick={() => setIsAuthenticated(false)}
                    className="btn-tertiary"
                    style={{ fontSize: '14px' }}
                >
                    🚪 Déconnexion
                </button>
            </div>

            <div className="card mb-40">
                <h3 className="form-section-title">
                    👶 Saisir les résultats réels
                </h3>

                <form onSubmit={handleSaveResults}>
                    <div className="admin-form-grid">
                        <div className="form-group">
                            <label className="form-label">
                                Sexe réel
                            </label>
                            <select
                                name="sexe"
                                value={resultsData.sexe}
                                onChange={handleResultChange}
                                className="form-select"
                            >
                                <option value="">Choisir...</option>
                                <option value="garcon">👦 Garçon</option>
                                <option value="fille">👧 Fille</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Prénom réel
                            </label>
                            <input
                                type="text"
                                name="prenom"
                                value={resultsData.prenom}
                                onChange={handleResultChange}
                                placeholder="Prénom de Pipas"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Poids (kg)
                            </label>
                            <input
                                type="number"
                                name="poids"
                                value={resultsData.poids}
                                onChange={handleResultChange}
                                placeholder="3.2"
                                step="0.1"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Taille (cm)
                            </label>
                            <input
                                type="number"
                                name="taille"
                                value={resultsData.taille}
                                onChange={handleResultChange}
                                placeholder="50"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Couleur cheveux
                            </label>
                            <select
                                name="couleurCheveux"
                                value={resultsData.couleurCheveux}
                                onChange={handleResultChange}
                                className="form-select"
                            >
                                <option value="">Choisir...</option>
                                <option value="brun">Brun</option>
                                <option value="blond">Blond</option>
                                <option value="roux">Roux</option>
                                <option value="chatain">Châtain</option>
                                <option value="noir">Noir</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Type cheveux
                            </label>
                            <select
                                name="typeCheveux"
                                value={resultsData.typeCheveux}
                                onChange={handleResultChange}
                                className="form-select"
                            >
                                <option value="">Choisir...</option>
                                <option value="lisse">Lisse</option>
                                <option value="ondule">Ondulé</option>
                                <option value="boucle">Bouclé</option>
                                <option value="frise">Frisé</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Date de naissance
                            </label>
                            <input
                                type="date"
                                name="dateNaissance"
                                value={resultsData.dateNaissance}
                                onChange={handleResultChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Heure de naissance
                            </label>
                            <input
                                type="time"
                                name="heureNaissance"
                                value={resultsData.heureNaissance}
                                onChange={handleResultChange}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="admin-submit">
                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ padding: '12px 30px' }}
                        >
                            💾 Sauvegarder les résultats
                        </button>
                        {resultsSaved && (
                            <p className="success-message">
                                ✅ Résultats sauvegardés !
                            </p>
                        )}
                    </div>
                </form>
            </div>

            {resultsData.sexe && resultsData.poids && (
                <div className="card">
                    <h3 className="form-section-title">
                        🏆 Classement des participants
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {calculateScores().map((participant, index) => (
                            <div
                                key={participant.id}
                                className={`leaderboard-item ${index === 0 ? 'leaderboard-item-first' :
                                        index === 1 ? 'leaderboard-item-second' :
                                            index === 2 ? 'leaderboard-item-third' :
                                                'leaderboard-item-other'
                                    }`}
                            >
                                <div className="leaderboard-header">
                                    <div className="leaderboard-info">
                                        <div className="leaderboard-rank">
                                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                                        </div>
                                        <div>
                                            <h4 className="leaderboard-name">
                                                {participant.nom}
                                            </h4>
                                            <div className="leaderboard-prix">
                                                {participant.choixPrix === 'jambon' ? '🥓' : '🧀'} {participant.choixPrix}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="leaderboard-score">
                                        {participant.score} pts
                                    </div>
                                </div>

                                <div className="score-details">
                                    {participant.details.map((detail, i) => (
                                        <span key={i} className="score-detail">
                                            {detail}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {calculateScores().length > 0 && (
                        <div className="winner-announcement">
                            <h4 style={{ marginBottom: '10px' }}>🎉 Gagnant</h4>
                            <p style={{ fontSize: '18px', fontWeight: '500' }}>
                                <strong>{calculateScores()[0]?.nom}</strong> remporte un {calculateScores()[0]?.choixPrix}
                                de {resultsData.poids} kg !
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PageAdmin;