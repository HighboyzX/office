const Express = require('express');
const Router = Express.Router();

const { authenticateUser, getAuthenticatedUser } = require('./_utils/utils');

const authentication = require('./api/auth/authentication');
Router.post('/auth/login', authentication.validate, authentication.checkStatus, authentication.login);
const getAuthInfo = require('./api/auth/getAuthInfo');
Router.get('/auth/info', authenticateUser, getAuthInfo.validate, getAuthInfo.find);

const getUserList = require('./api/user/getDataList');
Router.get('/user/getDataList', authenticateUser, getUserList.validate, getUserList.select);
const addUser = require('./api/user/addData');
Router.post('/user/addData', authenticateUser, addUser.validate, addUser.checkUsernameDuplicate, addUser.uploadImage, addUser.insert);
const updateUser = require('./api/user/updateData');
Router.put('/user/updateData', authenticateUser, updateUser.validate, updateUser.uploadImage, updateUser.update, getAuthenticatedUser);
const updateUserPassword = require('./api/user/updatePassword');
Router.put('/user/updatePassword', authenticateUser, updateUserPassword.validate, updateUserPassword.update);
const updateInfomation = require('./api/user/updateInfomation');
Router.put('/user/updateInfomation', authenticateUser, updateInfomation.validate, updateInfomation.uploadImage, updateInfomation.update, getAuthenticatedUser);
const deleteUser = require('./api/user/deleteData');
Router.delete('/user/deleteData/:id', authenticateUser, deleteUser.validate, deleteUser.delete);
const importUser = require('./api/user/importUserDataFromExcel');
Router.post('/user/importExcel', authenticateUser, importUser.validate, importUser.insert);

const select2Controller = require('./api/select2/getData');
Router.get('/select2/userType', authenticateUser, select2Controller.validate, select2Controller.userType);
Router.get('/select2/province', authenticateUser, select2Controller.validate, select2Controller.province);
Router.get('/select2/district', authenticateUser, select2Controller.validate, select2Controller.district);
Router.get('/select2/districtSub', authenticateUser, select2Controller.validate, select2Controller.districtSub);

module.exports = Router;