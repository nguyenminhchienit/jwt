import userAPIService from '../services/userAPIService'

let handleRead = async (req, res) => {
    let data = {};
    console.log("Check user: ", req.user)
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            data = await userAPIService.getUserWithPagination(+page, +limit);
        } else {
            data = await userAPIService.getAllUser(); 
        }
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

let handleCreate = async (req, res) => {
    try {
        let data = await userAPIService.handleCreateUser(req.body);
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

let handleUpdate = async (req, res) => {
    try {
        let data = await userAPIService.handleUpdateUser(req.body);
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

let handleDelete = async (req, res) => {
    let data = {};
    try {
        console.log("Check delete: ",req.body);
        let data = await userAPIService.deleteUser(req.body.id);
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

const getUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: 'OK',
        EC: 0,
        DT: {
            access_token: req.token,
            ...req.user
        }
    })
}

module.exports = {
    handleCreate,
    handleDelete,
    handleRead,
    handleUpdate,
    getUserAccount
}