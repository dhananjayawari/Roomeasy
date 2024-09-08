const instance = require("../config/razorpay")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {paymentSuccessful} = require("../mail/templates/paymentSuccessEmail")


exports.capturePayments = async (req,res) =>{
    const userId = req.user.id;
     
}