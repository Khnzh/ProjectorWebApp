import { BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import Landing from './pages/landing/Landing'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import Projects from './pages/projects/Projects';
import Header from './components/header/Header';
import Account from './pages/account/Account';
import Sidebar from './components/sidebar/Sidebar';

function AppInside() {
  const location = useLocation();

  // Determine if the current path is '/create'
  const isCreatePage = location.pathname === "/create" || location.pathname === "/sb";

  return (
    <>
      {(!isCreatePage)&&<Header />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile/:emode' element={<Profile />} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/create' element={<Account/>}/>
        <Route path='/sb' element={<Sidebar/>}/>
      </Routes>
    </>
  );
}

export default function App() {
  return (<BrowserRouter>
  <AppInside/>
  </BrowserRouter>)

}
