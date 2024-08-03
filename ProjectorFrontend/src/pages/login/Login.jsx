import styles from'./Login.module.scss';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { useAppContext } from '../../context/AuthContext';  // Import the context hook

function Login() {
  // Setting up variables and context
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const navigate = useNavigate()
  const [mail, setMail] = useState(null)
  const [password, setPassword] = useState(null)

  // Setting up functions for fetching unputs
  const updMail = (mail) => setMail((m)=> m=mail)
  const updPwd = (pwd) => setPassword((p)=> p=pwd)

  // Log in by email and passwordfunction
  const loginUser = async () =>{
    let { data, error } = await supabase.auth.signInWithPassword({
      email: mail,
      password: password
    })
    
    // Redirect in case of succes
    if (data && data.user.role) {
      navigate('/');
      setIsLoggedIn(true) } else {
      console.log(error)
    };
  }
    
  return (
    <div className={styles.login}>
      {/* Login block */}
        <h1 className={styles.login__header}>ПРИВЕТСТВУЕМ ТЕБЯ В ПРОЖЕКТОРЕ!</h1>
        <h2 className={styles.login__subheader}>Первый раз тут?</h2>
        <h2 className={styles.login__subheader + ' ' + styles.login__subheader_underlined}><Link to="/signup">ЗАРЕГИСТРИРОВАТЬСЯ</Link></h2>
        <input onChange={(e)=>updMail(e.target.value)} placeholder='Электронная почта' type="email" className="login__input" id='email'/>
        <input onChange={(e)=>updPwd(e.target.value)} placeholder='Пароль' type="password" className="login__input" id='password'/>
        <h2 className={styles.login__subheader + ' ' + styles.login__subheader_underlined}><a href="#">Забыли пароль?</a></h2>
        <button onClick={loginUser} className={styles.login__button} data-content='ВОЙТИ'>
            
        </button>
    </div>
  )
}

export default Login;
