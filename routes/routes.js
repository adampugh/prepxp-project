const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/user.js");


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


router.get("/createlist", function(req, res) {
    if (!req.session.userId) {
        var err = new Error("Please log in");
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                return res.render("createlist", {username: user.username})
            }
        });
})

router.get("/search", function(req, res) {
    if (!req.session.userId) {
        var err = new Error("Please log in");
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                return res.render("search", {username: user.username})
            }
        });
})

router.get("/profile", function(req, res) {
    if (!req.session.userId) {
        var err = new Error("Please log in");
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                return res.render("profile", {username: user.username})
            }
        });
})

module.exports = router;