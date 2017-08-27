const express = require("express");
const pug = require("pug");
const app = express();
const routes = require("./routes/routes");

app.set("view engine", "pug");

app.use("/", routes);
app.use(express.static("public"));



app.listen(3000, function() {
    console.log("Listening on 3000");
});