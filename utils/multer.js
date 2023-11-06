const multer = require('multer')
const path = require('path')

const upload = multer({
    dest: 'uploads/',
    limits: {fileSize: 50 * 1024 * 1024},
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
    }),
    
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);

        if( ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.mp4' && ext !== '.webp'){
            cb(new Error('File type is not supported'), false);
            return;
        }
        
        cb(null, true);
    }
})