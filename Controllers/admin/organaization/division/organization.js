const Organaization = require('../../../../models/organaization')

module.exports = {
    getOrgnaizationByType : async (req,res)=>{
        const {typeId} = req.params
        console.log(typeId);
        try {
            const organaizations = await Organaization.find({typeId:'643cfaa80b8d9cb445b67c66'})
            res.status(200).json(organaizations)
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}