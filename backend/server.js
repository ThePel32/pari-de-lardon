const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Seules les images sont autorisées!'), false);
        }
    }
});

app.use('/uploads', express.static(uploadsDir));

const db = new sqlite3.Database('./pari_du_lardon.db', (err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        photo TEXT,
        preference_prix TEXT CHECK(preference_prix IN ('jambon ', 'fromage ')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS pronostics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        participant_id INTEGER,
        sexe TEXT,
        prenom TEXT,
        poids REAL,
        taille INTEGER,
        couleur_cheveux TEXT,
        type_cheveux TEXT,
        date_naissance TEXT,
        heure_naissance TEXT,
        score INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (participant_id) REFERENCES participants(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS resultats_reels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sexe TEXT,
        prenom TEXT,
        poids REAL,
        taille INTEGER,
        couleur_cheveux TEXT,
        type_cheveux TEXT,
        date_naissance TEXT,
        heure_naissance TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log('Tables créées');
}

app.get('/', (req, res) => {
    res.json({
        message: "API Le Pari du Lardon fonctionnelle",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', database: 'connected'});
});

// ROUTES API

app.post('/api/participants', upload.single('photo'), (req, res) => {
    const { nom, preference_prix, sexe, prenom, poids, taille, couleur_cheveux, type_cheveux, date_naissance, heure_naissance } = req.body;
    
    if (!nom || !nom.trim()) {
        return res.status(400).json({ error: 'Le nom est requis' });
    }

    const photoFilename = req.file ? req.file.filename : null;

    db.run(`INSERT INTO participants (nom, photo, preference_prix) VALUES (?, ?, ?)`, 
        [nom.trim(), photoFilename, preference_prix], 
        function(err) {
            if (err) {
                console.error('Erreur insertion participant:', err);
                return res.status(500).json({ error: 'Erreur création participant' });
            }

            const participantId = this.lastID;

            db.run(`INSERT INTO pronostics (participant_id, sexe, prenom, poids, taille, couleur_cheveux, type_cheveux, date_naissance, heure_naissance) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [participantId, sexe, prenom, poids, taille, couleur_cheveux, type_cheveux, date_naissance, heure_naissance],
                function(err) {
                    if (err) {
                        console.error('Erreur insertion pronostics:', err);
                        return res.status(500).json({ error: 'Erreur création pronostics' });
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
});

app.get('/api/participants', (req, res) => {
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

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Erreur récupération participants:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
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
});

app.get('/api/resultats-reels', (req, res) => {
    db.get('SELECT * FROM resultats_reels ORDER BY updated_at DESC LIMIT 1', [], (err, row) => {
        if (err) {
            console.error('Erreur récupération résultats:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
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
    });
});

app.post('/api/resultats-reels', (req, res) => {
    const { sexe, prenom, poids, taille, couleur_cheveux, type_cheveux, date_naissance, heure_naissance } = req.body;

    db.run('DELETE FROM resultats_reels', [], (err) => {
        if (err) {
            console.error('Erreur suppression anciens résultats:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }

        db.run(`INSERT INTO resultats_reels (sexe, prenom, poids, taille, couleur_cheveux, type_cheveux, date_naissance, heure_naissance) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [sexe, prenom, poids, taille, couleur_cheveux, type_cheveux, date_naissance, heure_naissance],
            function(err) {
                if (err) {
                    console.error('Erreur insertion résultats:', err);
                    return res.status(500).json({ error: 'Erreur sauvegarde résultats' });
                }

                calculerTousLesScores(req.body, (err) => {
                    if (err) {
                        console.error('Erreur calcul scores:', err);
                        return res.status(500).json({ error: 'Erreur calcul scores' });
                    }

                    res.json({ message: 'Résultats enregistrés et scores calculés' });
                });
            }
        );
    });
});

app.get('/api/classement', (req, res) => {
    const query = `
        SELECT 
            p.id, p.nom, p.photo, p.preference_prix,
            pr.score, pr.sexe, pr.prenom, pr.poids, pr.taille,
            pr.couleur_cheveux, pr.type_cheveux, pr.date_naissance, pr.heure_naissance
        FROM participants p
        LEFT JOIN pronostics pr ON p.id = pr.participant_id
        ORDER BY pr.score DESC, p.created_at ASC
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Erreur récupération classement:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
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
});

function calculerScore(pronostics, reelles) {
    let score = 0;

    if (pronostics.sexe === reelles.sexe) score += 10;
    if (pronostics.prenom && pronostics.prenom.toLowerCase() === reelles.prenom.toLowerCase()) score += 5;
    if (pronostics.couleur_cheveux === reelles.couleur_cheveux) score += 8;
    if (pronostics.type_cheveux === reelles.type_cheveux) score += 8;

    const diffPoids = Math.abs(parseFloat(pronostics.poids || 0) - parseFloat(reelles.poids || 0));
    if (diffPoids <= 0.1) score += 10;
    else if (diffPoids <= 0.3) score += 7;
    else if (diffPoids <= 0.5) score += 5;

    const diffTaille = Math.abs(parseInt(pronostics.taille || 0) - parseInt(reelles.taille || 0));
    if (diffTaille <= 1) score += 10;
    else if (diffTaille <= 2) score += 7;
    else if (diffTaille <= 3) score += 5;

    if (pronostics.date_naissance === reelles.date_naissance) score += 12;
    if (pronostics.heure_naissance === reelles.heure_naissance) score += 10;

    return score;
}

function calculerTousLesScores(donneesReelles, callback) {
    const query = `
        SELECT pr.*, p.id as participant_id 
        FROM pronostics pr 
        JOIN participants p ON pr.participant_id = p.id
    `;

    db.all(query, [], (err, pronostics) => {
        if (err) return callback(err);

        let completed = 0;
        const total = pronostics.length;

        if (total === 0) return callback(null);

        pronostics.forEach(pronostic => {
            const score = calculerScore(pronostic, donneesReelles);
            
            db.run('UPDATE pronostics SET score = ? WHERE participant_id = ?', 
                [score, pronostic.participant_id], 
                (err) => {
                    completed++;
                    if (err) return callback(err);
                    if (completed === total) callback(null);
                }
            );
        });
    });
}



app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log(`API disponible à l'adresse http://localhost:${PORT}/api/health`);
});

process.on('SIGINT', () => {
    console.log('\n Arrêt du serveur...');
    db.close((err) => {
        if (err) {
            console.log('Erreur fermeture BDD', err.message);
        } else {
            console.log('Base de données fermée.');
        }
        process.exit(0);
    });
});

