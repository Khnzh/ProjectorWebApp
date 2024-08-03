import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing/Landing'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import Projects from './pages/projects/Projects';
import Header from './components/header/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile/:emode' element={<Profile />} />
        <Route path='/projects' element={<Projects/>} />
      </Routes>
    </BrowserRouter>
  );
}
