const Jwt = require('jsonwebtoken');
const Dotenv = require('dotenv');
Dotenv.config();

const Pg = require('../_db/postgresql');
const Logger = require('../_helper/Logger');

exports.authenticateUser = async (req, res, next) => {
    try {
        const authToken = req.headers['authorization'];

        if (!authToken) return res.sendError('Unauthorized', 401);

        const verifiedUser = Jwt.verify(authToken, process.env.SECRET);

        if (verifiedUser) {
            req.authUser = verifiedUser;
            next();
        } else {
            return res.sendError('Token not found', 401);
        }
    } catch (err) {
        Logger.error('Check login error: ', err.message);
        res.sendError(err.message);
    }
}

exports.getAuthenticatedUser = async (req, res, next) => {
    try {
        const authToken = req.headers['authorization'];
        const sql = 'SELECT user_id,user_type_id,username,name,profile_pic FROM db_user WHERE user_id = $1';
        const arg = [req.authUser.user_id];
        const result = await Pg.executeQuery(sql, arg);
        res.sendData({token: authToken, auth: result.rows[0]});
    } catch (err) {
        Logger.error('Check login error: ', err.message);
        res.sendError(err.message);
    }
}

exports.generateTimestampedFileName = (image) => {
    const toDay = new Date();
    const y = toDay.getFullYear();
    const m = toDay.getMonth();
    const d = toDay.getDate();
    const h = toDay.getHours();
    const min = toDay.getMinutes();
    const sec = toDay.getSeconds();
    const ms = toDay.getMilliseconds();

    const arrFileName = image.name.split('.');
    const ext = arrFileName[arrFileName.length - 1];

    return `${y}${m}${d}${h}${min}${sec}${ms}.${ext}`;

}
