require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');


var user = require("./controllers/usercontroller");
var fish = require("./controllers/logcontroller")

sequelize.sync();
app.use(require('./middleware/header'));
app.use(express.json());

app.use("/api/user", user);
//app.use("/test-controller", test);
app.use(require('./middleware/validate-session'))
app.use(express.json());
app.use("/api", fish)
//app.use('/test', test)

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`)
})