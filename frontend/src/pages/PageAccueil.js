function PageAccueil({ setCurrentPage }) {
    return (
        <div className="accueil-container text-center">
            <div className="card">
                <div className="accueil-emoji">
                    👶
                </div>
                
                <h1 className="accueil-title">
                    Pipas arrive bientôt ! 🎉
                </h1>
                
                <p className="accueil-description">
                    Faites vos pronostics sur la naissance de notre petit bout !
                    Devinez le sexe, le prénom, le poids, la taille, et bien plus encore...
                </p>
                
                <div className="accueil-prix-box">
                    <h3 className="prix-title">
                        🏆 Prix pour le gagnant :
                    </h3>
                    <p className="prix-text">
                        Un jambon ou un fromage du poids de Pipas à la naissance !
                    </p>
                </div>
                
                <div className="accueil-buttons">
                    <button 
                        className="btn-accueil-primary"
                        onClick={() => setCurrentPage('formulaire')}
                    >
                        🎯 Faire mes pronostics
                    </button>
                    <button 
                        className="btn-secondary"
                        onClick={() => setCurrentPage('participants')}
                    >
                        👥 Voir les participants
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PageAccueil;