import { NavLink } from 'react-router-dom';
import { _msg } from '../messages/MsgTh';
import { useState, useEffect } from 'react';
import * as Utils from './Utils';

function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setInfo();
  }, []);

  const setInfo = async () => {
    try {
      const userDetail = await Utils.getInfo();
      setIsAdmin(userDetail?.user_type_id === 1); //? userDetail != null, undefined && userDetail.user_tpye_id === 1
    } catch (err) {
      Utils.showAlert(err.message, 'error');
    }
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary bg-dark elevation-4">
      <a href="/home" className="brand-link">
        <img src="dist/img/logo3.jpg" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: 1 }} />
        <span className="brand-text">zureX</span>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-header">เมนูหลัก</li>
            <li className="nav-item">
              <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <i className="nav-icon fas fa-home"></i>
                <p>{_msg.menu_home}</p>
              </NavLink>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <NavLink to="/user" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  <i className="nav-icon fa-solid fa-user"></i>
                  <p>{_msg.manage + _msg.user}</p>
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
