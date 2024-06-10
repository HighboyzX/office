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
    try {
        const result = await Pg.executeQuery(sql, []);
        res.sendData(result.rows);
    } catch (err) {
        Logger.error('Error select user type for select2: ', err.message);
        res.sendError(err.message);
    }
}
exports.province = async (req, res, next) => {
    const sql = `SELECT id,name_in_thai AS name FROM db_province`;
    try {
        const result = await Pg.executeQuery(sql, []);
        res.sendData(result.rows);
    } catch (err) {
        Logger.error('Error select province for select2: ', err.message);
        res.sendError(err.message);
    }
}
exports.district = async (req, res, next) => {
    const sql = `SELECT id,name_in_thai AS name,province_id FROM db_district`;
    try {
        const result = await Pg.executeQuery(sql, []);
        res.sendData(result.rows);
    } catch (err) {
        Logger.error('Error select province for select2: ', err.message);
        res.sendError(err.message);
    }
}
exports.districtSub = async (req, res, next) => {
    const sql = `SELECT id,name_in_thai AS name,district_id FROM db_district_sub`;
    try {
        const result = await Pg.executeQuery(sql, []);
        res.sendData(result.rows);
    } catch (err) {
        Logger.error('Error select province for select2: ', err.message);
        res.sendError(err.message);
    }
}