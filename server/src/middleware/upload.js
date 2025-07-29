import multer from "multer";

// for local storage upload -------uncomment for use----------

/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname);
    }
})
*/

// for cloud upload (e.g., Cloudinary, S3) via memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  //-------IF USE FILE SIZE LIMITITATIONS---------
  /*
    limits: {
        fileSize: 1000000 // 1MB limit
    },
*/
  //-------IF USE FILE FILTER---------
  /*
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only jpg, jpeg, and png are allowed.'));
        }
    }

*/
});
export default upload;
