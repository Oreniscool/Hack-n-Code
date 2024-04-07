import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Dashboard,
  HomeLayout,
  Login,
  Logout,
  Register,
  Home,
  Programs,
  Tapthepair,
  ChatWindow
} from './pages';
import { ToastContainer, toast } from 'react-toastify';
import WordChallenge from "./pages/WordChallenge";

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
      {
        path: 'wordchallenge',
        element: <WordChallenge />, 
      },
      {
        path: 'chatwindow',
        element: <ChatWindow />,
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
      {/* <WordChallenge></WordChallenge> */}
    </>
  );
}

export default App;
