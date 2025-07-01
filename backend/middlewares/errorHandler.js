const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        error: 'Route non trouvée',
        path: req.originalUrl,
        message: 'Vérifiez votre URL ou consultez /api/health pour les endpoints disponibles',
        timestamp: new Date().toISOString()
    });
};

const globalErrorHandler = (err, req, res, next) => {
    console.error('Erreur serveur:', err);
    
    if (err.code && err.code.startsWith('LIMIT_')) {
        return res.status(400).json({
            error: 'Erreur upload fichier',
            message: err.message
        });
    }
    
    if (err.code && (err.code === 'SQLITE_CONSTRAINT' || err.code.startsWith('SQLITE_'))) {
        return res.status(400).json({
            error: 'Erreur base de données',
            message: 'Données invalides ou contrainte violée'
        });
    }
    
    res.status(err.status || 500).json({
        error: 'Erreur interne du serveur',
        message: process.env.NODE_ENV === 'production' 
            ? 'Une erreur est survenue' 
            : err.message,
        timestamp: new Date().toISOString()
    });
};

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
};

module.exports = {
    notFoundHandler,
    globalErrorHandler,
    requestLogger
};