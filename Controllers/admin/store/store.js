const Store = require("../../../models/store");
const StoreDonations = require("../../../models/storeDonation");

module.exports = {
  createStore: async (req, res) => {
    try {
      const { body } = req;
      const {file} =req


      console.log("file", file);
      const savedStore = await new Store({
        item: body.item,
        discription: body.discription,
        requirement: body.requiremnt,
        unit: body.unit,
        unitPrice: body.unitPrice,
        totalPrice: body.totalPrice,
        remaining: body.requiremnt,
        photo:"uploads/images/"+ file?.filename
       
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

      const editedStore = await Store.findByIdAndUpdate(
        id,
        {
          $set: body,
        },
        { new: true }
      );

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
        $set: { status: "Deleted" },
      });

      res.status(200).json({ message: "Store deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllStore: async (req, res) => {
    try {
      const stores = await Store.find({ status: { $ne: "deleted" } }).sort({
        createdAt: -1,
      });
      res.status(200).json({ stores });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getStoreById: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("id", id);
      const store = await Store.findById(id)
        .populate("donations")
        .sort({ createdAt: -1 });
      console.log(store);
      res.status(200).json({ store });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getStoreDonations: async (req, res) => {
    try {
      const { storeId } = req.params;
      const donations = await StoreDonations.find({
        storeId: storeId,
      }).populate("userId");
      res.status(200).json({ donations });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  changeStoreStatus: async (req, res) => {
    try {
      const { storeId } = req.params;
      const { status } = req.body;
      console.log(storeId, status);
      await StoreDonations.findByIdAndUpdate(storeId, {
        $set: { status: status },
      });
      res.status(200).json({ message: `Status Change to ${status}` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteStoreDonation: async (req, res) => {
    try {
      const { id } = req.params;
      await StoreDonations.findByIdAndUpdate(id, {
        $set: { status: "Delete" },
      });
      res.status(202).json({ message: `Deleted Successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  
};
