const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        this.db = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            const dbPath = path.join(__dirname, '..', 'database', 'pari_du_lardon.db');
            
            this.db = new sqlite3.Database(dbPath, (err) => {
                if (err) {
                    console.error('Erreur de connexion à la base de données:', err.message);
                    reject(err);
                } else {
                    console.log('Connecté à la base de données SQLite.');
                    this.initializeDatabase()
                        .then(() => resolve(this.db))
                        .catch(reject);
                }
            });
        });
    }

    initializeDatabase() {
        return new Promise((resolve, reject) => {
            const tables = [
                `CREATE TABLE IF NOT EXISTS participants (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nom TEXT NOT NULL,
                    photo TEXT,
                    preference_prix TEXT CHECK(preference_prix IN ('jambon', 'fromage')),
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`,
                
                `CREATE TABLE IF NOT EXISTS pronostics (
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
                )`,
                
                `CREATE TABLE IF NOT EXISTS resultats_reels (
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
                )`
            ];

            let completed = 0;
            
            tables.forEach((tableSQL, index) => {
                this.db.run(tableSQL, (err) => {
                    if (err) {
                        console.error(`Erreur création table ${index + 1}:`, err);
                        reject(err);
                        return;
                    }
                    
                    completed++;
                    if (completed === tables.length) {
                        resolve();
                    }
                });
            });
        });
    }

    getDatabase() {
        return this.db;
    }

    close() {
        return new Promise((resolve) => {
            if (this.db) {
                this.db.close((err) => {
                    if (err) {
                        console.error('Erreur fermeture BDD:', err.message);
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
}

const database = new Database();
module.exports = database;