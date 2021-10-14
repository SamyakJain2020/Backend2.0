const express = require("express");
const router = express.Router();
const { create,view} = require("../controllers/todo");//, update, completed, deleteTodo,view

router.get((req,res)=>{
    res.send("ok");
})

//middlewares
const { isSignedIn} = require("../middleware/auth");

router.use(...isSignedIn());

router.post("/todo/create", create);
// router.post("/todo/completed", completed);
// router.post("/todo/delete", deleteTodo);

// router.put("/todo/update/:id", update);

router.get("/todo/view", view);
// router.get("/todo/view/:id", view);

module.exports = router;