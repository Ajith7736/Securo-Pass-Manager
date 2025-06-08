const router = require("express").Router()
const Datas = require("../models/datasmodel")




router.delete("/", async (req, res) => {
  const password = req.body;
  console.log(password);
  const DeleteResult = await Datas.deleteOne(password);
  res.status(201).json({success:true,result:DeleteResult});
})

module.exports = router;