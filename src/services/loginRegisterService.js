import db from "../models";
import bcrypt, { hash } from 'bcryptjs';
import { Op } from "sequelize";

const checkMailUser = async (email) => {
    try {
        let userEmail = await db.User.findOne({
            where: {
                email: email
            }
        })
        if (userEmail) {
            return true;
        }
        return false;
        
    } catch (e) {
        console.log(e);
    }
}

const checkPhoneUser = async (phone) => {
    try {
        let userPhone = await db.User.findOne({
            where: {
                phone: phone
            }
        })
        if (userPhone) {
            return true;
        }
        return false;
        
    } catch (e) {
        console.log(e);
    }
}

var salt = bcrypt.genSaltSync(10)
const hashPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
}

const registerNewUser = async (user) => {
    let checkMail = await checkMailUser(user.email);
    if (checkMail === true) {
        return {
            EM: "Email này đã tồn tại, vui lòng chọn email khác",
            EC: 2
        }
    }
    let checkPhone = await checkPhoneUser(user.phone);
    if (checkPhone === true) {
        return {
            EM: "Số điện này đã tồn tại",
            EC: 3
        }
    }

    const hashPasswordUser = hashPassword(user.password);

    let data = await db.User.create({
        email: user.email,
        phone: user.phone,
        username: user.username,
        password: hashPasswordUser
    })

    return {
        EM: "A create new user successfully",
        EC: 0,
        DT: data
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const loginUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: data.valueLogin },
                    { phone: data.valueLogin }
                ]
            }
        })

        if (user) {
            const isCheckPassword = checkPassword(data.password, user.password);
            if (isCheckPassword === true) {
                return {
                    EM: "Đăng nhập thành công",
                    EC: 0,
                    DT: user
                }
            }
        }

        return {
            EM: "Tên đăng nhập hoặc mật khẩu không đúng",
            EC: 2,
            DT: ''
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registerNewUser,
    loginUser
}