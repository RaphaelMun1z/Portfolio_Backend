const multer = require("multer")
const path = require("path")

// Destination to store image

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = ""

        console.log(req.baseUrl)
        if (req.baseUrl === "/api/projects") {
            folder = "projectsBanner"
            console.log("A")
        } else if (req.baseUrl === "/api/projects-image") {
            folder = "image"
            console.log("B")
        }

        cb(null, `uploads/${folder}/`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie apenas png ou jpg!"))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }