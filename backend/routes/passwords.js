const router = require("express").Router()
const Datas = require("../models/datasmodel")



router.get("/",async (req, res) => {
   try {
    const findResult = await Datas.find({});
    res.json(findResult);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
})

module.exports = router;