import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  Dashboard,
  HomeLayout,
  Login,
  Logout,
  Register,
  Home,
  Programs,
  Tapthepair,
} from './pages';
import { ToastContainer, toast } from 'react-toastify';
import WordChallenge from './pages/WordChallenge';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
      {
        path: 'programs',
        element: <Programs />,
      },
      {
        path: 'tapthepair',
        element: <Tapthepair />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
library.add(fab, fas, far);
