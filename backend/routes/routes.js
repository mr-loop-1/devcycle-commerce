const express = require('express');

const router = express.Router();

router.get('/home');
router.get('/cart');

router.post('/metrics');

module.exports = router;
