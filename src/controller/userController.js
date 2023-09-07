let handleGetUser = (req,res) => {
    res.send('Add new user!!');
}

let handleHomePage = (req,res) => {
    res.send('Home page');
}

module.exports = {
    handleGetUser,
    handleHomePage
}