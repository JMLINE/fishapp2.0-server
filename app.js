require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");


let user = require("./controllers/usercontroller");
let fish = require("./controllers/logcontroller")

sequelize.sync();
app.use(express.json());

app.use(require('./middleware/header'))

app.use("/user", user);

// app.use(require('./middleware/validate-session'))

app.use("/api", fish)


app.listen(process.env.PORT, function () {
  console.log(`app is listening on ${process.env.PORT} and hello world`);
});