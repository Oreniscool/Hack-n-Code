import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Dashboard, HomeLayout, Login, Logout, Register, Home , Tapthepair} from './pages';
import { ToastContainer, toast } from 'react-toastify';

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
