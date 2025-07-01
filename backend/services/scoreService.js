class ScoreService {
    
    static calculerScore(pronostics, reelles) {
        let score = 0;

        if (pronostics.sexe === reelles.sexe) {
            score += 10;
        }

        // Prénom (5 points si exact)
        if (pronostics.prenom && reelles.prenom) {
            if (pronostics.prenom.toLowerCase().trim() === reelles.prenom.toLowerCase().trim()) {
                score += 5;
            }
        }

        if (pronostics.couleur_cheveux === reelles.couleur_cheveux) {
            score += 8;
        }

        if (pronostics.type_cheveux === reelles.type_cheveux) {
            score += 8;
        }

        const diffPoids = Math.abs(
            parseFloat(pronostics.poids || 0) - parseFloat(reelles.poids || 0)
        );
        if (diffPoids <= 0.1) {
            score += 10;
        } else if (diffPoids <= 0.3) {
            score += 7;
        } else if (diffPoids <= 0.5) {
            score += 5;
        }

        const diffTaille = Math.abs(
            parseInt(pronostics.taille || 0) - parseInt(reelles.taille || 0)
        );
        if (diffTaille <= 1) {
            score += 10;
        } else if (diffTaille <= 2) {
            score += 7;
        } else if (diffTaille <= 3) {
            score += 5;
        }

        if (pronostics.date_naissance === reelles.date_naissance) {
            score += 12;
        }

        if (pronostics.heure_naissance === reelles.heure_naissance) {
            score += 10;
        }

        return score;
    }

    static calculerTousLesScores(database, donneesReelles) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT pr.*, p.id as participant_id 
                FROM pronostics pr 
                JOIN participants p ON pr.participant_id = p.id
            `;

            database.all(query, [], (err, pronostics) => {
                if (err) {
                    console.error('Erreur récupération pronostics:', err);
                    return reject(err);
                }

                if (pronostics.length === 0) {
                    return resolve();
                }

                let completed = 0;
                const total = pronostics.length;

                pronostics.forEach(pronostic => {
                    const score = this.calculerScore(pronostic, donneesReelles);
                    
                    database.run(
                        'UPDATE pronostics SET score = ? WHERE participant_id = ?', 
                        [score, pronostic.participant_id], 
                        (err) => {
                            if (err) {
                                console.error(`Erreur mise à jour score participant ${pronostic.participant_id}:`, err);
                                return reject(err);
                            }

                            completed++;
                            
                            if (completed === total) {
                                resolve();
                            }
                        }
                    );
                });
            });
        });
    }

    static getDetailScore(pronostics, reelles) {
        const detail = {
            sexe: pronostics.sexe === reelles.sexe ? 10 : 0,
            prenom: 0,
            couleur_cheveux: pronostics.couleur_cheveux === reelles.couleur_cheveux ? 8 : 0,
            type_cheveux: pronostics.type_cheveux === reelles.type_cheveux ? 8 : 0,
            poids: 0,
            taille: 0,
            date_naissance: pronostics.date_naissance === reelles.date_naissance ? 12 : 0,
            heure_naissance: pronostics.heure_naissance === reelles.heure_naissance ? 10 : 0
        };

        if (pronostics.prenom && reelles.prenom) {
            if (pronostics.prenom.toLowerCase().trim() === reelles.prenom.toLowerCase().trim()) {
                detail.prenom = 5;
            }
        }

        const diffPoids = Math.abs(parseFloat(pronostics.poids || 0) - parseFloat(reelles.poids || 0));
        if (diffPoids <= 0.1) detail.poids = 10;
        else if (diffPoids <= 0.3) detail.poids = 7;
        else if (diffPoids <= 0.5) detail.poids = 5;

        const diffTaille = Math.abs(parseInt(pronostics.taille || 0) - parseInt(reelles.taille || 0));
        if (diffTaille <= 1) detail.taille = 10;
        else if (diffTaille <= 2) detail.taille = 7;
        else if (diffTaille <= 3) detail.taille = 5;

        detail.total = Object.values(detail).reduce((sum, points) => sum + points, 0);

        return detail;
    }
}

module.exports = ScoreService;