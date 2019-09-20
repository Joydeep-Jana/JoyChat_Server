const express = require('express');
const router = express.Router();

router.get('/', (req, res) => 
{
    res.send('Welcome');
});


//exports
module.exports = router;