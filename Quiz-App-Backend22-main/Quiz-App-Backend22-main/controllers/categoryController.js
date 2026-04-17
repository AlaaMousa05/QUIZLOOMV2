const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

// Category Controllers
exports.createCategory = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    const normalizedName = (name || '').trim();

    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    const category = new Category({
      name: normalizedName,
      description: (description || '').trim(),
      imageUrl: imageUrl || null,
      createdBy: req.user.id
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('createdBy', 'firstName lastName');

    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('createdBy', 'firstName lastName');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description, imageUrl, isActive } = req.body;
    const updatePayload = {
      description: description !== undefined ? (description || '').trim() : undefined,
      imageUrl: imageUrl !== undefined ? imageUrl : undefined,
      isActive
    };
    if (name !== undefined) {
      const normalizedName = (name || '').trim();
      if (!normalizedName) {
        return res.status(400).json({
          success: false,
          message: 'Category name cannot be empty'
        });
      }
      updatePayload.name = normalizedName;
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updatePayload,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// SubCategory Controllers
exports.createSubCategory = async (req, res) => {
  try {
    const { name, categoryId, description } = req.body;
    const resolvedCategoryId = req.params.categoryId || categoryId;

    const subCategory = new SubCategory({
      name,
      category: resolvedCategoryId,
      description,
      createdBy: req.user.id
    });

    await subCategory.save();

    res.status(201).json({
      success: true,
      message: 'SubCategory created successfully',
      subCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({
      category: req.params.categoryId,
      isActive: true
    }).populate('category', 'name');

    res.status(200).json({
      success: true,
      count: subCategories.length,
      subCategories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { name, description, isActive },
      { new: true }
    );

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: 'SubCategory not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'SubCategory updated successfully',
      subCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: 'SubCategory not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'SubCategory deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
