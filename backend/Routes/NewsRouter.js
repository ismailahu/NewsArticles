const express = require("express");
router = express.Router();
const { GetAllNews, GetNews, AddNews, EditNews } = require('../Controllers/NewsController');
const Auth = require("../Middlewares/Auth");

router.get('/', Auth, GetAllNews);
router.get('/:NewsTitle', Auth, GetNews);
router.put('/editNews', Auth, EditNews)
router.post('/addNews', Auth, AddNews);

module.exports = router;