const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");
const path = require("path");

// http://localhost:8080
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"../../public")));

const gridSettings = {
  gridBoundary: {letters: 'abcdefghij'}
};

app.get("/battle", (req, res) => {
  res.render("battle", gridSettings);
});

app.get("/", (req, res) => {
  res.render("intro");
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});