const router = require("express").Router();
const Datas = require("../models/datasmodel");

router.post("/", async (req, res) => {
  const password = req.body;
  console.log(password);
  const insertResult = await Datas.create(password);
  res.status(201).json({ success: true, result: insertResult });
});

module.exports = router;
