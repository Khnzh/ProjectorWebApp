import { Link, useNavigate } from 'react-router-dom';
import supabase from './config/supabaseClient';
import { useAppContext } from './context/AuthContext';
import { useEffect } from 'react';

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const localKey = "sb-rotyixpntplxytekbeuz-auth-token";
  const navigate = useNavigate();
  
  useEffect(()=>{
      if (localStorage.getItem(localKey)){
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }
, [isLoggedIn, setIsLoggedIn])

  const logoutUser = async (e) =>  {
    e.preventDefault();
    let { error } = await supabase.auth.signOut();
    setIsLoggedIn(false);
    error ? console.log(error) : navigate('/');
  }

  return (
    <div className="header">
      <ul className="nav-bar">
        <li className="nav-link"><Link to='/'>О НАС</Link></li>
        <li className="nav-link"><Link to='/'>ПОЛЬЗОВАТЕЛЯМ</Link></li>
        <li className="nav-link"><Link to='/'>ПАРТНЕРАМ</Link></li>
        <li className="nav-link"><Link to='/'>КОНТАКТЫ</Link></li>
        {isLoggedIn ? (
          <>
            <li className="sign margin-30"><Link to='/profile'>ПРОФИЛЬ</Link></li>
            <li className="sign"><a onClick={logoutUser}>ВЫЙТИ</a></li>
          </>
        ) : (
          <li className="sign margin-30"><Link to='/login'>ВОЙТИ В АККАУНТ</Link></li>
        )}
      </ul>
    </div>
  );
}
