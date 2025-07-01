const ScoreService = require('../services/scoreService');

class ResultatsController {

    static async obtenirResultatsReels(req, res) {
        const database = req.app.locals.database;

        try {
            database.get(
                'SELECT * FROM resultats_reels ORDER BY updated_at DESC LIMIT 1', 
                [], 
                (err, row) => {
                    if (err) {
                        console.error('Erreur récupération résultats:', err);
                        return res.status(500).json({ 
                            error: 'Erreur serveur' 
                        });
                    }

                    if (!row) {
                        return res.json({});
                    }

                    res.json({
                        sexe: row.sexe,
                        prenom: row.prenom,
                        poids: row.poids,
                        taille: row.taille,
                        couleur_cheveux: row.couleur_cheveux,
                        type_cheveux: row.type_cheveux,
                        date_naissance: row.date_naissance,
                        heure_naissance: row.heure_naissance
                    });
                }
            );

        } catch (error) {
            console.error('Erreur récupération résultats:', error);
            res.status(500).json({ 
                error: 'Erreur serveur' 
            });
        }
    }

    static async enregistrerResultatsReels(req, res) {
        const database = req.app.locals.database;

        try {
            const { 
                sexe, prenom, poids, taille, couleur_cheveux, 
                type_cheveux, date_naissance, heure_naissance 
            } = req.body;

            database.run('DELETE FROM resultats_reels', [], (err) => {
                if (err) {
                    console.error('Erreur suppression anciens résultats:', err);
                    return res.status(500).json({ 
                        error: 'Erreur serveur' 
                    });
                }

                database.run(
                    `INSERT INTO resultats_reels (sexe, prenom, poids, taille, couleur_cheveux, type_cheveux, date_naissance, heure_naissance) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [sexe, prenom, poids, taille, couleur_cheveux, type_cheveux, date_naissance, heure_naissance],
                    function(err) {
                        if (err) {
                            console.error('Erreur insertion résultats:', err);
                            return res.status(500).json({ 
                                error: 'Erreur sauvegarde résultats' 
                            });
                        }

                        ScoreService.calculerTousLesScores(database, req.body)
                            .then(() => {
                                res.json({ 
                                    message: 'Résultats enregistrés et scores calculés avec succès' 
                                });
                            })
                            .catch(scoreError => {
                                console.error('Erreur calcul scores:', scoreError);
                                res.status(500).json({ 
                                    error: 'Résultats enregistrés mais erreur lors du calcul des scores' 
                                });
                            });
                    }
                );
            });

        } catch (error) {
            console.error('Erreur enregistrement résultats:', error);
            res.status(500).json({ 
                error: 'Erreur serveur' 
            });
        }
    }

    static async recalculerScores(req, res) {
        const database = req.app.locals.database;

        try {
            database.get(
                'SELECT * FROM resultats_reels ORDER BY updated_at DESC LIMIT 1',
                [],
                (err, resultats) => {
                    if (err) {
                        console.error('Erreur récupération résultats pour recalcul:', err);
                        return res.status(500).json({ 
                            error: 'Erreur serveur' 
                        });
                    }

                    if (!resultats) {
                        return res.status(400).json({ 
                            error: 'Aucun résultat réel enregistré. Impossible de recalculer.' 
                        });
                    }

                    ScoreService.calculerTousLesScores(database, resultats)
                        .then(() => {
                            res.json({ 
                                message: 'Scores recalculés avec succès' 
                            });
                        })
                        .catch(scoreError => {
                            console.error('Erreur recalcul scores:', scoreError);
                            res.status(500).json({ 
                                error: 'Erreur lors du recalcul des scores' 
                            });
                        });
                }
            );

        } catch (error) {
            console.error('Erreur recalcul scores:', error);
            res.status(500).json({ 
                error: 'Erreur serveur' 
            });
        }
    }
}

module.exports = ResultatsController;