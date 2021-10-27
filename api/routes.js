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

router.get('/chatlist', auth, controllers.getChatlist);
// router.get('/conversation', auth, controllers.getConversation);
// router.get('/example', auth, controllers.getExample);

router.post('/addPhoto', upload.single('photo'), controllers.postAddPhoto);
// router.post('/addMessage', auth, controllers.setExample);
// router.post('/newChat', auth, controllers.setExample);

// router.put('/readMessage', auth, controllers.putReadMessages);

// router.put('/deletePhoto', auth, controllers.putDeletePhoto);



module.exports = router;