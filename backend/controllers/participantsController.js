class ParticipantController {

    static async creerParticipant(req, res) {
        const database = req.app.locals.database;
        
        try {
            const { 
                nom, preference_prix, sexe, prenom, poids, taille, 
                couleur_cheveux, type_cheveux, date_naissance, heure_naissance 
            } = req.body;
            
            if (!nom || !nom.trim()) {
                return res.status(400).json({ 
                    error: 'Le nom est requis' 
                });
            }

            const photoFilename = req.file ? req.file.filename : null;

            database.run(
                `INSERT INTO participants (nom, photo, preference_prix) VALUES (?, ?, ?)`, 
                [nom.trim(), photoFilename, preference_prix], 
                function(err) {
                    if (err) {
                        console.error('Erreur insertion participant:', err);
                        return res.status(500).json({ 
                            error: 'Erreur création participant' 
                        });
                    }

                    const participantId = this.lastID;

                    database.run(
                        `INSERT INTO pronostics (participant_id, sexe, prenom, poids, taille, couleur_cheveux, type_cheveux, date_naissance, heure_naissance) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [participantId, sexe, prenom, poids, taille, couleur_cheveux, type_cheveux, date_naissance, heure_naissance],
                        function(err) {
                            if (err) {
                                console.error('Erreur insertion pronostics:', err);
                                return res.status(500).json({ 
                                    error: 'Erreur création pronostics' 
                                });
                            }

                            res.status(201).json({
                                message: 'Participant ajouté avec succès',
                                participantId: participantId,
                                photo: photoFilename ? `/uploads/${photoFilename}` : null
                            });
                        }
                    );
                }
            );

        } catch (error) {
            console.error('Erreur création participant:', error);
            res.status(500).json({ 
                error: 'Erreur serveur lors de la création' 
            });
        }
    }

    static async obtenirParticipants(req, res) {
        const database = req.app.locals.database;

        try {
            const query = `
                SELECT 
                    p.id, p.nom, p.photo, p.preference_prix, p.created_at,
                    pr.sexe, pr.prenom, pr.poids, pr.taille, 
                    pr.couleur_cheveux, pr.type_cheveux, 
                    pr.date_naissance, pr.heure_naissance, pr.score
                FROM participants p
                LEFT JOIN pronostics pr ON p.id = pr.participant_id
                ORDER BY p.created_at DESC
            `;

            database.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Erreur récupération participants:', err);
                    return res.status(500).json({ 
                        error: 'Erreur serveur' 
                    });
                }

                const participants = rows.map(row => ({
                    id: row.id,
                    nom: row.nom,
                    photo: row.photo ? `/uploads/${row.photo}` : null,
                    preference_prix: row.preference_prix,
                    pronostics: {
                        sexe: row.sexe,
                        prenom: row.prenom,
                        poids: row.poids,
                        taille: row.taille,
                        couleur_cheveux: row.couleur_cheveux,
                        type_cheveux: row.type_cheveux,
                        date_naissance: row.date_naissance,
                        heure_naissance: row.heure_naissance
                    },
                    score: row.score || 0,
                    created_at: row.created_at
                }));

                res.json(participants);
            });

        } catch (error) {
            console.error('Erreur récupération participants:', error);
            res.status(500).json({ 
                error: 'Erreur serveur' 
            });
        }
    }

    static async obtenirClassement(req, res) {
        const database = req.app.locals.database;

        try {
            const query = `
                SELECT 
                    p.id, p.nom, p.photo, p.preference_prix,
                    pr.score, pr.sexe, pr.prenom, pr.poids, pr.taille,
                    pr.couleur_cheveux, pr.type_cheveux, pr.date_naissance, pr.heure_naissance
                FROM participants p
                LEFT JOIN pronostics pr ON p.id = pr.participant_id
                ORDER BY pr.score DESC, p.created_at ASC
            `;

            database.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Erreur récupération classement:', err);
                    return res.status(500).json({ 
                        error: 'Erreur serveur' 
                    });
                }

                const classement = rows.map((row, index) => ({
                    position: index + 1,
                    id: row.id,
                    nom: row.nom,
                    photo: row.photo ? `/uploads/${row.photo}` : null,
                    preference_prix: row.preference_prix,
                    score: row.score || 0,
                    pronostics: {
                        sexe: row.sexe,
                        prenom: row.prenom,
                        poids: row.poids,
                        taille: row.taille,
                        couleur_cheveux: row.couleur_cheveux,
                        type_cheveux: row.type_cheveux,
                        date_naissance: row.date_naissance,
                        heure_naissance: row.heure_naissance
                    }
                }));

                res.json(classement);
            });

        } catch (error) {
            console.error('Erreur génération classement:', error);
            res.status(500).json({ 
                error: 'Erreur serveur' 
            });
        }
    }
}

module.exports = ParticipantController;