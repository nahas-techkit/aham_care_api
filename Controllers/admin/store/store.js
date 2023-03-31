const Store = require("../../../models/store");

module.exports = {
  createStore: async (req, res) => {
    try {
      const { body } = req;
      const savedStore = await new Store({
        item: body.item,
        discription: body.discription,
        requirement: body.requirement,
        unit: body.unit,
        unitPrice: body.unitPrice,
        totalPrice: body.totalPrice,
        remaining: body.requirement,
        
      }).save();

      res
        .status(200)
        .json({ savedStore, message: "Store created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  editStore: async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;

      const editedStore = await Store.findByIdAndUpdate(id, {
        $set: body,
      },{new:true});

      res
        .status(200)
        .json({ message: "Store Updated Successfully", editedStore });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteStore: async (req, res) => {
    try {
      const { id } = req.params;
      await Store.findByIdAndUpdate(id, {
        $set: { status: "deleted" },
      });

      res.status(200).json({ message: "Store deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllStore: async (req, res) => {
    try {
      const stores = await Store.find({status:{$ne:"deleted"}}).sort({ createdAt: -1 });
      res.status(200).json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
