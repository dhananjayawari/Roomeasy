const { JsonWebTokenError } = require("jsonwebtoken");
const Listing = require("../models/Listing");
const User = require("../models/User")
const {errorHandler} = require("../utils/error")
const {uploadImageToCloudinary} = require("../utils/imageUploader")

// exports.createListing = async(req,res) =>{
//     try{
//         //getting user id 
//         const userRef = req.user.id;
       
//        const data= req.body;
//         //get all the required fields 
//         // let {
//         //     title,
//         //     description,
//         //     offer_type,
//         //     property_type,
//         //     surface_area,
//         //     apartment_style,
//         //     bathrooms,
//         //     amenities,
//         //     carpet_area,
//         //     furnishing_status,
//         //     available_from,
//         //     rent,
//         //     deposit,
//         //     Lease_duration,
//         //     phone,
//         //     whatsapp_number,
//         //     House_no,
//         //     apartment,
//         //     state,
//         //     city,
//         //     locality,
//         //     pinCode,
//         //     images
//         // }= req.body;
//       //  const images= JSON.parse(_images);
       
//         //checking required field
//         // if(
//         //     !title||
//         //    !offer_type||
//         //    !property_type||
//         //    !surface_area||
//         //    !carpet_area||
//         //     !furnishing_status||
//         //     !available_from||
//         //     !rent||
//         //     !deposit||
//         //     !Lease_duration||
//         //     !phone||
//         //     !whatsapp_number||
//         //     !apartment||
//         //     !state||
//         //     !city||
//         //     !locality||
//         //     !pinCode
            
//         //   ){
//         //     return res.status(400).json({
//         //         success:false,
//         //         message:"all the fieldss are mandatory"
//         //     })
//         // }

//         //upload image

//         //create a new listing 
//         const newListing = await Listing.create(req.body);

//       //   {
//       //     title,
//       //     description,
//       //     offer_type,
//       //     property_type,
//       //     surface_area,
//       //     apartment_style,
//       //     bathrooms,
//       //     amenities,
//       //     carpet_area,
//       //     furnishing_status,
//       //     available_from,
//       //     rent,
//       //     deposit,
//       //     Lease_duration,
//       //     phone,
//       //     whatsapp_number,
//       //     House_no,
//       //     apartment,
//       //     state,
//       //     city,
//       //     locality,
//       //     pinCode,
//       //     images,
//       //     userRef
//       // }
//         //adding property under the user in user schema
//     //     await User.findByIdAndUpdate({
//     //         _id:userId
//     //     },
//     // {
//     //     $push:{
//     //         properties:newListing._id
//     //     }
//     // },{
//     //     new:true
//     // })

//     //return the new listing data
//     res.status(200).json({
//         success:true,
//         data:newListing,
//         message:"listing created successfully"
//     })

//     }
//     catch(error)
//     {
//         console.error(error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to create listing",
//       error: error.message,
//     })
//     }
// }

exports.createListing = async (req, res) => {
  try {
    // Getting user id
    const userRef = req.user.id;

    // Log the entire request body to debug
    console.log('Request body:', req.body);

    // Get all the required fields
    let {
      title,
      description,
      offer_type,
      property_type,
      apartment_style,
      bathrooms,
      amenities, // Array
      furnishing_status,
      available_from,
      rent,
      deposit,
      Lease_duration,
      phone,
      whatsapp_number,
      House_no,
      apartment,
      state,
      city,
      locality,
      pinCode,
      images, // Array
      createdAt,
    } = req.body;

    // Checking required fields
    if (
      !title ||
      !offer_type ||
      !property_type ||
      !furnishing_status ||
      !available_from ||
      !rent ||
      !deposit ||
      !Lease_duration ||
      !phone ||
      !whatsapp_number ||
      !apartment ||
      !state ||
      !city ||
      !locality ||
      !pinCode
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    // Create a new listing
    const newListing = await Listing.create({
      title,
      description,
      offer_type,
      property_type,
      apartment_style,
      bathrooms,
      amenities: req.body.amenities,  // No need to parse, already an array
      furnishing_status,
      available_from,
      rent,
      deposit,
      Lease_duration,
      phone,
      whatsapp_number,
      House_no,
      apartment,
      state,
      city,
      locality,
      pinCode,
      images: req.body.images,  // No need to parse, already an array
      createdAt,
      userRef
    });
    

    // Return the new listing data
    res.status(200).json({
      success: true,
      data: newListing,
      message: "Listing created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create listing",
      error: error.message,
    });
  }
};

exports.deleteListing = async (req, res) => {
  const listingId = req.query.listingId;
 
    try {
    
    const listing = await Listing.findById(listingId);
   
    if (!listing) {
      return res.status(400).json({
        success:false,
        message:"no listing found"
      })
    }
  

  
    
      await Listing.findByIdAndDelete(listingId);
      res.status(200).json({
        success:true,
        message:"listing has been deleted"
      });
    } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to delete listing",
          error: error.message,
        })
    }
  };
  
  exports.updateListing = async (req, res, next) => {
    const listingId = req.body;
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }
  
    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        success:true,
        data:updatedListing
      });
    } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to update listing",
          error: error.message,
        })
    }
  };
  
  exports.getUserListing = async (req, res, next) => {
    try {
        const user= req.user.id;
      const listing = await Listing.find({userRef:user,hide:false}
      )
      .populate("userRef")
      .populate('images')
      .populate('amenities')
      .exec();
      // if (!listing) {
      //   return next(errorHandler(404, 'Listing not found!'));
      // }
      res.status(200).json({
        success: true,
        data: listing,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve listing details",
        error: error.message,
      })
    }
  };

  exports.getUserHiddenListing = async (req, res, next) => {
    try {
        const user= req.user.id;
      const listing = await Listing.find({userRef:user,hide:true}
      )
      .populate("userRef")
      .populate('images')
      .populate('amenities')
      .exec();
      // if (!listing) {
      //   return next(errorHandler(404, 'Listing not found!'));
      // }
      res.status(200).json({
        success: true,
        data: listing,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve listing details",
        error: error.message,
      })
    }
  };
  
  
  // Controller function to get 5 random property listings
  exports.getRandomListings = async (req, res) => {
    try {
      
      // Step 1: Get the total count of property listings
      const count = await Listing.countDocuments();
  
      if (count === 0) {
        return res.status(404).json({
          success: false,
          message: 'No listings available'
        });
      }
    
      // Step 2: Generate a random starting point
      const randomSkip = Math.max(0, Math.floor(Math.random() * (count - 5))); 
        // console.log(randomSkip)
      // Step 3: Fetch a fixed number of documents (5) starting from the random point
      
      const listings = await Listing.find()
        .skip(randomSkip)
        .limit(5)
        .populate("userRef")
        .exec();
      //  console.log(listings)
      res.status(200).json({
        success: true,
        data: listings
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  exports.getListingDetails = async (req, res) => {
    try {
      const { listingId } =req.query;

      const listingDetails = await Listing.findOne({_id:listingId})    
      .populate("userRef")
        .exec()
  
      if (!listingDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find listing with id: ${listingId}`,
        })
      }
      console.log(listingDetails)
      return res.status(200).json({
        success: true,
          listingDetails
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  

  exports.getListingCities = async (req, res) => {
    try {
      // Use the distinct method on the Property model to find unique city names
      const cities = await Listing.distinct('city');
  
      // Return the distinct cities as a response
      res.status(200).json({
        success: true,
        data: cities,
      });
    } catch (error) {
      console.error('Error fetching distinct cities:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch distinct cities',
        error: error.message,
      });
    }
  };


// Controller function to get distinct property types
exports.getListingTypes = async (req, res) => {
  try {
    // Use the distinct method on the Property model to find unique property types
    const propertyTypes = await Listing.distinct('property_type');

    // Return the distinct property types as a response
    res.status(200).json({
      success: true,
      data: propertyTypes,
    });
  } catch (error) {
    console.error('Error fetching distinct property types:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch distinct property types',
      error: error.message,
    });
  }
};

  

exports.getSearchListings = async (req, res) => {
  const {property_type,city,locality} = req.query.data;
   console.log(city)
  try {
    // Query the database
    const properties = await Listing.find({city,property_type,locality});

    // If no properties found
    if (properties.length === 0) {
      return res.status(404).json({ message: 'No properties found' });
    }

    // Return the found properties
    res.status(200).json({
      success:true,
      properties
    });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.uploadImages = async (req, res) => {
  const { image } = req.body;

  try {
    // Ensure the image exists in the request body
    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }
    // Upload the image to Cloudinary
    const uploadResponse = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
    // Return the URL of the uploaded image
    res.status(200).json({ success: true, url: uploadResponse?.secure_url });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  } 
};

exports.hideProperty = async (req, res) => {
  try {
    const listingId = req.query.listingId;
  

    const property = await Listing.findByIdAndUpdate(
      listingId,
      { hide: true },
      { new: true } // Return the updated document
    );

    if (!property) {
      return res.status(404).json({ 
        message: 'Property not found' });
    }

    res.status(200).json({ 
      success:true,
      message: 'Property hidden successfully',
       property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unhideProperty = async (req, res) => {
  try {
    const listingId = req.query.listingId;
   

    const property = await Listing.findByIdAndUpdate(
      listingId,
      { hide: false },
      { new: true } // Return the updated document
    );

    if (!property) {
      return res.status(404).json({ 
        message: 'Property not found' });
    }

    res.status(200).json({ 
      success:true,
      message: 'Property unhidden successfully',
       property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLocalitiesByCity = async (req, res) => {
  try {
    const { selectedCity} = req.query; // Expecting an array of city names from the request body
    // Find distinct localities for the provided cities
    const localities = await Listing.distinct("locality",{'city':selectedCity});
    if (!localities.length) {
      return res.status(404).json({ message: 'No localities found for the provided cities.' });
    }

    res.status(200).json({ 
      success:true,
      localities });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching localities.' });
  }
};
