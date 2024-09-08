const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a property listing
const propertySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  address: {
    type: String ,
    
  },
  city: {
    name: {
      type: String,
      required: true
    },
    localArea: {
      type: String,
      required: true
    },
    pinCode: {
      type: String,
      required: true
    }
  },
  type: {
    type: String,
    enum: ['Apartment', 'House', 'Studio', 'Condo', 'Townhouse'],
    required: true
  },
  bedrooms: {
    type: Number,
    min: 0,
    required: true
  },
  bathrooms: {
    type: Number,
    min: 0,
    required: true
  },
  size: {
    type: Number, // in square feet or square meters
    required: true,
    min: 0
  },
  images: [String], // Array of image URLs
  availableFrom: {
    type: Date,
    required: true
  },
  amenities: {
    type: [String], // Array of amenity names like 'Pool', 'Gym', etc.
    default: []
  },
  contactInfo: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userRef: [{
    type: mongoose.Types.ObjectId,
    ref: "Like"
  }]
});

// Create the model from the schema
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
