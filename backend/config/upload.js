const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, uniqueSuffix + extension);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Seules les images sont autorisées!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: fileFilter
});

const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                error: 'Fichier trop volumineux (max 10MB)' 
            });
        }
        return res.status(400).json({ 
            error: `Erreur upload: ${err.message}` 
        });
    }
    
    if (err) {
        return res.status(400).json({ 
            error: err.message 
        });
    }
    
    next();
};

module.exports = {
    upload,
    handleUploadError,
    uploadsDir
};