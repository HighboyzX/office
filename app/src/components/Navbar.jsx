import { useNavigate, Link } from 'react-router-dom';
import { _msg } from '../messages/MsgTh';
import * as Utils from './Utils';
import { useState, useEffect } from 'react';

function Navbar() {
    const [group] = useState('user');
    const [auth, setAuth] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setInfo();
    }, []);

    const setInfo = async () => {
        try {
            const userDetail = await Utils.getInfo();
            if (userDetail != null && userDetail != undefined) {
                setAuth(userDetail);
            }
        } catch (err) {
            Utils.showAlert(err.message, 'error');
        }
    }

    const handleSignOut = async () => {
        const isConfirmed = await Utils.showConfirm(_msg.signout_confirmation);
        if (isConfirmed) {
            // localStorage.removeItem('token');
            localStorage.clear();

            navigate('/');
        }
    }
    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/home" className="nav-link">{_msg.menu_home}</Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link py-0 d-flex align-items-center" data-toggle="dropdown" role="button">
                            {Utils.setImageLogo(group, auth.profile_pic)}
                            {/* <img src="dist/img/profile.jpg" alt="AdminLTE Logo" className="img-circle mr-2" style={{ width: 33, height: 33 }} /> */}
                            <span className='text-bold'>{auth.username}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-md dropdown-menu-right">
                            <Link to="/infomation" className="dropdown-item">
                                <i className="fa-solid fa-user-unlock mr-2"></i>
                                {_msg.menu_profile}
                            </Link>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" role='button' onClick={handleSignOut}>
                                <i className="fa-solid fa-power-off mr-2"></i>
                                {_msg.logout}
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar