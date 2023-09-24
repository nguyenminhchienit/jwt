import groupService from '../services/groupService'

const handleRead = async (req, res) => {
    try {
        let data = await groupService.handleGetGroup();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "Error from server",
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleRead
}