const mongoose = require('mongoose');
const User = require("./User")
const Schema = mongoose.Schema;
// const AutoIncrement = require('mongoose-sequence')(mongoose);


// Define the schema for a property listing
const propertySchema = new Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  offer_type: {
    type: String,
    enum: ['Girls', 'Boys','Boys/Girls','Family'],
    required: true
  },
  property_type: {
    type: String,
    enum: ['Flat', 'Hostel', 'PG'],
    required: true
  },
  surface_area: {
    type: Number,  // Changed to Number for numeric value
    min: 0
  },
  apartment_style: {
    type: String,
    enum: ["1BHK", "2BHK", "1RK", "1Room", "Hostel"],
    trim: true
  },
  bathrooms: {
    type: String,  // Changed to Number for numeric value
    enum: ['Common', 'Attached'],
    required: true
  },
  amenities: {
    type: Array,  // Array of strings for amenity names like 'Pool', 'Gym', etc.
  },
  carpet_area: {
    type: Number,  // Changed to Number for numeric value
    min: 0
  },
  furnishing_status: {
    type: String,
    enum: ['Furnished', 'Semi Furnished', 'Unfurnished'],
    required: true
  },
  available_from: {
    type: Date,
    required: true
  },
  rent: {
    type: Number,  // Changed to Number for numeric value
    min: 0,
    required: true
  },
  deposit: {
    type: Number,
    min: 0,
    required: true
  },
  Lease_duration: {
    type: Number,  // Changed to Number for numeric value
    min: 0,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  whatsapp_number: {
    type: String,
    required: true
  },
  House_no: {
    type: String,
    required: true
  },
  apartment: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  locality: {
    type: String,
    required: true
  },
  pinCode: {
    type: String,
    required: true
  },
  images: {
    type: Array,  // Array of image URLs or paths
    
  },
  hide:{
    type:Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

// propertySchema.plugin(AutoIncrement, { inc_field: 'identifyNo' });

// Create the model from the schema
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
