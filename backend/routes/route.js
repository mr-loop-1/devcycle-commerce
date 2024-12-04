const express = require('express');

const router = express.Router();

router.get('/all');
router.get('/cart');

// router.post('/metrics');

module.exports = router;
