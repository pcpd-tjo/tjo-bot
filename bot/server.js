/* eslint-disable no-undef */
const express = require("express");
const app = express();
module.exports = async function () {    
    app.get("/", (req, res) => {
        if (res.statusCode == 200) {
          res.json({ message: "TJO BOT ONLINE", status: res.statusCode});
        } else {
          res.sendStatus(200)
        }
        
      });
      
      const listener = app.listen(3000, () => {
        console.log("Your app is listening on port " + listener.address().port);
        console.log(listener.address());
      });
}