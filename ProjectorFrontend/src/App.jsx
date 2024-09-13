import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Landing from './pages/landing/Landing'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import Projects from './pages/projects/Projects';
import Header from './components/header/Header';
import Account from './pages/account/Account';
import Sidebar from './components/sidebar/Sidebar';
import ProjectDisplay from './pages/projectDisplay/ProjectDisplay';
import ProjectDetailedView from './pages/projectDetailedView/ProjectDetailedView';

function AppInside() {
  const location = useLocation();

  // Determine if the current path is '/create'
  const isCreatePage = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup"
    || location.pathname === "/profile/1" || location.pathname === "/profile/0";

  return (
    <>
      {(isCreatePage) && <Header />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile/:emode' element={<Profile />} />
        <Route element={<Account />}>
          <Route path='/projects' element={<ProjectDisplay />} />
          <Route path='/project/:prId' element={<ProjectDetailedView />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (<BrowserRouter>
    <AppInside />
  </BrowserRouter>)

}
