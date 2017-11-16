const express = require("express");
const pug = require("pug");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const app = express();
const port = process.env.PORT || 3000;


//mongodb connection
mongoose.connect("mongodb://admin:test@ds161833.mlab.com:61833/prepxp", {userClient: true});
var db = mongoose.connection;

//mongo error
db.on("error", console.error.bind(console, "connection error:"));

//session middleware for tracking logins
app.use(session({
    secret: "2pacisalive",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));


// make session ID available to templates
app.use(function(req, res, next) {
    // locals allows you add variables to the response obj
    res.locals.currentUser = req.session.userId;
    next();
});


// routing
const routes = require("./routes/routes");
const router = express.Router();

// view set to pug
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use("/", routes);
app.use(express.static("public"));




//error handlers
// 404 error and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("File Not Found");
    err.status = 404;
    next(err);
})

// handle server errors - use as last app.use callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("header", { message: err.message, error: {}});
});



app.listen(port, function() {
    console.log("Listening on 3000 or port");
});