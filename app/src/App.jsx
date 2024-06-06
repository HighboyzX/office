import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Utils from './components/Utils';
import { _msg } from './messages/MsgTh';

function App() {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await Utils.axiosPOST('/auth/login', null, user);
      if (response.success) {
        await Utils.setLocal(response.data);
        navigate('/home');
      } else if (response.status === 400 && response.error == 'Username not found') {
        Utils.showAlert(_msg.error_login_user_found, 'error');
      } else if (response.status === 400 && response.error == 'Invalid password') {
        Utils.showAlert(_msg.error_login_password_fail, 'error');
      } else if (response.status === 403) {
        Utils.showAlert(_msg.error_banned_user, 'warning');
      } else {
        Utils.showAlert(response.error, 'error');
      }
    } catch (err) {
      Utils.showAlert(err.message, 'error');
    }
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="/">
            <b className="mr-2">{_msg.app_name}</b>
            <span className="text-lg">Ecommerce</span>
          </a>
        </div>
        <div className="card pb-4">
          <div className="card-body login-card-body text-center">
            <img src="dist/img/signin_logo.png" className="mb-3" style={{ width: 150, height: 150 }} alt="Sign In Logo" />
            <p className="login-box-msg">Sign in to your Account</p>
            <form onSubmit={handleSignIn}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={_msg.username}
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder={_msg.password}
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
