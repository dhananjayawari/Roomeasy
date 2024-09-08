const express = require('express');
const router = express.Router();

const { login, signup,logout } = require("../controllers/auth");
const {createProperty} = require("../controllers/createProperty");
const { ensureAuthenticated , isCustomer, isOwner,protect } = require("../middlewares/auth");
const {likeProperty,unlikeProperty} = require("../controllers/likeController");

router.post("/signup", signup);
router.post("/login", login);

// Testing Route for Middleware

router.get("/",(req,res) => {
    res.json({
        success: true,
        message: "this is home page"
    })
});


// router.post('/listProperty',ensureAuthenticated ,isOwner, createProperty,(req,res) => {
//     res.json({
//         success:true,
//         message:"property added successfully"
//     })
// });

// router.post("/likes/like",ensureAuthenticated ,isCustomer,likeProperty,(req,res)=>{
//     res.json({
//         success:true,
//         message:"property is liked"
//     })
// });

// router.post("/likes/unlike",ensureAuthenticated,isCustomer,unlikeProperty);

router.get('/logout', logout);

module.exports = router;