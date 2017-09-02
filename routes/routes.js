const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/user.js");
const mid = require("../middleware/mid.js");


router.get("/", function(req, res) {
    res.render("index");
});

router.post("/signup", function(req, res, next) {
    if (req.body.userName && req.body.userEmail && req.body.userPassword) {
        var userData = {
            username: req.body.userName,
            email: req.body.userEmail,
            password: req.body.userPassword
        };

        //insert document into mongo
        User.create(userData, function(error, user) {
            if (error) {
                return (error);
            } else {
                req.session.userId = user._id;
                return res.redirect("profile");
            }
        });

    } else {
        var err = new Error("All fields required");
        err.status = 400;
        return next(err);
    }
});

router.post("/login", function(req, res, next) {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function(error, user) {
            if (error || !user) {
                var err = new Error("Wrong email or password");
                err.status = 401;
                return next(err);
            } else {
                // add or create user session
                req.session.userId = user._id;
                return res.redirect("profile");
            }
        });
    } else {
        var err = new Error ("Email and password required");
        err.status = 401;
        next(err);
    }
});

router.get("/logout", mid.requiresLogin, function(req, res, next) {
    if (req.session) {
        // if exists delete it
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect("/");
            }
        });
    }
});




router.get("/createlist", mid.requiresLogin, function(req, res) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                return res.render("createlist", {username: user.username})
            }
        });
})

router.post("/profile", mid.requiresLogin, function(req, res) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                
                var questionsObj = JSON.parse(req.body.questionList);

                user.questionLists.push(questionsObj);

                user.save(function(err) {
                    if (err) {
                        var err = new Error("Failed to save to database");
                        err.status = 500;
                        next(err);
                    } else {
                        res.end();
                    }
                });
            }
        });
});

router.get("/search", mid.requiresLogin, function(req, res) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                return res.render("search", {username: user.username})
            }
        });
})

router.get("/profile", mid.requiresLogin, function(req, res) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                return res.render("profile", {username: user.username, questionLists: user.questionLists});
            }
        });
})

module.exports = router;