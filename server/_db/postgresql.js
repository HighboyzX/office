const { Pool } = require('pg');
const Dotenv = require('dotenv');
Dotenv.config();
const Logger = require('../_helper/Logger');

const Tag = '[PG-POOL] -';

const Pg = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

Pg.on('connect',(client) => {
    Logger.info(Tag,'EVENT - Process created [id:'+client.processID+']');
});

Pg.on('error',(err) => {
    Logger.error(Tag,'ERROR -');
    Logger.error(JSON.stringify(err));
});

const executeQuery = (queryText, queryParams) => Pg.query(queryText, queryParams);

module.exports = {
    executeQuery
};
