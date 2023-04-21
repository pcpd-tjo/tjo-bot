import { express } from 'express'
const app = express();

app.get("/", () => {
  
})

const listener = app.listen(process.env.PORT, () => {
  let address = listener.address()
  console.log("Your app is listening on port " + address.port);
  console.log(address);
});
