const router = require('express').Router();

router.post('/login', (req, res, next)=> {
    console.log('login_action')
    res.success('','success');
});

module.exports = router;
