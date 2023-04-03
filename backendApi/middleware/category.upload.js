const multer = require('multer')
const Path = require('path')

// for file upload..
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // cb takes error, destination path
    // all the category images will be uploaded here..
    cb(null, "./uploads/categories")
  },
  // with following filename..
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// validation
const fileFilter = (req, file, cb) => {
    const acceptableExtensions = ['png', '.jpg', 'jpeg']
    if(!acceptableExtensions.includes(Path.extname(file.originalname))) {
        return cb(new Error('Only .png, .jpg and jpeg formats are allowed!'))
    }

    const fileSize = parseInt(req.headers['content-length'])

    if(fileSize > 1048576) {
        return cb(new Error('File size too big!'))
    }

    cb(null, true)
}

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    fileSize: 1048576,
})

module.exports = upload.single('categoryImage')