const Recipe = require('../models/recipeModel');
const catchAsync = require('../shared/errors/catchAsyncErrors');
const AppError = require('../shared/errors/appError');

exports.getAllRecipes = catchAsync(async (req, res, next) => {
  const recipes = await Recipe.find({ user: req.user.id });

  if (recipes.length === 0) {
    return next(new AppError('No recipes found', 404));
  }

  return res.status(200).json({
    status: 'success',
    results: recipes.length,
    data: {
      recipes,
    },
  });
});

exports.getRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(new AppError('No recipe found with that ID', 404));
  }

  return res.status(200).json({
    status: 'success',
    data: {
      recipe,
    },
  });
});

exports.createRecipe = catchAsync(async (req, res, next) => {
  const newRecipe = await Recipe.create({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    ingredients: req.body.ingredients,
    user: req.user.id,
  });

  return res.status(201).json({
    status: 'success',
    data: {
      recipe: newRecipe,
    },
  });
});

exports.updateRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!recipe) {
    return next(new AppError('No recipe found with that ID', 404));
  }

  return res.status(200).json({
    status: 'success',
    data: {
      recipe,
    },
  });
});

exports.deleteRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);

  if (!recipe) {
    return next(new AppError('No recipe found with that ID', 404));
  }

  return res.status(204).json({
    status: 'success',
    data: null,
  });
});
