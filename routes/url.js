const express = require('express')
const {generateNewShortUrl, visitedTimeHistory, getAnalytics} = require('../controllers/url')

router = express.Router();

router.post('/', generateNewShortUrl);
// router.get('/:shortId', visitedTimeHistory);
router.get('/analytics/:shortId', getAnalytics)

module.exports = router;