const Item = require("../models/item");
const Category = require("../models/category");

module.exports = {
  getAll: async (req, res) => {
    const items = await Item.find().populate("category", "name");
    res.send({
      error: false,
      message: "All items from database",
      items: items,
    });
  },
  getById: async (req, res) => {
    const item = await Item.findById(req.params.id).populate(
      "category",
      "name"
    );

    res.send({
      error: false,
      message: `Item with id #${item._id}, has been fetched`,
      item: item,
    });
  },
  getByCategory: async (req, res) => {
    try {
      const category = req.params.category;
      const items = await Item.find({ category: category });
      if (items.length > 0) {
        res.send({
          error: false,
          message: `Items for the category ${req.params.category}`,
          items: items,
        });
      } else {
        res.send({
          error: true,
          message: `There are no items from category #${req.params.category} `,
        });
      }
    } catch (error) {
      response(
        res,
        500,
        `The fetch for the items by category ${req.params.category}  failed`
      );
    }
  },
  create: async (req, res) => {
    try {
      const { name, categoryId } = req.body;
      const image = req.file ? req.file.path : null;

      const newItem = new Item({ name, image, categoryId });
      await newItem.save();

      await Category.findByIdAndUpdate(categoryId, {
        $push: { items: newItem },
      });

      res.send({
        error: false,
        message: "New item has been created",
        item: newItem,
      });
    } catch (error) {
      response(res, 500, error.msg);
    }
  },
  update: async (req, res) => {},
  delete: async (req, res) => {
    // if (!req.user) {
    //     res.status(401).send('You are not login');
    //     return
    // }

    // const permission = ac.can(req.user.role).deleteOwn('recipe');
    // if (!permission.granted) {
    //     res.status(403).send('Unauthorize permission');
    //     return
    // }

    try {
      const item = await Item.findByIdAndDelete(req.params.id);

      if (!item) {
        return res.status(404).send({
          error: true,
          message: `Item with id #${req.params.id} not found`,
        });
      }

      res.send({
        error: false,
        message: `Item with id #${req.params.id} has been deleted`,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error deleting item",
        errorDetails: error.message,
      });
    }
  },
};
