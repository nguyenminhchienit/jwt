import jwt from 'jsonwebtoken'
require('dotenv').config();

const createJWT = (payload) => {
    let token = null;
    let key = process.env.JWT_KEY;
    try {
        token = jwt.sign(payload, key);
    } catch (e) {
        console.log(e);
    }
    return token
}

const verifyJWT = (token) => {
    let key = process.env.JWT_KEY;
    let data = null;
    try {
        var decoded = jwt.verify(token, key);
        data = decoded;
    } catch (error) {
        console.log(error)
    }
    return data;
}

module.exports = {
    createJWT,
    verifyJWT
}