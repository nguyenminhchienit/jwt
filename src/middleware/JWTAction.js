import jwt from 'jsonwebtoken'
require('dotenv').config();

const nonSecurePaths = ['/', '/login', '/register','/logout'];

const createJWT = (payload) => {
    let token = null;
    let key = process.env.JWT_KEY;
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
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

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyJWT(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                EM: "Xác thực người dùng không thành công",
                DT:''
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            EM: "Xác thực người dùng không thành công",
            DT:''
        })
    }
}

const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentURL = req.path;
        console.log("Check path: ", currentURL);

        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                EM: "Người dùng chưa được phân quyền",
                DT:''
            })
        }
        let canAccess = roles.some(item => item.url === currentURL); // true/false
        if (canAccess) {
            console.log("Check role: ", roles);
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                EM: "Người dùng chưa được phân quyền",
                DT:''
            })
        }

    } else {
        return res.status(401).json({
            EC: -1,
            EM: "Xác thực người dùng không thành công",
            DT:''
        })
    }
}

module.exports = {
    createJWT,
    verifyJWT,
    checkUserJWT,
    checkUserPermission
}