const express = require("express");
const app = express();
const routes = require("./routes/routes");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
