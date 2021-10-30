const router = require('express').Router();
const controllers = require('./controllers');
const auth = require('./middleware').auth;
const helpers = require('./helpers');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: helpers.filefilter,
  limits: {
    fileSize: 6000000
  }
});

router.get('/chatlist', controllers.getChatlist);
router.get('/conversation', controllers.getConversation);

router.post('/add-photo', upload.single('photo'), controllers.postNewPhoto);
router.post('/add-message', upload.single('photo'), controllers.postNewMessage);
router.post('/new-conversation', upload.single('photo'), controllers.postNewConversation);

router.delete('/delete-photo', controllers.deletePhoto);



module.exports = router;