import loginRegisterService from '../services/loginRegisterService'

const handleRegister = async (req, res) => {
    try {
        let user = req.body;
        if (!user.email || !user.phone || !user.username || !user.password) {
            return res.status(200).json({
                EM: "Missing param",
                EC: 1,
                DT: ''
            })
        } 

        let data = await loginRegisterService.registerNewUser(user);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ""
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

const handleLogin = async (req, res) => {
    try {
        let user = req.body;
        if (!user.valueLogin || !user.password) {
            return res.status(200).json({
                EM: "Missing param",
                EC: 1,
                DT: ''
            })
        } 

        let data = await loginRegisterService.loginUser(user);
        if (data && data.DT && data.DT.access_token) {            
            res.cookie('jwt', data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
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

module.exports = {
    handleRegister,
    handleLogin
}