const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('viewsindex', {// ----- >?
        title: 'Welcome to the library'
    })
});

module.exports = router;