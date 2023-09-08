import mysql from 'mysql2'
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10)

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});
  

let handleGetUser = (req, res) => {
    res.render('user.ejs')
}

let handleHomePage = (req, res) => {    
    res.send('Home page');
}

let handleCreateUser = (req, res) => {
    
    let user = req.body
    // console.log("Check user: ", req.body)
    let hashPassword = bcrypt.hashSync(user.password, salt)
    connection.query(
        'INSERT INTO users(username,password,email) values (?,?,?)',
        [user.username, hashPassword, user.email]
    );
    res.send("Create user succeed!")
}

module.exports = {
    handleGetUser,
    handleHomePage,
    handleCreateUser
}