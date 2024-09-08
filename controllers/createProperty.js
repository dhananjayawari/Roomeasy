const Property = require("../models/Property");

// Controller function to handle the creation of a new property listing
exports.createProperty = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      title,
      description,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      size,
      images,
      availableFrom,
      amenities,
      contactInfo
    } = req.body;

    // Create a new property document
    const property = new Property({
      title,
      description,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      size,
      images,
      availableFrom,
      amenities,
      contactInfo
    });

    // Save the property to the database
    await property.save();

    // Respond with the created property
    res.status(201).json({
      message: 'Property listing created successfully',
      property
    });
  } catch (error) {
    console.error('Error creating property listing:', error);
    res.status(500).json({
      message: 'An error occurred while creating the property listing',
      error
    });
  }
};