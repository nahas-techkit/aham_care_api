const Store = require("../../../models/store")

module.exports = {
    createStore: async (req,res)=>{
        try {
            


            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}