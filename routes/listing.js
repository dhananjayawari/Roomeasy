const express = require("express");
const router = express.Router();
const {createListing,
    deleteListing,
    updateListing,
    getSearchListings,
    getUserListing,
    getListingDetails,
    getRandomListings,
    getListingTypes,
    getListingCities,
    hideProperty,
    unhideProperty,
    getUserHiddenListing,
    getLocalitiesByCity,
    uploadImages} = require("../controllers/listing");
const {auth,
    
} = require("../middleware/auth")


router.post("/createListing" ,auth,createListing);
router.delete("/deleteListing",auth,deleteListing );
router.get("/getSearchListings",getSearchListings );
router.get("/getRandomListings",getRandomListings);
router.get("/getUserListings",auth,getUserListing);
router.get("/getUserHiddenListings",auth,getUserHiddenListing);
router.post("/updateListing",auth,updateListing);
router.get("/getListingDetails",getListingDetails);
router.get("/getListingCities",getListingCities);
router.get("/getListingTypes",getListingTypes);
router.get("/getLocalitiesByCity",getLocalitiesByCity);
router.post("/uploadImages" ,uploadImages);
router.put("/hide",hideProperty)
router.put("/unhide",unhideProperty)

module.exports= router;