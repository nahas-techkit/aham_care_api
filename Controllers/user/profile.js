const User = require("../../models/user");
module.exports = {
    getProfileById:async (req,res)=>{
        try {
            const {id} = req.params
            console.log(id);
            const user = await User.findById(id)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    
}