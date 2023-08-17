import mysql from 'mysql'

const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database:'dmce'
});

export default con