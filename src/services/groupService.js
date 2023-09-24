import db from "../models";

let handleGetGroup = async () => {
    let group = [];
    try {
        const data = await db.Group.findAll({
            attributes: ['id','name', 'description'],
        })
        if (data && data.length > 0) {
            group = data;
        }
        return {
            EM: "Get group succeed",
            EC: 0,
            DT: group
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong service",
            EC: 1,
            DT: []
        };
    }
}

module.exports = {
    handleGetGroup
}