const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('homepage',{
        users:[{
            name:"Cate",
            email:"Cate@cate.com"
        }]
    })
  });


module.exports = router;