import db from '../models'

const getAllUser = async () => {
    let users = [];
    try {
        const data = await db.User.findAll({
            attributes: ['email', 'username', 'address', 'sex', 'phone'],
            include: {model: db.Group, attributes: ['name','description']}
        })
        if (data && data.length > 0) {
            users = data;
        }
        return {
            EM: "Get user succeed",
            EC: 0,
            DT: users
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong service",
            EC: 1,
            DT: users
        };
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit
        });
        let totalPage = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPage: totalPage,
            users: rows
        }
        return {
            EM: "Get user succeed",
            EC: 0,
            DT: data
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong service",
            EC: 1,
            DT: users
        };
    }
}

module.exports = {
    getAllUser,
    getUserWithPagination
}