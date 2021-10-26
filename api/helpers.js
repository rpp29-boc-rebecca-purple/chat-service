const multer = require('multer');

module.exports = {

  storage: multer.memoryStorage(),
  filefilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
};