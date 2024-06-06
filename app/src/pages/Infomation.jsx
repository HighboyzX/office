import { useState, useEffect, useRef } from "react";
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { _msg } from "../messages/MsgTh";
import * as Utils from '../components/Utils';
import { Config } from "../components/Config";

import BackOffice from "../components/BackOffice";
import Preloader from "../components/Preloader";

function Infomation() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const initialAuth = {
        user_id: '',
        user_type: '',
        username: '',
        name: '',
        gender: '',
        birth_date: '',
        tel: '',
        address: '',
        note: '',
        profile_pic: '',
        password: '',
        confirm_password: ''
    };
    const [group] = useState('user');
    const [auth, setAuth] = useState(initialAuth);
    const [selectedImage, setSelectedImage] = useState(null);
    const imageFileInput = useRef(null);


    useEffect(() => {
        setInfo();
    }, []);

    const setInfo = async () => {
        try {
            const response = await Utils.axiosGET('/auth/info',Config.authHeaders());
            if (response.success) {
                const data = response.data[0];

                if (data.birth_date) {
                    data.birth_date = Moment(data.birth_date).format('YYYY-MM-DD');
                }
                setAuth(response.data[0]);
                setIsLoading(false);
            } else {
                Utils.showAlert(response.error, 'error');
            }
        } catch (err) {
            Utils.showAlert(err.message, 'error');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuth({ ...auth, [name]: value });
    }
    const handleGoBack = () => {
        navigate(-1);
    }

    const handleSave = async (e) => {
        e.preventDefault();

        const isConfirmed = await Utils.showConfirm(_msg.update_confirmation);
        if (isConfirmed) {
            setIsLoading(true);

            try {
                const params = new FormData();
                for (const key in auth) {
                    if (auth[key] !== undefined) {
                        params.append(key, auth[key]);
                    }
                }
                if (selectedImage) {
                    params.append('profile_pic', selectedImage);
                }

                const response = await Utils.axiosPUT('/user/updateInfomation', Config.multiHeaders(), params);
                if (response.success) {
                    await Utils.setLocal(response.data);
                    setAuth({ ...auth, password: '', confirm_password: '' });
                    Utils.showAlert(_msg.save_successfully, 'success', Utils.reload);
                } else if (response.status == 400) {
                    Utils.showAlert(_msg.error_confirm_password_fail, 'warning');
                } else {
                    Utils.showAlert(response.error, 'error');
                }
            } catch (err) {
                Utils.showAlert(err.message, 'error');
            }
        }
    }

    return (
        <>
            {isLoading && <Preloader />}
            {!isLoading &&
                <BackOffice title={_msg.menu_profile}>
                    <form onSubmit={handleSave}>
                        <div className="row mx-3">
                            <div className="col-lg-2">
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <div className="text-center">{Utils.setImageToModal(group, auth.profile_pic)}</div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input
                                                type="file"
                                                className="form-control form-control-border border-width-2"
                                                id="imageFileInput"
                                                name="imageFileInput"
                                                ref={imageFileInput}
                                                onChange={Utils.handleFileInputChange(setSelectedImage)}
                                            />
                                            {/* <div className="custom-file mb-4">
                                                <input
                                                    type="file"
                                                    className="custom-file-input form-control-border"
                                                    id="imageFileInput"
                                                    name="imageFileInput"
                                                    ref={imageFileInput}
                                                    onChange={Utils.handleFileInputChange(setSelectedImage)}
                                                />
                                                <label className="custom-file-label" htmlFor="imageFileInput">{_msg.choose_file}</label>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="username">{_msg.username_th}:</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-border border-width-2"
                                                value={auth.username}
                                                id="username"
                                                name="username"
                                                onChange={handleChange}
                                                disabled
                                            />
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={auth.user_id || 0}
                                                disabled
                                                hidden
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="user_type">{_msg.type + _msg.user}:</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-border border-width-2"
                                                value={auth.user_type}
                                                id="user_type"
                                                name="user_type"
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="password">{_msg.password_th}:</label>
                                            <input
                                                type="password"
                                                className="form-control form-control-border border-width-2"
                                                value={auth.password || ''}
                                                id="password"
                                                name="password"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="confirm_password">{_msg.confirm + _msg.password_th}:</label>
                                            <input
                                                type="password"
                                                className="form-control form-control-border border-width-2"
                                                value={auth.confirm_password || ''}
                                                id="confirm_password"
                                                name="confirm_password"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="name">{_msg.name}:</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-border border-width-2"
                                                value={auth.name}
                                                id="name"
                                                name="name"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="gender">{_msg.gender}:</label>
                                            <select
                                                className="custom-select form-control-border border-width-2"
                                                style={{ width: "100%" }}
                                                value={auth.gender}
                                                id="gender"
                                                name="gender"
                                                onChange={handleChange}
                                            >
                                                <option value={1}>{_msg.gender_male}</option>
                                                <option value={2}>{_msg.gender_female}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="birth_date">{_msg.birth_date}:</label>
                                            <input
                                                type="date"
                                                className="form-control form-control-border border-width-2"
                                                value={auth.birth_date}
                                                id="birth_date"
                                                name="birth_date"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="tel">{_msg.tel_number}:</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-border border-width-2"
                                                value={auth.tel || ''}
                                                id="tel"
                                                name="tel"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="form-group">
                                            <label htmlFor="address">{_msg.address}:</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-border border-width-2"
                                                value={auth.address || ''}
                                                id="address"
                                                name="address"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label htmlFor="note">{_msg.note}:</label>
                                            <textarea
                                                className="form-control form-control-border border-width-2"
                                                value={auth.note || ''}
                                                id="note"
                                                name="note"
                                                onChange={handleChange}
                                                rows={3}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 text-center">
                                <button type="button" className="btn btn-sm btn-danger mr-2" onClick={handleGoBack}>
                                    <i className="fa-solid fa-arrow-left mr-2"></i>
                                    {_msg.go_back}
                                </button>
                                <button type="submit" className="btn btn-sm btn-success">
                                    <i className="fa-solid fa-floppy-disk mr-2"></i>
                                    {_msg.save}
                                </button>
                            </div>
                        </div>
                    </form>
                </BackOffice>
            }
        </>
    )
}

export default Infomation;
