const express = require("express");
const pug = require("pug");

const app = express();
app.set("view engine", "pug");

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/createlist", function(req, res) {
    res.render("createlist");
})

app.get("/search", function(req, res) {
    res.render("search");
})

app.get("/profile", function(req, res) {
    res.render("profile");
})

app.listen(3000, function() {
    console.log("Listening on 3000");
});