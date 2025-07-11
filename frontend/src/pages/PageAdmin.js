import { useState, useEffect } from 'react';

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
        heureNaissance: ''
    });

    const [participants, setParticipants] = useState([]);
    const [resultsSaved, setResultsSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loadParticipants = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/participants/classement');
            if (response.ok) {
                const data = await response.json();
                setParticipants(data);
            }
        } catch (error) {
            console.error('Erreur chargement participants:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            loadParticipants();
        }
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
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
        setError('');
    };

    const handleSaveResults = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const apiData = {
                sexe: resultsData.sexe,
                prenom: resultsData.prenom,
                poids: parseFloat(resultsData.poids),
                taille: parseFloat(resultsData.taille),
                couleur_cheveux: resultsData.couleurCheveux,
                type_cheveux: resultsData.typeCheveux,
                date_naissance: resultsData.dateNaissance,
                heure_naissance: resultsData.heureNaissance
            };

            const response = await fetch('http://localhost:3001/api/resultats-reels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData)
            });

            const result = await response.json();

            if (response.ok) {
                setResultsSaved(true);
                await loadParticipants();
                setTimeout(() => setResultsSaved(false), 3000);
            } else {
                throw new Error(result.error || 'Erreur lors de la sauvegarde');
            }

        } catch (error) {
            console.error('Erreur sauvegarde:', error);
            setError(error.message || 'Erreur lors de la sauvegarde des résultats');
        } finally {
            setLoading(false);
        }
    };

    const handleRecalculateScores = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/resultats-reels/recalculer', {
                method: 'POST'
            });

            if (response.ok) {
                await loadParticipants();
            } else {
                throw new Error('Erreur lors du recalcul');
            }
        } catch (error) {
            console.error('Erreur recalcul:', error);
            setError('Erreur lors du recalcul des scores');
        } finally {
            setLoading(false);
        }
    };

    const getSexeEmoji = (sexe) => {
        return sexe === 'garcon' ? '👦' : '👧';
    };

    const getPrixEmoji = (choix) => {
        return choix === 'jambon' ? '🥓' : '🧀';
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

            {error && (
                <div className="card" style={{ backgroundColor: '#fdeaea', border: '1px solid #f44336', marginBottom: '20px' }}>
                    <p style={{ color: '#d32f2f', margin: '10px 0' }}>
                        {error}
                    </p>
                </div>
            )}

            <div className="card mb-40">
                <h3 className="form-section-title">
                    👶 Saisir les résultats réels
                </h3>

                <form onSubmit={handleSaveResults}>
                    <div className="admin-form-grid">
                        <div className="form-group">
                            <label className="form-label">
                                Sexe réel *
                            </label>
                            <select
                                name="sexe"
                                value={resultsData.sexe}
                                onChange={handleResultChange}
                                className="form-select"
                                disabled={loading}
                                required
                            >
                                <option value="">Choisir...</option>
                                <option value="garcon">👦 Garçon</option>
                                <option value="fille">👧 Fille</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Prénom réel *
                            </label>
                            <input
                                type="text"
                                name="prenom"
                                value={resultsData.prenom}
                                onChange={handleResultChange}
                                placeholder="Prénom de Pipas"
                                className="form-input"
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Poids (kg) *
                            </label>
                            <input
                                type="number"
                                name="poids"
                                value={resultsData.poids}
                                onChange={handleResultChange}
                                placeholder="3.46"
                                step="0.01"
                                className="form-input"
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Taille (cm) *
                            </label>
                            <input
                                type="number"
                                name="taille"
                                value={resultsData.taille}
                                onChange={handleResultChange}
                                placeholder="48.5"
                                step="0.1"
                                className="form-input"
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Couleur cheveux *
                            </label>
                            <select
                                name="couleurCheveux"
                                value={resultsData.couleurCheveux}
                                onChange={handleResultChange}
                                className="form-select"
                                disabled={loading}
                                required
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
                                Type cheveux *
                            </label>
                            <select
                                name="typeCheveux"
                                value={resultsData.typeCheveux}
                                onChange={handleResultChange}
                                className="form-select"
                                disabled={loading}
                                required
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
                                Date de naissance *
                            </label>
                            <input
                                type="date"
                                name="dateNaissance"
                                value={resultsData.dateNaissance}
                                onChange={handleResultChange}
                                className="form-input"
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Heure de naissance *
                            </label>
                            <input
                                type="time"
                                name="heureNaissance"
                                value={resultsData.heureNaissance}
                                onChange={handleResultChange}
                                className="form-input"
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-submit">
                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ padding: '12px 30px' }}
                            disabled={loading}
                        >
                            {loading ? 'Sauvegarde...' : '💾 Sauvegarder les résultats'}
                        </button>
                        
                        <button
                            type="button"
                            onClick={handleRecalculateScores}
                            className="btn-secondary"
                            style={{ padding: '12px 20px', marginLeft: '10px' }}
                            disabled={loading}
                        >
                            🔄 Recalculer les scores
                        </button>

                        {resultsSaved && (
                            <p className="success-message">
                                Résultats sauvegardés et scores calculés !
                            </p>
                        )}
                    </div>
                </form>
            </div>

            {participants.length > 0 && (
                <div className="card">
                    <h3 className="form-section-title">
                        🏆 Classement mis à jour ({participants.length} participants)
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {participants.map((participant, index) => (
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
                                            <div className="leaderboard-details">
                                                {getSexeEmoji(participant.pronostics?.sexe)} {participant.pronostics?.prenom || 'Non défini'}
                                            </div>
                                            <div className="leaderboard-prix">
                                                {getPrixEmoji(participant.preference_prix)} {participant.preference_prix}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="leaderboard-score">
                                        {participant.score || 0} pts
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {participants.length > 0 && participants[0]?.score > 0 && (
                        <div className="winner-announcement">
                            <h4 style={{ marginBottom: '10px' }}>🎉 Gagnant actuel</h4>
                            <p style={{ fontSize: '18px', fontWeight: '500' }}>
                                <strong>{participants[0]?.nom}</strong> avec {participants[0]?.score} points remporte un {getPrixEmoji(participants[0]?.preference_prix)} {participants[0]?.preference_prix} !
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PageAdmin;