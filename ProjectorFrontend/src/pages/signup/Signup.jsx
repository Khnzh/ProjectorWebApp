import './Signup.module.scss';
import supabase from '../../config/supabaseClient';
import {useState, useEffect} from "react";
import { signupValidation } from '../../utilityFunctions/Validation';
import {useNavigate} from "react-router-dom";
import { useAppContext } from '../../context/AuthContext';
import { portfolioValidation } from '../../utilityFunctions/Validation';

function Signup() {
  const { setIsLoggedIn } = useAppContext(); 
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const [signup, setSignup] = useState({
    mail: null,
    password: null,
    name: null,
    lastName: null,
    dob: null,
    sex: null,
    subscribed: false,
    agreement: false,
    policy: false,
  })

  const updMail = (mail) => {
    setSignup((s) =>{
        return {...s, mail: mail.trim()}
    });
  };

  const updPwd = (pwd) => {
    setSignup((s) =>{
        return {...s, password: pwd.trim()}
    });
  };

  const updName = (name) => {
    setSignup((s) =>{
        return {...s, name: name.trim()}
    });
  };

  const updLastName = (lastName) => {
    setSignup((s) =>{
        return {...s, lastName: lastName.trim()}
    });
  };

  const updDob = (dob) => {
    setSignup((s) =>{
        return {...s, dob: dob.trim()}
    });
  };

  const updSex = (sex) => {
    setSignup((s) =>{
        return {...s, sex: sex.trim()}
    });
  };

  const updSubscription = () => {
    setSignup((s) =>{
        return {...s, subscribed: !s.subscribed}
    });
  };

  const updAgreement = () => {
    setSignup((s) =>{
        return {...s, agreement: !s.agreement}
    });
  };

  const updPolicy = () => {
    setSignup((s) =>{
        return {...s, policy: !s.policy}
    });
  };

//   useEffect(()=>{console.log(signup); console.log(new Date().getFullYear())}, [signup])

  const signUser = async () =>{
    let errs = signupValidation(signup)
    if (Object.keys(errs).length>0) {
        setErrors(errs)
        return errs
    };


    let authData;
    let profileData;
  

    const auth = async () => {
        let { data, error } = await supabase.auth.signUp({
        email: signup.mail,
        password: signup.password
        });
        if (data) {
            console.log(data);
            return data;
        } else {
            console.log(error);
        }
    }

    const createProfile = async () => {
        const { data, error } = await supabase
  .from('Profile')
  .insert([
    { user_id: authData.user.id},
  ])
  .select()
  if (data){ 
    return data
} else {console.log(error)}
    }
    
    authData = await auth();
    if (authData) {
        profileData = await createProfile()
        if (profileData){
            const { data, error } = await supabase
  .from('Profile')
  .update({ name: signup.name, lastName: signup.lastName, dob: signup.dob, sex: new Boolean(signup.sex), subscribed: signup.subscribed })
  .eq('user_id', authData.user.id)
  .select()
  if (data){ 
    console.log( data);
    setIsLoggedIn(true);
    navigate('/profile/1');
} else {console.log(error)}
        }
    }

  }

  return (
    <div className='login__cnt'>
        <h1 className='login__header'>ПРИВЕТСТВУЕМ ТЕБЯ В ПРОЖЕКТОРЕ!</h1>
        <input onChange={(e)=>updMail(e.target.value)} placeholder='Электронная почта' type="email" className="login__input signup" id='email'/>
        {errors.mail && (<p className="validation-message">{errors.mail}</p>)}
        <input onChange={(e)=>updPwd(e.target.value)} placeholder='Пароль' type="password" className="login__input signup" id='password'/>
        {errors.password && (<p className="validation-message">{errors.password}</p>)}
        <input onChange={(e)=>updName(e.target.value)} placeholder='Имя' type="text" className="login__input signup" id='name'/>
        {errors.name && (<p className="validation-message">{errors.name}</p>)}
        <input onChange={(e)=>updLastName(e.target.value)} placeholder='Фамилия' type="text" className="login__input signup" id='second_name'/>
        {errors.lastName && (<p className="validation-message">{errors.lastName}</p>)}
        <div className="signup__radio__cnt no-underline">
            <input onClick={(e) => updSex(e.target.value)} type="radio" id="sex_m" name="sex" value={false}/>
            <label htmlFor="sex_m"><svg className="radio sign__svg" viewBox="0 0 40 38" >
                <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                    c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                </svg><span className="radio__label signup__label">М</span></label>
        <input onClick={(e) => updSex(e.target.value)} type="radio" id="sex_f" name="sex" value={true}/>
            <label htmlFor="sex_f"><svg className="radio sign__svg" viewBox="0 0 40 38" >
                <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                    c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                </svg><span className="radio__label signup__label">Ж</span></label>
        </div>
        {errors.sex && (<p className="validation-message">{errors.sex}</p>)}
        <input onChange={(e)=>updDob(e.target.value)}  placeholder='Дата рождения' type="date" className="login__input signup" id='dob'/>
        {errors.dob && (<p className="validation-message">{errors.dob}</p>)}
        <ul>
            <li>
                <input onClick={updAgreement} type='checkbox' id='agreement' name='agreement' value='agreed_to_data' required/>
                <label htmlFor="agreement" className='radio__label'><svg className="sign__svg" viewBox="0 0 40 38" >
                <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                    c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                </svg>
                <span className='sign__label'>Соглашаюсь с Обработкой персональных данных</span></label>
                {errors.agreement && (<p className="validation-message">{errors.agreement}</p>)}
            </li>
            <li>
                <input onClick={updPolicy} type='checkbox' id='policy' name='policy' value='agreed_to_policy' required/>
                <label htmlFor="policy" className='radio__label'><svg className="sign__svg" viewBox="0 0 40 38" >
                <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                    c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                </svg>
                <span className='sign__label'>Соглашаюсь с Политикой конфиденциальности</span></label>
                {errors.policy && (<p className="validation-message">{errors.policy}</p>)}
            </li>
            <li>
                <input onClick={updSubscription} type='checkbox' id='subscribe' name='sub_to_news' value='subscribed'/>
                <label htmlFor="subscribe" className='radio__label'><svg className="sign__svg" viewBox="0 0 40 38" >
                <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                    c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                </svg>
                <span className='sign__label'>Подписаться на рассылку</span></label>
            </li>
        </ul>

        <button onClick={signUser} className="svg-border-button">
            
        </button>
    </div>
  )
}

export default Signup;
