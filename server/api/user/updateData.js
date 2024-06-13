const Moment = require('moment');
const Fs = require('fs');

const Pg = require('../../_db/postgresql');
const Logger = require('../../_helper/Logger');

const { generateTimestampedFileName } = require('../../_utils/utils');

exports.validate = (req, res, next) => {
    if (!req.authUser) {
        res.sendParameterRequired();
    } else {
        next();
    }
}

exports.uploadImage = async (req, res, next) => {
    try {

        if (req.files != undefined && req.files.profile_pic != undefined) {
            const image = req.files.profile_pic;
            const fileName = await generateTimestampedFileName(image);
            const pathFile = './_src/image/user/' + fileName;

            image.mv(pathFile, (err) => {
                if (err) return res.sendError(err);

                req.fileName = fileName;
                next();
            });
        } else {
            next();
        }
    } catch (err) {
        Logger.error('Error upload image: ', err.message);
        res.sendError(err.message);
    }
}

exports.update = async (req, res, next) => {
    const { user_id, user_type_id, name, gender, birth_date, tel, address, status, note } = req.body;
    const newImage = req.fileName;
    let sql = 'UPDATE db_user SET ';
    const arg = [
        user_type_id,
        name,
        gender,
        Moment(new Date(birth_date)).format('YYYY-MM-DD'),
        tel,
        address,
        note,
        status,
        new Date(),
        req.authUser.username,
    ];
    let argIndex = 11;

    if (newImage) {
        await removeImage(user_id);
        sql += `profile_pic = $${argIndex++}, `;
        arg.push(newImage);
    }

    sql += `        
            user_type_id = $1,
            name = $2,
            gender = $3,
            birth_date = $4,
            tel = $5,
            address = $6,
            note = $7,
            status = $8,
            updated_date = $9,
            updated_by = $10
        WHERE user_id = $${argIndex}
    `;
    arg.push(user_id);

    try {
        await Pg.executeQuery(sql, arg);
        next();
    } catch (err) {
        Logger.error('Error updating user: ', err.message);
        res.sendError(err.message);
    }
};

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