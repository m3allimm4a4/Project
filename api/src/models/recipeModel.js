const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  ingredients: [
    {
      name: {
        type: String,
        required: [true, 'Ingredient name is required'],
      },
      quantity: {
        type: Number,
        required: [true, 'Ingredient quantity is required'],
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
