const express = require("express");
const cors = require("cors");
const User = require("./config");
const app = express();
app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.post("/create", async (req, res) => {
  const data = req.body;
  const id = req.body.id;
  await User.add({ data });
  res.send({ msg: id + "Location tillagd" });
});

app.post("/update", async (req, res) => {
  const id = req.body.id;

  const data = req.body;
  await User.doc(id).update(data);
  res.send({ msg: "Uppdaterad!" });
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  await User.doc(id).delete();
  res.send({ msg: id + "Borttagen" });
});
app.listen(4000, () => console.log("server igång på 4000"));
