const express = require('express');

router = express.Router();

router.get('/', (request, response) => {
    return response.json({ success: true });
});

module.exports = router;
