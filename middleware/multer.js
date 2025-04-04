import multer from 'multer'

 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, 'uploads')
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        let fileName = Date.now() + '-' + file.originalname
        cb(null,fileName)
    }
})

const upload = multer({ storage: storage})

export default upload