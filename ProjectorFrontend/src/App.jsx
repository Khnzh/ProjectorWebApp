import supabase from './config/supabaseClient';
import {BrowserRouter, Router, Link, Route, Routes} from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';
import Signup from './Signup';
import { useAppContext } from './context/AuthContext';

export default function App() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext();

  const logoutUser = async (e) =>  {
    e.preventDefault();
    let { error } = await supabase.auth.signOut();
    setIsLoggedIn(false);
  }

return (
    <BrowserRouter>
      <div className="header">
        <ul className="nav-bar">
          <li className="nav-link"><Link to='/'>О НАС</Link></li>
          <li className="nav-link"><Link to='/'>ПОЛЬЗОВАТЕЛЯМ</Link></li>
          <li className="nav-link"><Link to='/'>ПАРТНЕРАМ</Link></li>
          <li className="nav-link"><Link to='/'>КОНТАКТЫ</Link></li>
          {isLoggedIn?(
            <li className="sign"><a onClick={logoutUser} href="#">ВЙТИ</a></li>
          ):(
            <li className="sign"><Link to='/login'>ВОЙТИ В АККАУНТ</Link></li>
          )}
        </ul>
      </div>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
)
}