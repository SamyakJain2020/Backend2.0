const express = require("express");
const router = express.Router();
const { signin, signout, signup, getUserInfo,deleteUser } = require("../controllers/user");



router.get((req,res)=>{
    res.send("ok");
})

router.post("/user/signup", signup);
router.post("/user/signin", signin);
router.get("/user/viewall", getUserInfo);

module.exports = router;