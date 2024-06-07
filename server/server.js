const Express = require('express');
const App = Express();
const Dotenv = require('dotenv');
Dotenv.config();
const Port = process.env.PORT || 3001;

const Middleware = require('./_middleware/middleware');
const Router = require('./routes');
const Logger = require('./_helper/Logger');

App.use(Middleware);
App.use(Router);

App.listen(Port, () => {
    Logger.log('SERVER IS RUNNING ON Port [', Port, ']');
    Logger.log(`SERVER STARTED ON [ http://localhost:${Port} ]`);
});

