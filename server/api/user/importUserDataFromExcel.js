const Fs = require('fs');
const Exceljs = require('exceljs');
const Pg = require('../../_db/postgresql');
const Logger = require('../../_helper/Logger');

exports.validate = (req, res, next) => {
    if (!req.files) {
        res.sendParameterRequired();
    } else {
        console.log(req.files);
        // next();
        res.sendData();
    }
}

exports.insert = async (req, res, next) => {
    try {
        if (req.files != undefined && req.files.fileExcel != null) {
            const fileExcel = req.files.fileExcel;
            const filePath = './tmp/' + fileExcel.name;

            fileExcel.mv(filePath, async (err) => {
                if (err) return res.sendError(err);

                const wb = new Exceljs.Workbook();
                await wb.xlsx.readFile(filePath);

                const ws = wb.getWorksheet(1);

                for (let i = 2; i <= ws.rowCount; i++) {
                    const name = ws.getRow(i).getCell(1).value;
                    const cost = ws.getRow(i).getCell(2).value;
                    const price = ws.getRow(i).getCell(3).value;

                    await createUserFromExcel(i, name, cost, price);
                }
                await deleteFileExcel(filePath);
                res.sendData();
            });
        } else {
            res.sendError('File not found!', 404);
        }
    } catch (err) {
        Logger.error('Error importing excel: ', err.message);
        res.sendError(err.message);
    }
}

const createUserFromExcel = async (index, name, cost, price) => {
    const opts = {
        data: {
            name: name || '',
            cost: parseInt(cost) || 0,
            price: parseInt(price) || 0,
            img: ''
        }
    };

    try {
        await Prisma.db_product.create(opts);
    } catch (err) {
        Logger.error(`Error creating user on index "${index}": `, err.message);
        res.sendError(err.message);
    }
}

const deleteFileExcel = async (filePath) => {
    try {
        await Fs.promises.unlink(filePath);
    } catch (err) {
        Logger.error('Error deleting file: ', err.message);
        res.sendError(err.message);
    }
}