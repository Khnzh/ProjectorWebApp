import './Login.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { useAppContext } from '../../context/AuthContext';  // Import the context hook

function Login() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const navigate = useNavigate()
  const [mail, setMail] = useState(null)
  const [password, setPassword] = useState(null)

  const updMail = (mail) => setMail((m)=> m=mail)
  const updPwd = (pwd) => setPassword((p)=> p=pwd)

  const signUser = async () =>{
    let { data, error } = await supabase.auth.signUp({
      email: mail,
      password: password
    });

    const { response, e } = await supabase
  .from('Profile')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ])
  .select()

    if (data && data.user.role) {
      navigate('/');
      setIsLoggedIn(true)} else {
      console.log(error)
    };
  }


  const loginUser = async () =>{
    let { data, error } = await supabase.auth.signInWithPassword({
      email: mail,
      password: password
    })

    if (data && data.user.role) {
      navigate('/');
      setIsLoggedIn(true) } else {
      console.log(error)
    };
  }

  const logoutUser = async () =>  {let { error } = await supabase.auth.signOut()}
    

  return (
    <div className='login__cnt blurred_bg'>
        <h1 className='login__header'>ПРИВЕТСТВУЕМ ТЕБЯ В ПРОЖЕКТОРЕ!</h1>
        <h2 className='login__header2'>Первый раз тут?</h2>
        <h2 className='login__header2 underlined-bold'><Link to="/signup">ЗАРЕГИСТРИРОВАТЬСЯ</Link></h2>
        <input onChange={(e)=>updMail(e.target.value)} placeholder='Электронная почта' type="email" className="login__input" id='email'/>
        <input onChange={(e)=>updPwd(e.target.value)} placeholder='Пароль' type="password" className="login__input" id='password'/>
        <h2 className='login__header2 underlined-bold'><a href="#">Забыли пароль?</a></h2>

        <button onClick={loginUser} className="svg-border-button">
            
        </button>
    </div>
  )
}

export default Login;
