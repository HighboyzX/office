const Fs = require('fs');
const Pg = require('../../_db/postgresql');
const Logger = require('../../_helper/Logger');

exports.validate = (req, res, next) => {
    if (!req.body) {
        res.sendParameterRequired();
    } else {
        next();
    }
}

exports.delete = async (req, res, next) => {
    const { id } = req.params;
    const sql = 'DELETE FROM db_user WHERE user_id = $1';
    const arg = [id];

    try {
        await removeImage(id);
        await Pg.executeQuery(sql, arg);
        res.sendData();
    } catch (err) {
        Logger.error('Error deleting user: ', err.message);
        res.sendError(err.message);
    }
}

const removeImage = async (id) => {
    try {
        const oldImage = await getOldImage(id);
        if (oldImage) {
            const pathFile = './_src/image/user/' + oldImage;
            if (Fs.existsSync(pathFile)) {
                await Fs.unlinkSync(pathFile);
            }
        }
    } catch (err) {
        Logger.error('Error removing old image: ', err.message);
    }
}

const getOldImage = async (id) => {
    const sql = 'SELECT profile_pic FROM db_user WHERE user_id = $1';
    const arg = [id];
    const result = await Pg.executeQuery(sql, arg);
    if (result.rows.length > 0) {
        return result.rows[0].profile_pic;
    } else {
        return null;
    }
}