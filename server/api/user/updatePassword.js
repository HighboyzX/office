const Bcrypt = require('bcryptjs');
const Pg = require('../../_db/postgresql');
const Logger = require('../../_helper/Logger');

const regex = /^[a-zA-Z0-9]+$/;

exports.validate = (req, res, next) => {
    const { user_id, old_password, new_password, confirm_password } = req.body;
    if (!user_id && !old_password && !new_password && !confirm_password) {
        res.sendParameterRequired();
    } else {
        if (!regex.test(new_password) || !regex.test(confirm_password)) {
            return res.sendError('Password must contain only letters and numbers', 400);
        } else {
            next();
        }
    }
}
exports.update = async (req, res, next) => {
    const { user_id, old_password, new_password, confirm_password } = req.body;

    if (new_password !== confirm_password) {
        return res.sendError('New password and confirm password do not match', 404);
    }

    try {
        const password = await getPassword(user_id);

        const isMatch = await Bcrypt.compare(old_password, password);
        if (!isMatch) {
            return res.sendError('Old password is incorrect', 401);
        }

        const passwordHash = await Bcrypt.hash(new_password, 10);
        const sql = 'UPDATE db_user SET password = $1 WHERE user_id = $2';
        const arg = [passwordHash, user_id];

        const result = await Pg.executeQuery(sql, arg);
        if (result.error) return Logger.error(result.error);

        res.sendData({});
    } catch (err) {
        Logger.error('Error update password: ', err.message);
        res.sendError(err.message);
    }
};

const getPassword = async (userId) => {
    try {
        const sql = 'SELECT password FROM db_user WHERE user_id = $1';
        const arg = [userId];

        const result = await Pg.executeQuery(sql, arg);
        if (result.error) return Logger.error(result.error);

        if (result.rows.length > 0) {
            return result.rows[0].password;
        } else {
            return null;
        }
    } catch (err) {
        Logger.error('Error select password: ', err.message);
        res.sendError(err.message);
    }
};
