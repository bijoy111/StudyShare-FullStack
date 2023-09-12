const router = require('express').Router();
const dbServices = require('../db/dbServices.js');
const multer = require('multer');


const storage = multer.memoryStorage(); 
var upload = multer({ storage });

const {
    fileViewGetController,
    fileViewPostController,
    fileUploadGetController,
    fileUploadPostController,
    fileDownloadGetController,
    fileDownloadPostController,
} = require('../controllers/fileController.js')

router.get('/:course_id',fileViewGetController);
router.post('/:course_id',fileViewPostController);
router.get('/upload/:course_id',fileUploadGetController);
router.post('/upload/:course_id', upload.single('file'),fileUploadPostController);
router.get('/download',fileDownloadGetController);
router.post('/download',fileDownloadPostController);

module.exports = router;
