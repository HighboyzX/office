const Fs = require('fs');
const Bcrypt = require('bcryptjs');
const Pg = require('../../_db/postgresql');
const Logger = require('../../_helper/Logger');

const { setFileName } = require('../../_utils/utils');

exports.validate = (req, res, next) => {
    if (!req.body) {
        res.sendParameterRequired();
    } else {
        next();
    }
}

exports.uploadImage = async (req, res, next) => {
    try {
        if (req.files != undefined && req.files.profile_pic != undefined) {
            const image = req.files.profile_pic;
            const fileName = await setFileName(image);
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
    const { user_id, name, gender, birth_date, tel, address, note, password, confirm_password } = req.body;
    const newImage = req.fileName;
    let sql = 'UPDATE db_user SET ';
    const args = [name, gender, birth_date, tel, address, note];
    let argIndex = 7;

    if (newImage) {
        await removeImage(user_id);
        sql += `profile_pic = $${argIndex++}, `;
        args.push(newImage);
    }
    
    if (password && password != confirm_password) return res.sendError('Password and confirm password do not match', 400);

    
    if (password && password != '' && password != undefined) {
        const passwordHash = await Bcrypt.hash(password, 10);
        sql += `password = $${argIndex++}, `;
        args.push(passwordHash);
    }

    sql += 'name = $1, gender = $2, birth_date = $3, tel = $4, address = $5, note = $6 WHERE user_id = $' + argIndex;
    args.push(user_id);

    try {
        await Pg.executeQuery(sql, args);
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