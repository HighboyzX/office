const Pg = require('../../_db/postgresql');
const Logger = require('../../_helper/Logger');

exports.validate = (req, res, next) => {
    if (!req.authUser) {
        res.sendParameterRequired();
    } else {
        next();
    }
}
exports.userType = async (req, res, next) => {
    const sql = `SELECT user_type_id AS id , name FROM db_user_type`;
    const arg = [];
    try {
        const result = await Pg.executeQuery(sql, arg);
        res.sendData(result.rows);
    } catch (err) {
        Logger.error('Error select user type for select2: ', err.message);
        res.sendError(err.message);
    }
}
