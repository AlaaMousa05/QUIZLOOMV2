const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const questionController = require('../controllers/questionController');
const { authenticate, authorize } = require('../middleware/auth');

// Category routes
router.post('/', authenticate, authorize('admin'), categoryController.createCategory);
router.get('/', categoryController.getAllCategories);

// SubCategory routes (must be before /:id route to avoid conflicts)
router.post('/:categoryId/subcategories', authenticate, authorize('admin'), categoryController.createSubCategory);
router.get('/:categoryId/subcategories', categoryController.getSubCategoriesByCategoryId);
router.get('/subcategories/:id/questions', questionController.getQuestionsBySubCategory);
router.put('/subcategories/:id', authenticate, authorize('admin'), categoryController.updateSubCategory);
router.delete('/subcategories/:id', authenticate, authorize('admin'), categoryController.deleteSubCategory);

// Category routes (after subcategory routes)
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', authenticate, authorize('admin'), categoryController.updateCategory);
router.delete('/:id', authenticate, authorize('admin'), categoryController.deleteCategory);

module.exports = router;
