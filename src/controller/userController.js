import userService from '../services/userService'
  

let handleGetUser = async (req, res) => {
    let data = await userService.handleGetUser();
    res.render('user.ejs',{data})
}

let handleHomePage = async (req, res) => {    
    let data = await userService.handleGetUser();
    console.log("Check data: ", data);
    res.send('Home page');
}

let handleCreateUser = async (req, res) => {  
    let user = req.body
    await userService.handleCreateNewUser(user);
    res.redirect('/user')
}

let handleDeleteUser = async (req, res) => {
    let userId = req.params.id;
    await userService.handleDeleteUser(userId);
    res.redirect("/user") 
}

let handleGetUserById = async (req, res) => {
    let userId = req.params.id;
    // console.log("Check id: ", userId);
    let data = await userService.handleGetUserById(userId);
    // console.log("Check user: ", data);
    res.render('update.ejs',{data})
}

let handleUpdateUserById = async (req, res) => {
    const user = req.body;
    console.log("Check body: ", user);
    await userService.handleUpdateUserById(user);
    res.redirect("/user");
}

module.exports = {
    handleGetUser,
    handleHomePage,
    handleCreateUser,
    handleDeleteUser,
    handleGetUserById,
    handleUpdateUserById
}