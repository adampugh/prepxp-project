var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/createlist", function(req, res) {
    res.render("createlist");
})

router.get("/search", function(req, res) {
    res.render("search");
})

router.get("/profile", function(req, res) {
    res.render("profile");
})

module.exports = router;