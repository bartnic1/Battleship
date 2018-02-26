const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");

// http://localhost:8080

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use("/public",express.static(__dirname + "/public"));
//Doesn't seem to work:
// app.use(express.static('./public'))


const gridSettings = {
  gridBoundary: {letters: 'abcdefghij'}
};

app.get("/battle", (req, res) => {
  res.render("battlepage", gridSettings);
});

app.get("/", (req, res) => {
  res.render("intro");
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});