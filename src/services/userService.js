import bcrypt from 'bcryptjs';
import mysql from 'mysql2'


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

var salt = bcrypt.genSaltSync(10)
const hashPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, salt)
    return hashPassword
}

const handleCreateNewUser = (user) => {
    const hashPasswordUser = hashPassword(user.password);
    connection.query(
        'INSERT INTO users(username,password,email) values (?,?,?)',
        [user.username, hashPasswordUser, user.email]
    );
}

module.exports = {
    handleCreateNewUser
}