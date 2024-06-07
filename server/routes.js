const Express = require('express');
const Router = Express.Router();

const { checkLogin, getUserLocal } = require('./_utils/utils');

const authentication = require('./api/auth/authentication');
Router.post('/auth/login', authentication.validate, authentication.checkStatus, authentication.login);
const getAuthInfo = require('./api/auth/getAuthInfo');
Router.get('/auth/info', checkLogin, getAuthInfo.validate, getAuthInfo.find);

const getUserList = require('./api/user/getDataList');
Router.get('/user/getDataList', checkLogin, getUserList.validate, getUserList.select);
const addUser = require('./api/user/addData');
Router.post('/user/addData', checkLogin, addUser.validate, addUser.checkUsernameDuplicate, addUser.uploadImage, addUser.insert);
const updateUser = require('./api/user/updateData');
Router.put('/user/updateData', checkLogin, updateUser.validate, updateUser.uploadImage, updateUser.update, getUserLocal);
const updateUserPassword = require('./api/user/updatePassword');
Router.put('/user/updatePassword', checkLogin, updateUserPassword.validate, updateUserPassword.update);
const updateInfomation = require('./api/user/updateInfomation');
Router.put('/user/updateInfomation', checkLogin, updateInfomation.validate, updateInfomation.uploadImage, updateInfomation.update, getUserLocal);
const deleteUser = require('./api/user/deleteData');
Router.delete('/user/deleteData/:id', checkLogin, deleteUser.validate, deleteUser.delete);
const importUser = require('./api/user/importUserDataFromExcel');
Router.post('/user/importExcel', checkLogin, importUser.validate, importUser.insert);

const select2Controller = require('./api/select2/getData');
Router.get('/select2/userType', checkLogin, select2Controller.validate, select2Controller.userType);

module.exports = Router;