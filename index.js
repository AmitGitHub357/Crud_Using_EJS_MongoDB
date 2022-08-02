var express = require("express");
var app = express();
var mongoose = require("mongoose");
var User = require("./models/index.js");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/Crud", {
  useNewUrlParser: true,
  //   useFindAndModify: false,
  useUnifiedTopology: true,
});

var connection = mongoose.connection;
connection.once("open", function () {
  console.log("Connection Successfully");
});
app.set("view engine", "ejs");

app.get("/", (req, resp) => {
  resp.render("Insert");
});

app.post("/insert", (req, resp) => {
  var user = new User({
    userName: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    status: req.body.status,
    gender: req.body.gender,
  });
  user.save(() => {
    resp.redirect("Show");
  });
});

app.get("/show", (req, resp) => {
  User.find({}, (err, result) => {
    resp.render("Show", { users: result });
  });
});

app.get("/delete/:id", async (req, resp) => {
  await User.findByIdAndDelete(req.params.id);
  resp.redirect("/Show");
});

app.get("/edit/:id", async (req, resp) => {
  User.findById(req.params.id, (err, result) => {
    resp.render("Edit", { users: result });
  });
  // resp.redirect("/Edit");
});

app.post('/update/:id',async (req,resp) => {
  await User.findByIdAndUpdate(req.params.id,req.body);
  console.log(req.params.id,req.body);
  resp.redirect('/Show');
});

app.get('/view/:id',(req,resp) => {
  User.findById(req.params.id, (err, result) => {
    resp.render("P_View", { users: result });
  });
})
// });

app.listen(3001, () => {
  console.log("Server Started on port Number 3001");
});
