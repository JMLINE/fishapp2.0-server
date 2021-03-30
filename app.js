require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');


var user = require("./controllers/usercontroller");
var fish = require("./controllers/logcontroller")

app.use(express.json());
sequelize.sync();
app.use(require('./middleware/header'));

app.use("/api/user", user);
//app.use("/test-controller", test);
app.use(require('./middleware/validate-session'))

app.use("/api", fish)
//app.use('/test', test)

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`)
})


//needing to add this line so I can push