const pool = require('./pool');
const bcrypt = require('bcrypt');

function User() { };

User.prototype = {
    // Find user database
    find: function (user = null, callback) {
        // if user = number  return field = id, if user = string return field = username.
        if (user) {
            let field = Number.isInteger(user) ? 'id' : 'username';
        }

        let sql = `SELECT * FROM users WHERE ${field} = ?`;

        pool.query(sql, user, function (err, result) {
            if (err) throw err
            callback(result);
        });
    },

    create: function (body, callback) {
        let pwd = body.password;
        body.password = bcrypt.hashSync(pwd, 10);

        for (prop in body) {
            bin.push(prop);
        }

        let sql = `INSERT INTO users (username, fullname, password) VALUES (?,?,?)`;

        pool.query(sql, bind, function (err, lastId) {
            if (err) throw err;
            callback(lastId);
        });
    },
    login: function (username, password, callback) {
        this.find(username, function (user) {
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    callback(user);
                    return;
                }
            }
            callback(null);
        })
    }
}

module.exports = User;