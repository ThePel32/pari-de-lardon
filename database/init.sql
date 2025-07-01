CREATE TABLE IF NOT EXISTS participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    photo TEXT,
    preference_prix TEXT CHECK(preference_prix IN ('jambon', 'fromage')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pronostics (
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
);

CREATE TABLE IF NOT EXISTS resultats_reels (
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
);

CREATE INDEX IF NOT EXISTS idx_participant_id ON pronostics(participant_id);
CREATE INDEX IF NOT EXISTS idx_score ON pronostics(score DESC);