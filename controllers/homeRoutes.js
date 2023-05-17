const express = require("express");
const router = express.Router();
const { Post, User } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    include: [User],
  }).then((postData) => {
    const hbsData = postData.map((post) => post.get({ plain: true }));
    console.log(hbsData);
    res.render("homepage", {
      allPosts: hbsData,
      logged_in: req.session.logged_in,
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
    }).then((userData) => {
        console.log(userData)
      const hbsData = userData.map((post) => post.get({ plain: true }));
      userData.logged_in = req.session.logged_in;
      console.log(req.session);
      res.render("profile", { posts: hbsData, user: req.session.username });
    }).catch(err => {
        console.log(err)
    })
  }
});

module.exports = router;
