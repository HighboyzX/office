const Pg = require('../../_db/postgresql');
const Logger = require('../../_helper/Logger');

exports.validate = (req, res, next) => {
    if (!req.authUser) {
        res.sendParameterRequired();
    } else {
        next();
    }
}

exports.select = async (req, res, next) => {
    const sql = `
    SELECT 
        u.user_id,
        u.profile_pic,
        u.user_type_id,
        ut.name AS user_type,
        u.username,
        u.password,
        u.name,
        u.birth_date,
        EXTRACT(YEAR FROM AGE(u.birth_date)) AS age,
        u.gender,
        u.tel,
        u.address,
        u.note,
        u.created_date,
        u.created_by,
        u.updated_date,
        u.updated_by,
        u.last_login,
        u.status
    FROM db_user u
    LEFT JOIN db_user_type ut USING(user_type_id)
    ORDER BY user_id DESC`;
    const arg = [];
    try {
        const result = await Pg.executeQuery(sql, arg);
        res.sendData(result.rows);
    } catch (err) {
        Logger.error('Error select user list: ', err.message);
        res.sendError(err.message);
    }
}