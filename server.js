import express from "express";
const app = express();
export default async function () {
  app.get("/", (req, res) => {
    if (res.statusCode == 200) {
      res.json({ message: "TJO BOT ONLINE", status: res.statusCode });
    } else {
      res.sendStatus(200)
    }

  });

  const listener = app.listen(3001, () => {
    console.log("Your app is listening on port " + listener.address().port);
    console.log(listener.address());
  });
}