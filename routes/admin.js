

const express = require('express');


const router = express.Router();

router.get('/add-product',(req, res, next) =>{
    // console.log("in another middleware!");
    res.send('<form action="/productMessage" method="POST"><input type="text" name="message"><button type="submit">send</button></form>');
});
router.post('/productMessage', (req, res, next) =>{
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;