import ReactDOM from 'react-dom/client';
import './index.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateRoute from './components/PrivateRoute';
import App from './App';
import Home from './pages/Home';
import Infomation from './pages/Infomation';
import MgrUser from './pages/user/MgrUser';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/home',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: '/infomation',
    element: (
      <PrivateRoute>
        <Infomation />
      </PrivateRoute>
    ),
  },
  {
    path: '/user',
    element: (
      <PrivateRoute>
        <MgrUser />
      </PrivateRoute>
    ),
  },
]);


document.addEventListener('DOMContentLoaded', function () {
  if (window.bsCustomFileInput) {
    window.bsCustomFileInput.init();
  } else {
    console.error('bsCustomFileInput is not loaded');
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
