require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUploadRoutes = require("./fileUploadRoutes");
const app = express();
const config = require("./mongo");

config.connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));

app.use(express.static(path.join(__dirname, "build")));

// make the '/api/document' browser url route to go to documentRoutes.js route file
app.use("/api/document", fileUploadRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000,function(){
    console.log("server startes at 3000")
})



