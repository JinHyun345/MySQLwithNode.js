var mysql = require('mysql2');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#%gimco682GILgodarling',
  database: 'mybox'
});
db.connect();
module.exports = db;