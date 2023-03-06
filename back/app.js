//password CaIW23yvleDkTbJX coupé ?retryWrites=true&w=majority
const express = require("express");
const mongoose = require("mongoose");
const autRoutes = require("./routes/authRoutes");

const app = express();

//middleware
app.use(express.json({ extended: false }));
//database connection
const dbURI =
  "mongodb+srv://lucasmortelette62:CaIW23yvleDkTbJX@cluster0.zr1svt8.mongodb.net/auth";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(3000, () => console.log("listening on port 3000"))
  )
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(autRoutes);
