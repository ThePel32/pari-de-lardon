const express = require('express');
const cors = require('cors');

const database = require('./config/database');
const { uploadsDir } = require('./config/upload');

const participantsRoutes = require('./routes/participants');
const resultatsRoutes = require('./routes/resultats');

const { notFoundHandler, globalErrorHandler, requestLogger } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(uploadsDir));

async function initializeServer() {
    try {
        const db = await database.connect();
        app.locals.database = db;
        startServer();
    } catch (error) {
        console.error('Erreur initialisation serveur:', error);
        process.exit(1);
    }
}

function startServer() {
    app.use('/api/participants', participantsRoutes);
    app.use('/api/resultats-reels', resultatsRoutes);

    app.get('/', (req, res) => {
        res.json({
            message: "API Le Pari du Lardon",
            version: "2.0.0 - Architecture MVC",
            timestamp: new Date().toISOString(),
            endpoints: {
                health: "/api/health",
                participants: "/api/participants",
                classement: "/api/participants/classement",
                resultats: "/api/resultats-reels"
            },
            architecture: {
                frontend: "React.js",
                backend: "Node.js + Express (MVC)",
                database: "SQLite",
                structure: {
                    config: "Configuration (DB, upload)",
                    controllers: "Logique métier",
                    routes: "Endpoints API",
                    services: "Services utilitaires",
                    middlewares: "Gestion d'erreurs et logs"
                }
            }
        });
    });

    app.get('/api/health', (req, res) => {
        res.json({ 
            status: 'OK', 
            database: 'connected',
            version: '2.0.0 - MVC',
            uptime: Math.floor(process.uptime()),
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
            }
        });
    });

    app.use(notFoundHandler);
    app.use(globalErrorHandler);

    app.listen(PORT, () => {
        console.log(`Serveur Le Pari du Lardon démarré sur http://localhost:${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
}

process.on('SIGINT', async () => {
    console.log('Arrêt du serveur en cours...');
    
    try {
        await database.close();
        console.log('Serveur arrêté avec succès');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de l\'arrêt:', error);
        process.exit(1);
    }
});

process.on('SIGTERM', async () => {
    try {
        await database.close();
        process.exit(0);
    } catch (error) {
        console.error('Erreur SIGTERM:', error);
        process.exit(1);
    }
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesse rejetée non gérée:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Exception non capturée:', error);
    process.exit(1);
});

initializeServer();