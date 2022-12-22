require('dotenv').config()
const express = require("express");
const app = express();
app.use(express.static("public"));

function func() {
  console.log("OMGOMGOMGOMG")
}
app.get("/", (req, res) => {
  res.send(process.env.STATUS)
})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
  console.log(listener.address());
});

module.exports = func, app 