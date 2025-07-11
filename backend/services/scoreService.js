class ScoreService {
    
    static calculerScore(pronostics, reelles) {
        let score = 0;

        if (pronostics.sexe === reelles.sexe) {
            score += 10;
        }

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
        if (diffPoids <= 0.02) {
            score += 10;
        } else if (diffPoids <= 0.05) {
            score += 9.5;
        } else if (diffPoids <= 0.1) {
            score += 9;
        } else if (diffPoids <= 0.15) {
            score += 8.5;
        } else if (diffPoids <= 0.2) {
            score += 8;
        } else if (diffPoids <= 0.3) {
            score += 7;
        } else if (diffPoids <= 0.4) {
            score += 6;
        } else if (diffPoids <= 0.5) {
            score += 5;
        } else if (diffPoids <= 0.7) {
            score += 4;
        } else if (diffPoids <= 1.0) {
            score += 3;
        } else if (diffPoids <= 1.3) {
            score += 2;
        } else if (diffPoids <= 1.5) {
            score += 1;
        }

        const diffTaille = Math.abs(
            parseFloat(pronostics.taille || 0) - parseFloat(reelles.taille || 0)
        );
        if (diffTaille <= 0.5) {
            score += 10;
        } else if (diffTaille <= 1) {
            score += 9;
        } else if (diffTaille <= 1.5) {
            score += 8;
        } else if (diffTaille <= 2) {
            score += 6;
        } else if (diffTaille <= 3) {
            score += 4;
        } else if (diffTaille <= 4) {
            score += 2;
        } else if (diffTaille <= 5) {
            score += 1;
        }

        const dateScore = this.calculerScoreDate(pronostics.date_naissance, reelles.date_naissance);
        score += dateScore;

        const heureScore = this.calculerScoreHeure(pronostics.heure_naissance, reelles.heure_naissance);
        score += heureScore;

        return Math.round(score * 100) / 100;
    }

    static calculerScoreDate(datePronostic, dateReelle) {
        if (!datePronostic || !dateReelle) return 0;
        
        const date1 = new Date(datePronostic);
        const date2 = new Date(dateReelle);
        const diffJours = Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

        if (diffJours === 0) return 15;
        else if (diffJours <= 1) return 12;
        else if (diffJours <= 2) return 10;
        else if (diffJours <= 3) return 8;
        else if (diffJours <= 5) return 6;
        else if (diffJours <= 7) return 4;
        else if (diffJours <= 10) return 2;
        else if (diffJours <= 14) return 1;
        else return 0;
    }

    static calculerScoreHeure(heurePronostic, heureReelle) {
        if (!heurePronostic || !heureReelle) return 0;
        
        const [h1, m1] = heurePronostic.split(':').map(Number);
        const [h2, m2] = heureReelle.split(':').map(Number);
        
        const minutes1 = h1 * 60 + m1;
        const minutes2 = h2 * 60 + m2;
        const diffMinutes = Math.abs(minutes2 - minutes1);

        if (diffMinutes === 0) return 12;
        else if (diffMinutes <= 15) return 10;
        else if (diffMinutes <= 30) return 8;
        else if (diffMinutes <= 60) return 6;
        else if (diffMinutes <= 120) return 4;
        else if (diffMinutes <= 180) return 2;
        else if (diffMinutes <= 360) return 1;
        else return 0;
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
            date_naissance: this.calculerScoreDate(pronostics.date_naissance, reelles.date_naissance),
            heure_naissance: this.calculerScoreHeure(pronostics.heure_naissance, reelles.heure_naissance)
        };

        if (pronostics.prenom && reelles.prenom) {
            if (pronostics.prenom.toLowerCase().trim() === reelles.prenom.toLowerCase().trim()) {
                detail.prenom = 5;
            }
        }

        const diffPoids = Math.abs(parseFloat(pronostics.poids || 0) - parseFloat(reelles.poids || 0));
        if (diffPoids <= 0.05) detail.poids = 10;
        else if (diffPoids <= 0.1) detail.poids = 9;
        else if (diffPoids <= 0.2) detail.poids = 8;
        else if (diffPoids <= 0.3) detail.poids = 6;
        else if (diffPoids <= 0.5) detail.poids = 4;
        else if (diffPoids <= 0.8) detail.poids = 2;
        else if (diffPoids <= 1.0) detail.poids = 1;

        const diffTaille = Math.abs(parseFloat(pronostics.taille || 0) - parseFloat(reelles.taille || 0));
        if (diffTaille <= 0.5) detail.taille = 10;
        else if (diffTaille <= 1) detail.taille = 9;
        else if (diffTaille <= 1.5) detail.taille = 8;
        else if (diffTaille <= 2) detail.taille = 6;
        else if (diffTaille <= 3) detail.taille = 4;
        else if (diffTaille <= 4) detail.taille = 2;
        else if (diffTaille <= 5) detail.taille = 1;

        detail.total = Object.values(detail).reduce((sum, points) => sum + points, 0);
        detail.total = Math.round(detail.total * 100) / 100;

        return detail;
    }
}

module.exports = ScoreService;