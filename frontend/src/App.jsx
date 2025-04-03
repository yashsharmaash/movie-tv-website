import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WatchPage from './pages/WatchPage';
import Searchpage from './pages/Searchpage'
import HistoryPage from './pages/HistoryPage';
import { Toaster } from 'react-hot-toast';
import { useAuthUser } from './store/authUser';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from "lucide-react";



function App() {

  const { user, isauthCheck, authCheck } = useAuthUser();
  console.log("user", user);
  useEffect(() => {
    authCheck();
  }
    , [authCheck]);

  if (isauthCheck) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center h-full bg-black'>
          <Loader className='animate-spin text-teal-500 w-10 h-10' />
        </div>

      </div>
    )
  }


  return (


    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
        <Route path='/search' element={user ? <Searchpage /> : <Navigate to={"/login"} />} />
        <Route path='/history' element={user ? <HistoryPage /> : <Navigate to={"/login"} />} />
      </Routes>
      <Toaster />
    </div>

  )
}

export default App
