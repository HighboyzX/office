const Pg = require('../../_db/postgresql');
const Logger = require('../../_helper/Logger');

exports.validate = (req, res, next) => {
    if (!req.authUser) {
        res.sendParameterRequired();
    } else {
        next();
    }
}

exports.find = async (req, res, next) => {
    const sql = `
        SELECT 
            u.user_id,
            ut.name AS user_type,
            u.username,
            u.name,
            u.gender,
            u.birth_date,
            u.tel,
            u.address,
            u.note,
            u.profile_pic
        FROM db_user u
        LEFT JOIN db_user_type ut USING(user_type_id)
        WHERE u.user_id = $1 AND u.status = 1
    `;
    const arg = [req.authUser.user_id];
    try {
        const result = await Pg.executeQuery(sql, arg);
        res.sendData(result.rows);
    } catch (err) {
        Logger.error('Info error: ', err.message);
        res.sendError(err.message);
    }
}