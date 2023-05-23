const express = require("express");
const router = express.Router();
const { Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    include: [User],
  }).then((postData) => {
    const hbsData = postData.map((post) => ({
      ...post.get({ plain: true }),
      logged_in: req.session.logged_in,
      logged_in_user: req.session.user_id,
    }));
    res.render("homepage", {
      allPosts: hbsData,
      logged_in: req.session.logged_in,
      logged_in_user: req.session.user_id,

    });
  });
});

router.get("/post/:id", (req, res) => {
  Post.findByPk(req.params.id, {
    include: [User],
  }).then((projData) => {
    const hbsData = projData.get({ plain: true });
    hbsData.logged_id = req.session.logged_id;
    console.log(hbsData);
    res.render("singlePost", hbsData);
  });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/profile");
  }
  res.render("login", {
    logged_in: req.session.logged_in,
  });
});

router.get("/posts/:id/comments", (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect("/login");
  } else {
    console.log(req.session);
    Post.findAll({
      where: {
        id: req.params.id,
      },
      include: [User, {model: Comment, include: [User]}],
    }).then((userData) => {
      const hbsData = userData.map((post) => post.get({ plain: true }));
      console.log(hbsData[0].comments)
      userData.logged_in = req.session.logged_in;
      console.log(req.session);
      res.render("posts", { ...hbsData[0], user: req.session.username });
    }).catch(err => {
        console.log(err)
    })
  }
});
router.get("/profile", (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect("/login");
  } else {
    console.log(req.session);
    Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [User],
    }).then(async (userData) => {
      let user = await User.findByPk(req.session.user_id)
      user = user.get({ plain: true });
      console.log(user)
      const hbsData = userData.map((post) => post.get({ plain: true }));
      console.log(hbsData)
      userData.logged_in = req.session.logged_in;
      console.log(req.session);
      res.render("profile", { posts: hbsData, user: req.session.username, username:user.username });
    }).catch(err => {
        console.log(err)
    })
  }
});

router.get("/posts/:id/edit", (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect("/login");
  } else {
    console.log(req.session);
    Post.findAll({
      where: {
        id: req.params.id,
      },
      include: [User, {model: Comment, include: [User]}],
    }).then((userData) => {
      const hbsData = userData.map((post) => post.get({ plain: true }));
      console.log(hbsData[0])
      userData.logged_in = req.session.logged_in;
      console.log(req.session);
      res.render("editPost", { ...hbsData[0], user: req.session.username });
    }).catch(err => {
        console.log(err)
    })
  }
});

module.exports = router;
