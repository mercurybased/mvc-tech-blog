const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/', async (req,res) => {
  try {
    const postData = await postData.findAll()
    res.status(200).json(postData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  console.log("test")
  if(!req.session.logged_in){
    return res.status(403).json({msg:"login first!"})
  }
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id/edit", (req, res) => {
  Post.update(req.body,{
    where: {
      id: req.params.id
    },
    include: [User],
  }).then((projData) => {
    console.log(projData)
    // const hbsData = projData.get({ plain: true });
    // hbsData.logged_id = req.session.logged_id;
    // console.log(hbsData);
    // res.render("editPost", hbsData);
    res.status(200).end()
  });
});


router.delete('/:id', async (req, res) => {
  if(!req.session.logged_in){
    return res.status(403).json({msg:"login first!"})
  }
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
