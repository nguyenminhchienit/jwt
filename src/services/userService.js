import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise'
import db from '../models';


// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt'
// });

var salt = bcrypt.genSaltSync(10)
const hashPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
}

const handleCreateNewUser = async (user) => {
    const hashPasswordUser = hashPassword(user.password);
    try {
        await db.User.create({
            username: user.username,
            password: hashPasswordUser,
            email: user.email
        })
    } catch (e) {
        console.log(e);
    }
}

const handleDeleteUser = async (id) => {
    try {
        const user = await db.User.findOne({
            where: {
                id: id
            }
        })
        if (user) {
            user.destroy();
        }
    } catch (e) {
        console.log(e);
    }
}

const handleGetUserById = async (id) => {
    try {
        let dataUser = []
        const data = await db.User.findOne({
            where: {
                id: id
            },
            raw: true
        })
        if (data) {
            dataUser = data;
        }
        return dataUser;
    } catch (e) {
        console.log(e);
    }
}



const handleGetUser = async () => {
    let users = [];
    try {
        const data = await db.User.findAll()
        if (data && data.length > 0) {
            users = data;
        }

        return users;
    } catch (e) {
        console.log(e);
    }
}

const handleUpdateUserById = async (user) => {
    try {
        const data = await db.User.findOne({
            where: {
                id: user.id
            }
        })
        if (data) {
            
            data.username = user.username,
            data.email = user.email

            await data.save();
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    handleCreateNewUser,
    handleGetUser,
    handleDeleteUser,
    handleGetUserById,
    handleUpdateUserById
}