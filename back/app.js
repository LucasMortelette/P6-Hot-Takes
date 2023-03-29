const express = require("express");
const mongoose = require("mongoose");
const autRoutes = require("./routes/authRoutes");
const saucesRoutes = require("./routes/saucesRoutes");
const cors = require("cors");

const app = express();

//middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use("/api/sauces/:id", function (req, res, next) {
  // console.log("Request Id:", req.params.id);
  next();
});
//database connection
const dbURI = `mongodb+srv://lucasmortelette62:CaIW23yvleDkTbJX@cluster0.zr1svt8.mongodb.net/auth`;

app.use(express.static("./images"));
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
// Va servir les routes dédiées aux sauces
app.use(saucesRoutes);
