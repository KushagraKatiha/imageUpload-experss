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
    
    fileFilter(req, file, cb){
        const ext = path.extname(file.originalname)

        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg'){
            cb(new Error('File type is not supported'), false)
            return
        }
        cb(null, true)
    }
})


module.exports = upload;