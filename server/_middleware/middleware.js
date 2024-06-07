const Express = require("express") // สำหรับ library node สำหรับทำ Rest API
const Cors = require("cors") // สำหรับการเปิดให้ฝั่ง Frontend สามารถยิงเข้ามาผ่าน cross domain ได้
const FileUpload = require('express-fileupload');

const Middleware = Express();

const ResponseMiddleware = require('./response');

Middleware.use(Express.json());
Middleware.use(Express.urlencoded({ extended: true }));
Middleware.use(FileUpload());
Middleware.use(Cors());

Middleware.use('/image',Express.static('_src/image'));

Middleware.use(ResponseMiddleware);

module.exports = Middleware;