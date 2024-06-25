const Item = require("../models/item");
const Categories = require("../models/category");

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
      const { name } = req.body;

      const category = await Categories.findOne({
        title: req.params.id,
      });

      const newItem = await Item.create({
        name,
        category: category._id,
      });

      await Categories.findByIdAndUpdate(category._id, {
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

    await Item.findByIdAndDelete(req.params.id);
    res.send({
      error: false,
      message: `Item with id #${req.params.id} has been deleted`,
    });
  },
};
