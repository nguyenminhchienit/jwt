import db from '../models'
import {checkMailUser, checkPhoneUser, hashPassword} from './loginRegisterService'

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
            DT: []
        };
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['email', 'username', 'address', 'sex', 'phone','id'],
            include: {model: db.Group, attributes: ['name','description','id']}
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
            DT: []
        };
    }
}

const deleteUser = async (id) => {
    try {
        const data = await db.User.findOne({
            where: {
                id: id,
            }
        })
        if (data) {
            await data.destroy();

            return {
                EM: "Xóa người dùng thành công",
                EC: 0,
                DT: []
            };
        } else {
            return {
                EM: "Không tìm thấy người dùng",
                EC: 2,
                DT: []
            };
        }
        
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong service",
            EC: 1,
            DT: []
        };
    }
}

const handleUpdateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: "Không được để trống trường group",
                EC: 3,
                DT: 'group'
            }
        }
        const user = await db.User.findOne({
            where: {
                id: data.id,
            }
        })
        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })

            return {
                EM: "Cập nhật người dùng thành công",
                EC: 0,
                DT: []
            };
        } else {
            return {
                EM: "Không tìm thấy người dùng",
                EC: 2,
                DT: []
            };
        }
        
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong service",
            EC: 1,
            DT: []
        };
    }
}

const handleCreateUser = async (data) => {
    try {
        let checkMail = await checkMailUser(data.email);
        if (checkMail === true) {
            return {
                EM: "Email này đã tồn tại, vui lòng chọn email khác",
                EC: 2,
                DT: 'email'
            }
        }
        let checkPhone = await checkPhoneUser(data.phone);
        if (checkPhone === true) {
            return {
                EM: "Số điện này đã tồn tại",
                EC: 3,
                DT: 'phone'
            }
        }

        const hashPasswordUser = hashPassword(data.password);
        const dataUser = await db.User.create({...data, password: hashPasswordUser})
        if (!dataUser) {
            return {
                EM: "Create user failed",
                EC: 0,
                DT: []
            };
        }
        return {
            EM: "Create user succeed",
            EC: 0,
            DT: []
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
    getAllUser,
    getUserWithPagination,
    deleteUser,
    handleCreateUser,
    handleUpdateUser
}