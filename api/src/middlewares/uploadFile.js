import multer from "multer";

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let staticFolder = req.query.staticFolder || "./public";

        return cb(null, staticFolder);
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_${file.originalname}`;
        return cb(null, fileName);
    },
});

const upload = multer({
    storage: storage
});

export default upload;