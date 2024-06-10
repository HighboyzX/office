
import { useEffect, useState } from "react";

import BackOffice from "../../components/BackOffice";
import Preloader from "../../components/Preloader";
import Modal from "../../components/Modal";
import LabelWithAsterisk from "../../components/LabelWithAsterisk";
import { Select2, SelectStatus, SelectGender } from "../../components/Select2";
import { CustomFileInput } from "../../components/CustomFileInput";

import { _msg } from "../../messages/MsgTh";
import * as Utils from '../../components/Utils';
import { Config } from "../../components/Config";

function MgrUser() {
    const [isLoading, setIsLoading] = useState(true);
    const [group] = useState('user');
    const [userList, setUserList] = useState([]);
    const initialUserState = {
        profile_pic: '',
        user_type_id: 2,
        username: '',
        password: '',
        name: '',
        birth_date: '',
        gender: 1,
        tel: '',
        address: '',
        note: '',
        status: 1
    };
    const [user, setUser] = useState(initialUserState);
    const [selectedImage, setSelectedImage] = useState(null);

    const [userTypeList, setUserTypeList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [districSubtList, setDistrictSubList] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const initialChangePasswordState = {
        user_id: '',
        old_password: '',
        new_password: '',
        confirm_password: ''
    }
    const [changePaasword, setChangePaasword] = useState(initialChangePasswordState);

    const [selectedExcelFile, setSelectedExcelFile] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const columnsToExport = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        if (userList.length > 0) {
            Utils.setDataTables('#dataTables', _msg.user, columnsToExport);
        }
    }, [userList]);

    const fetchData = async () => {
        await initalFetch();
        setIsLoading(false);
    }

    const initalFetch = async () => {
        fetchUsers();
        fetchUserType();
        // fetchProvince();
        // fetchDistrict();
        // fetchDistrictSub();
    }

    const fetchUsers = async () => {
        try {
            const response = await Utils.axiosGET('/user/getDataList', Config.authHeaders());
            if (response.success && response.data) {
                setUserList(response.data);
            } else {
                Utils.showAlert(response.error, 'error');
            }
        } catch (err) {
            Utils.showAlert(err.message, 'error');
        }
    }

    const fetchUserType = async () => {
        try {
            const response = await Utils.axiosGET('/select2/userType', Config.authHeaders());
            if (response.success && response.data) {
                setUserTypeList(response.data);
            } else {
                Utils.showAlert(response.error, 'error');
            }
        } catch (err) {
            Utils.showAlert(err.message, 'error');
        }
    }

    const fetchProvince = async () => {
        try {
            const response = await Utils.axiosGET('/select2/province', Config.authHeaders());
            if (response.success && response.data) {
                setProvinceList(response.data);
            } else {
                Utils.showAlert(response.error, 'error');
            }
        } catch (err) {
            Utils.showAlert(err.message, 'error');
        }
    }

    const fetchDistrict = async () => {
        try {
            const response = await Utils.axiosGET('/select2/district', Config.authHeaders());
            if (response.success && response.data) {
                setDistrictList(response.data);
            } else {
                Utils.showAlert(response.error, 'error');
            }
        } catch (err) {
            Utils.showAlert(err.message, 'error');
        }
    }

    const fetchDistrictSub = async () => {
        try {
            const response = await Utils.axiosGET('/select2/districtSub', Config.authHeaders());
            if (response.success && response.data) {
                setDistrictSubList(response.data);
            } else {
                setDistrictSubList
                Utils.showAlert(response.error, 'error');
            }
        } catch (err) {
            Utils.showAlert(err.message, 'error');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setChangePaasword({ ...changePaasword, [name]: value });
    }

    const handleSaveUser = async (e) => {
        e.preventDefault();
        let response;
        try {
            const params = new FormData();
            for (const key in user) {
                params.append(key, user[key]);
            }

            if (selectedImage) {
                params.append('profile_pic', selectedImage);
            }


            if (!user.user_id) {
                response = await Utils.axiosPOST('/user/addData', Config.multiHeaders(), params);
            } else {
                response = await Utils.axiosPUT('/user/updateData', Config.multiHeaders(), params);
            }


            if (response.success) {
                if (user.user_id) await Utils.setLocal(response.data);

                Utils.closeModal('#closeModal');
                Utils.showAlert(_msg.save_successfully, 'success', Utils.reload);
            } else if (response.status == 401) {
                Utils.showAlert(_msg.error_duplicate_user, 'warning');
            } else if (response.status == 400) {
                Utils.showAlert(_msg.error_regex_user_pass, 'warning')
            } else {
                Utils.showAlert(response.error, 'error');
            }

        } catch (err) {
            Utils.showAlert(err.message, 'error');
        }
    }

    const resetUserForm = () => {
        setUser(initialUserState);
        setSelectedImage({});
        setIsDisabled(false);
    }

    const handleDisable = () => {
        setIsDisabled(true);
    }

    const handleSavePassword = async (e) => {
        e.preventDefault();
        try {
            changePaasword.user_id = user.user_id;
            const response = await Utils.axiosPUT(`/user/updatePassword`, Config.authHeaders(), changePaasword);
            if (response.success) {
                Utils.closeModal('#closePasswordModal');
                Utils.showAlert(_msg.save_successfully, 'success');
            } else if (response.status == 404) {
                Utils.showAlert(_msg.error_confirm_password_fail, 'warning');
            } else if (response.status == 401) {
                Utils.showAlert(_msg.error_login_password_fail, 'warning');
            } else if (response.status == 400) {
                Utils.showAlert(_msg.error_regex_pass, 'warning');
            } else {
                Utils.showAlert(response.error, 'error');
            }

        } catch (err) {
            Utils.showAlert(err.message, 'error');
        }
    }

    const resetPasswordForm = () => {
        setChangePaasword(initialChangePasswordState);
    }

    const handleDeleteUser = async (id) => {
        const isConfirmed = await Utils.showConfirm(_msg.del_confirmation);
        if (isConfirmed) {
            try {
                const response = await Utils.axiosDELETE(`/user/deleteData/${id}`, Config.authHeaders());
                if (response.success) {
                    Utils.showAlert(_msg.delete_successfully, 'success', Utils.reload);
                } else {
                    Utils.showAlert(response.error, 'error');
                }
            } catch (err) {
                Utils.showAlert(err.message, 'error');
            }
        }
    }

    const handleExcelImport = async (e) => {
        e.preventDefault();

        if (selectedExcelFile) {
            try {
                const formData = new FormData();
                formData.append('fileExcel', selectedExcelFile);

                console.log('selectedExcelFile: ', selectedExcelFile);

                const response = await Utils.axiosPOST('/user/importExcel', Config.multiHeaders(), formData);

                if (response.success) {
                    Utils.closeModal('#closeImportExcelModal');
                    // Utils.showAlert(_msg.import_file_successfully, 'success', Utils.reload);
                    Utils.showAlert(_msg.import_file_successfully, 'success');
                } else {
                    Utils.showAlert(response.error, 'error');
                }
            } catch (err) {
                Utils.showAlert(err.message, 'error');
            }
        }
    }

    const resetExcelForm = () => {
        setSelectedExcelFile(null);
    }


    return (
        <>
            {isLoading && <Preloader />}
            {!isLoading &&
                <BackOffice title={_msg.menu_mgr_user}>
                    <div className="text-right mb-3">
                        <button
                            type="button"
                            className="btn btn-primary mr-2"
                            data-toggle="modal"
                            data-target="#userModal"
                            onClick={resetUserForm}
                        >
                            <i className="fa fa-plus mr-2"></i>
                            {_msg.add + _msg.user}
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            data-toggle="modal"
                            data-target="#importExcelModal"
                            onClick={resetExcelForm}
                        >
                            <i className="far fa-file-import mr-2"></i>
                            {_msg.import_excel}
                        </button>
                    </div>

                    <table className="table table-bordered table-hover dataTable dtr-inline" id='dataTables'>
                        <thead>
                            <tr className="text-center text-sm">
                                <th width='80px'>#</th>
                                <th width='100px'>{_msg.image}</th>
                                <th width='120px'>{_msg.type + _msg.user}</th>
                                <th width='80px'>{_msg.username_th}</th>
                                <th width='80px'>{_msg.name}</th>
                                <th width='80px'>{_msg.birth_date}</th>
                                <th width='80px'>{_msg.age}</th>
                                <th width='80px'>{_msg.gender}</th>
                                <th width='140px'>{_msg.tel_number}</th>
                                <th width='80px'>{_msg.address}</th>
                                <th width='100px'>{_msg.note}</th>
                                <th width='80px'>{_msg.create_date}</th>
                                <th width='120px'>{_msg.create_by}</th>
                                <th width='100px'>{_msg.update_date}</th>
                                <th width='120px'>{_msg.update_by}</th>
                                <th width='100px'>{_msg.last_login}</th>
                                <th width='80px'>{_msg.status}</th>
                                <th width='400px'>{_msg.manage}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {userList.length > 0 ? userList.map((user, index) => (
                                <tr key={user.user_id} className="text-sm">
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{Utils.setImageToTable(group, user.profile_pic)}</td>
                                    <td className="text-center">{user.user_type}</td>
                                    <td className="text-center">{user.username}</td>
                                    <td className="text-center">{user.name}</td>
                                    <td className="text-center">{Utils.setDateFormat(user.birth_date)}</td>
                                    <td className="text-center">{user.age + ' ' + _msg.time_year}</td>
                                    <td className="text-center">{Utils.setGender(user.gender)}</td>
                                    <td className="text-center">{user.tel}</td>
                                    <td className="text-center">{user.address}</td>
                                    <td className="text-center">{user.note}</td>
                                    <td className="text-center">{Utils.setDateTimeFormat(user.created_date)}</td>
                                    <td className="text-center">{user.created_by}</td>
                                    <td className="text-center">{Utils.setDateTimeFormat(user.updated_date)}</td>
                                    <td className="text-center">{user.updated_by}</td>
                                    <td className="text-center">{Utils.setDateTimeFormat(user.last_login)}</td>
                                    <td className="text-center">{Utils.setStatus(user.status)}</td>
                                    <td className="text-center">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-primary mr-2"
                                            data-toggle="modal"
                                            data-target="#infoModal"
                                            onClick={() => {
                                                setUser(user);
                                            }}
                                        >
                                            <i className="fa-solid fa-eye mr-2"></i>
                                            {_msg.see + _msg.data}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-warning mr-2"
                                            data-toggle="modal"
                                            data-target="#userModal"
                                            onClick={() => {
                                                setUser(user);
                                                handleDisable();
                                            }}
                                        >
                                            <i className="fa fa-edit mr-2"></i>
                                            {_msg.edit}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger mr-2"
                                            onClick={() => handleDeleteUser(user.user_id)}
                                        >
                                            <i className="fas fa-trash-alt mr-2"></i>
                                            {_msg.delete}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-info"
                                            data-toggle="modal"
                                            data-target="#passwordModal"
                                            onClick={() => {
                                                setUser(user);
                                                resetPasswordForm();
                                            }}
                                        >
                                            <i className="fa-solid fa-key mr-2"></i>
                                            {_msg.change + _msg.password_th}
                                        </button>
                                    </td>
                                </tr>
                            )) : <></>}
                        </tbody>
                    </table>

                    <Modal id='userModal' title={_msg.user} event={handleSaveUser} closeModalButton='closeModal' size='lg'>
                        {
                            user.profile_pic != '' ? <div className="text-center mb-4">{Utils.setImageToModal(group, user.profile_pic)}</div> : <></>
                        }

                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <CustomFileInput
                                    label={_msg.image}
                                    id='imageFileInput'
                                    onChange={Utils.handleFileInputChange(setSelectedImage)}
                                />
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.type + _msg.user} isRequired={true} />
                                        <Select2
                                            className="form-control mt-1"
                                            value={user.user_type_id}
                                            id="user_type_id"
                                            name="user_type_id"
                                            isDisabled={false}
                                            onChange={handleChange}
                                            options={userTypeList}
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.username} isRequired={true} />
                                        <input
                                            type="text"
                                            className="form-control mt-1"
                                            value={user.username}
                                            id="username"
                                            name="username"
                                            onChange={handleChange}
                                            disabled={isDisabled}
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.password} isRequired={true} />
                                        <input
                                            type="password"
                                            className="form-control mt-1"
                                            value={user.password}
                                            id="password"
                                            name="password"
                                            onChange={handleChange}
                                            disabled={isDisabled}
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.status} isRequired={true} />
                                        <SelectStatus
                                            className="form-control mt-1"
                                            value={user.status}
                                            id="status"
                                            name="status"
                                            isDisabled={false}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.name} isRequired={true} />
                                        <input
                                            type="text"
                                            className="form-control mt-1"
                                            value={user.name}
                                            id="name"
                                            name="name"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.gender} isRequired={true} />
                                        <SelectGender
                                            className="form-control mt-1"
                                            value={user.gender}
                                            id="gender"
                                            name="gender"
                                            isDisabled={false}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.birth_date} isRequired={true} />
                                        <input
                                            type="date"
                                            className="form-control mt-1"
                                            defaultValue={Utils.setDateFormatInput(user.birth_date)}
                                            id="birth_date"
                                            name="birth_date"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.tel_number} isRequired={false} />
                                        <input
                                            type="text"
                                            className="form-control mt-1"
                                            value={user.tel}
                                            id="tel"
                                            name="tel"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.address} isRequired={false} />
                                        <input
                                            type="text"
                                            className="form-control mt-1"
                                            value={user.address}
                                            id="address"
                                            name="address"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.note} isRequired={false} />
                                        <textarea
                                            className="form-control mt-1"
                                            value={user.note}
                                            id="note"
                                            name="note"
                                            onChange={handleChange}
                                            rows={3}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <Modal id='infoModal' title={_msg.user} closeModalButton='closeInfoModal' size='lg' hideFooter={true}>
                        {
                            user.profile_pic != '' ? <div className="text-center mb-4">{Utils.setImageToModal(group, user.profile_pic)}</div> : <></>
                        }

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.type + _msg.user} isRequired={true} />
                                        <Select2
                                            className="form-control form-control-border border-width-2 mt-1"
                                            value={user.user_type_id}
                                            options={userTypeList}
                                            isDisabled={true}
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.username} isRequired={true} />
                                        <input
                                            type="text"
                                            className="form-control form-control-border border-width-2 mt-1"
                                            value={user.username}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.password} isRequired={true} />
                                        <input
                                            type="password"
                                            className="form-control form-control-border border-width-2 mt-1"
                                            value={user.password}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.status} isRequired={true} />
                                        <SelectStatus
                                            className="form-control form-control-border border-width-2 mt-1"
                                            value={user.status}
                                            isDisabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.name} isRequired={true} />
                                        <input
                                            type="text"
                                            className="form-control form-control-border border-width-2 mt-1"
                                            value={user.name}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.gender} isRequired={true} />
                                        <SelectGender
                                            className="form-control form-control-border border-width-2 mt-1"
                                            value={user.gender}
                                            isDisabled={true}
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.birth_date} isRequired={true} />
                                        <input
                                            type="date"
                                            className="form-control form-control-border border-width-2 mt-1"
                                            defaultValue={Utils.setDateFormatInput(user.birth_date)}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.tel_number} isRequired={false} />
                                        <input
                                            type="text"
                                            className="form-control form-control-border border-width-2 mt-1"
                                            value={user.tel}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.address} isRequired={false} />
                                        <input
                                            type="text"
                                            className="form-control form-control-border border-width-2 mt-1"
                                            value={user.address}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-12 mb-2">
                                        <LabelWithAsterisk label={_msg.note} isRequired={false} />
                                        <textarea
                                            className="form-control form-control-border border-width-2 mt-1"
                                            value={user.note}
                                            rows={3}
                                            disabled
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <Modal id='passwordModal' title={_msg.change + _msg.password_th} event={handleSavePassword} closeModalButton='closePasswordModal'>

                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <LabelWithAsterisk label={_msg.password_th + _msg.old} isRequired={true} />
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    id="old_password"
                                    name="old_password"
                                    value={changePaasword.old_password}
                                    onChange={handleChangePassword}
                                    required
                                />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <LabelWithAsterisk label={_msg.password_th + _msg.new} isRequired={true} />
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    id="new_password"
                                    name="new_password"
                                    value={changePaasword.new_password}
                                    onChange={handleChangePassword}
                                    required
                                />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <LabelWithAsterisk label={_msg.confirm + _msg.password_th} isRequired={true} />
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    value={changePaasword.confirm_password}
                                    id="confirm_password"
                                    name="confirm_password"
                                    onChange={handleChangePassword}
                                    required
                                />
                            </div>
                        </div>
                    </Modal>
                    <Modal id='importExcelModal' title={_msg.user} event={handleExcelImport} closeModalButton='closeImportExcelModal'>
                        <CustomFileInput
                            label={_msg.attach_file}
                            id='importExcelInput'
                            isRequired={true}
                            onChange={Utils.handleFileInputChange(setSelectedExcelFile)}
                        />
                        <a href="exampleFile/importUserData.xlsx" download="importUserData.xlsx" className="text-xs ml-1">
                            {_msg.title_sample_file}
                        </a>
                    </Modal>

                </BackOffice>
            }
        </>
    )
}

export default MgrUser