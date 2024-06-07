const Bcrypt = require('bcryptjs');
const Moment = require('moment');

const Pg = require('../../_db/postgresql');
const Logger = require('../../_helper/Logger');

const regex = /^[a-zA-Z0-9]+$/;

const { setFileName } = require('../../_utils/utils');

exports.validate = (req, res, next) => {
    const { username, password } = req.body;
    if (!username && !password) {
        return res.sendParameterRequired();
    } else {
        if (!regex.test(username) || !regex.test(password)) {
            return res.sendError('Username and password must contain only letters and numbers', 400);
        } else {
            next();
        }
    }
}

exports.checkUsernameDuplicate = async (req, res, next) => {
    const { username } = req.body;
    const sql = 'SELECT user_id FROM db_user WHERE username = $1';
    const arg = [username];
    try {
        const result = await Pg.executeQuery(sql, arg);
        if (result.rows.length > 0) return res.sendError('Duplicate username in the system', 404);
        next();
    } catch (err) {
        Logger.error('Error select user by username: ', err.message);
        res.sendError(err.message);
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

exports.insert = async (req, res, next) => {
    const { user_type_id, username, password, name, gender, birth_date, tel, address, status, note } = req.body;

    try {

        const passwordHash = await Bcrypt.hash(password, 10);

        const sql = `
        INSERT INTO db_user
        (
            user_type_id,
            username,
            password,
            name,
            gender,
            birth_date,
            tel,
            address,
            profile_pic,
            status,
            note,
            created_date,
            created_by                    
        ) 
        VALUES 
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
        `;
        const arg = [
            user_type_id,
            username,
            passwordHash,
            name,
            gender,
            Moment(new Date(birth_date)).format('YYYY-MM-DD'),
            tel,
            address,
            req.fileName,
            status,
            note,
            new Date(),
            req.authUser.username,
        ];

        const result = await Pg.executeQuery(sql, arg);
        if (result.error) return Logger.error(result.error);
        res.sendData(result.rows);
    } catch (err) {
        Logger.error('Error adding user :', err);
        res.sendError(err);
    }
}

const isExistUsername = async (username) => {

}

