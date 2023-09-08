import userService from '../services/userService'
  

let handleGetUser = (req, res) => {
    res.render('user.ejs')
}

let handleHomePage = (req, res) => {    
    res.send('Home page');
}

let handleCreateUser = (req, res) => {  
    let user = req.body
    let info = userService.handleCreateNewUser(user);
    res.send("Create user succeed!")
}

module.exports = {
    handleGetUser,
    handleHomePage,
    handleCreateUser
}