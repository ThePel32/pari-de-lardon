import React, { useState } from 'react';

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
        choixPrix: 'fromage '
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
        choixPrix: 'jambon '
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
        choixPrix: 'fromage '
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
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div className="card">
            <h2 style={{ 
                textAlign: 'center', 
                marginBottom: '30px',
                color: 'var(--gris-fonce)',
                fontSize: '24px'
            }}>
                🔐 Connexion Admin
            </h2>

            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '500',
                    color: 'var(--gris-fonce)'
                }}>
                    Mot de passe
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez le mot de passe admin"
                    style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: loginError ? '2px solid #ff6b6b' : '2px solid var(--gris-clair)',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none'
                    }}
                />
                {loginError && (
                    <p style={{ 
                    color: '#ff6b6b', 
                    fontSize: '14px', 
                    marginTop: '5px' 
                    }}>
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

            <div style={{
                background: 'var(--jaune-creme)',
                padding: '15px',
                borderRadius: '12px',
                marginTop: '20px',
                fontSize: '14px',
                textAlign: 'center'
            }}>
                <strong>Démo:</strong> mot de passe = <code>pipas2025</code>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '30px'
        }}>
            <h2 style={{ 
            color: 'var(--gris-fonce)',
            fontSize: '28px',
            margin: 0
            }}>
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

        <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ 
            color: 'var(--gris-fonce)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
            }}>
            👶 Saisir les résultats réels
            </h3>

            <form onSubmit={handleSaveResults}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Sexe réel
                </label>
                <select
                    name="sexe"
                    value={resultsData.sexe}
                    onChange={handleResultChange}
                    style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid var(--gris-clair)',
                    borderRadius: '8px'
                    }}
                >
                    <option value="">Choisir...</option>
                    <option value="garcon">👦 Garçon</option>
                    <option value="fille">👧 Fille</option>
                </select>
                </div>

                <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Prénom réel
                </label>
                <input
                    type="text"
                    name="prenom"
                    value={resultsData.prenom}
                    onChange={handleResultChange}
                    placeholder="Prénom de Pipas"
                    style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid var(--gris-clair)',
                    borderRadius: '8px'
                    }}
                />
                </div>

                <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Poids (kg)
                </label>
                <input
                    type="number"
                    name="poids"
                    value={resultsData.poids}
                    onChange={handleResultChange}
                    placeholder="3.2"
                    step="0.1"
                    style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid var(--gris-clair)',
                    borderRadius: '8px'
                    }}
                />
                </div>

                <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Taille (cm)
                </label>
                <input
                    type="number"
                    name="taille"
                    value={resultsData.taille}
                    onChange={handleResultChange}
                    placeholder="50"
                    style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid var(--gris-clair)',
                    borderRadius: '8px'
                    }}
                />
                </div>

                <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Couleur cheveux
                </label>
                <select
                    name="couleurCheveux"
                    value={resultsData.couleurCheveux}
                    onChange={handleResultChange}
                    style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid var(--gris-clair)',
                    borderRadius: '8px'
                    }}
                >
                    <option value="">Choisir...</option>
                    <option value="brun">Brun</option>
                    <option value="blond">Blond</option>
                    <option value="roux">Roux</option>
                    <option value="chatain">Châtain</option>
                    <option value="noir">Noir</option>
                </select>
                </div>

                <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Type cheveux
                </label>
                <select
                    name="typeCheveux"
                    value={resultsData.typeCheveux}
                    onChange={handleResultChange}
                    style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid var(--gris-clair)',
                    borderRadius: '8px'
                    }}
                >
                    <option value="">Choisir...</option>
                    <option value="lisse">Lisse</option>
                    <option value="ondule">Ondulé</option>
                    <option value="boucle">Bouclé</option>
                    <option value="frise">Frisé</option>
                </select>
                </div>

                <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Date de naissance
                </label>
                <input
                    type="date"
                    name="dateNaissance"
                    value={resultsData.dateNaissance}
                    onChange={handleResultChange}
                    style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid var(--gris-clair)',
                    borderRadius: '8px'
                    }}
                />
                </div>

                <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Heure de naissance
                </label>
                <input
                    type="time"
                    name="heureNaissance"
                    value={resultsData.heureNaissance}
                    onChange={handleResultChange}
                    style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid var(--gris-clair)',
                    borderRadius: '8px'
                    }}
                />
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <button 
                type="submit"
                className="btn-primary"
                style={{ padding: '12px 30px' }}
                >
                💾 Sauvegarder les résultats
                </button>
                {resultsSaved && (
                <p style={{ 
                    color: 'green', 
                    marginTop: '10px',
                    fontWeight: '500'
                }}>
                    ✅ Résultats sauvegardés !
                </p>
                )}
            </div>
            </form>
        </div>

        {resultsData.sexe && resultsData.poids && (
            <div className="card">
            <h3 style={{ 
                color: 'var(--gris-fonce)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                🏆 Classement des participants
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {calculateScores().map((participant, index) => (
                <div 
                    key={participant.id}
                    style={{
                    background: index === 0 ? 'linear-gradient(45deg, #ffd700, #ffed4e)' : 
                                index === 1 ? '#e5e5e5' : 
                                index === 2 ? '#cd7f32' : 'white',
                    padding: '20px',
                    borderRadius: '15px',
                    border: index < 3 ? '3px solid #333' : '2px solid var(--gris-clair)',
                    position: 'relative'
                    }}
                >
                    <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ 
                        fontSize: '24px',
                        fontWeight: 'bold'
                        }}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                        </div>
                        <div>
                        <h4 style={{ 
                            margin: '0 0 5px 0',
                            fontSize: '18px',
                            color: index === 0 ? '#333' : 'var(--gris-fonce)'
                        }}>
                            {participant.nom}
                        </h4>
                        <div style={{ 
                            fontSize: '14px',
                            color: index === 0 ? '#666' : 'var(--gris-moyen)'
                        }}>
                            {participant.choixPrix === 'jambon ' ? '🥓' : '🧀'} {participant.choixPrix}
                        </div>
                        </div>
                    </div>
                    <div style={{ 
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: index === 0 ? '#333' : 'var(--gris-fonce)'
                    }}>
                        {participant.score} pts
                    </div>
                    </div>
                    
                    <div style={{ 
                    fontSize: '12px',
                    color: index === 0 ? '#666' : 'var(--gris-moyen)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px'
                    }}>
                    {participant.details.map((detail, i) => (
                        <span key={i} style={{ 
                        background: 'rgba(255,255,255,0.7)',
                        padding: '2px 8px',
                        borderRadius: '12px'
                        }}>
                        {detail}
                        </span>
                    ))}
                    </div>
                </div>
                ))}
            </div>

            {calculateScores().length > 0 && (
                <div style={{
                background: 'var(--jaune-creme)',
                padding: '20px',
                borderRadius: '15px',
                marginTop: '25px',
                textAlign: 'center'
                }}>
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