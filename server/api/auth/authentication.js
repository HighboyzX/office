const Bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const Dotenv = require('dotenv');
Dotenv.config();

const Pg = require('../../_db/postgresql');
const Logger = require('../../_helper/Logger');

exports.validate = (req, res, next) => {
    if (!req.body.username && !req.body.password) {
        res.sendParameterRequired();
    } else {
        next();
    }
}

exports.checkStatus = async (req, res, next) => {
    const { username } = req.body;
    const sql = 'SELECT status FROM db_user WHERE username = $1';
    const arg = [username];

    try {
        const resposne = await Pg.executeQuery(sql, arg);
        if (resposne.rows[0].status !== 1) {
            return res.sendError('This user has been suspended', 403);
        } else {
            next();
        }
    } catch (err) {
        Logger.error('Error login status :', err.message);
        res.sendError(err.message);
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const sqlFindUser = 'SELECT * FROM db_user WHERE username = $1 AND status = 1';
        const argFindUser = [username];
        const result = await Pg.executeQuery(sqlFindUser, argFindUser);
        if (result.rows.length <= 0) return res.sendError('Username not found', 400);

        const user = result.rows[0];
        const isPasswordValid = await Bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.sendError('Invalid password', 400);

        const payload = {
            user_id: result.rows[0].user_id,
            username: result.rows[0].username,
            name: result.rows[0].name,
            profile_pic: result.rows[0].profile_pic,
            user_type_id: result.rows[0].user_type_id
        };

        const token = Jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' });

        await updateLastLogin(result.rows[0].user_id);

        res.sendData({ token, auth: payload });
    } catch (err) {
        Logger.error('Error login :', err.message);
        res.sendError(err.message);
    }
}
const updateLastLogin = async (userId) => {
    const sqlUpdateLogin = 'UPDATE db_user SET last_login = $1 WHERE user_id = $2';
    const argUpdateLogin = [new Date(), userId];

    try {
        await Pg.executeQuery(sqlUpdateLogin, argUpdateLogin);
    } catch (err) {
        Logger.error('Error updating last login:', err.message);
    }
};
