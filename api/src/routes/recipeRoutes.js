const express = require('express');

const { protect } = require('../middlewares/authMiddlewares');
const {
  getAllRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
  createRecipe,
} = require('../controllers/recipeController');

const router = express.Router();

router.use(protect);

router.route('/').get(getAllRecipes).post(createRecipe);
router.route('/:id').get(getRecipe).patch(updateRecipe).delete(deleteRecipe);

module.exports = router;
