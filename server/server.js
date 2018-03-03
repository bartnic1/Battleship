const express = require("express");
const app = express();
// http://localhost:8080
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
//Add ?_method=DELETE to the end of your normal path, also use POST
const methodOverride = require('method-override');
const path = require("path");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '..', 'public')));

const gridSettings = {
  gridBoundary: {letters: 'ABCDEFGHIJ'}
};

app.get("/battle", (req, res) => {
  res.render("battle", gridSettings);
});

app.get("/", (req, res) => {
  res.render("intro");
});

app.post("/battle", (req, res) => {
  console.log("request", req.body);
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});