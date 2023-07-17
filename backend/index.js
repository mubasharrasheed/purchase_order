require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/connect-mongoose");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is runing on PORT ${process.env.PORT}`);
});
