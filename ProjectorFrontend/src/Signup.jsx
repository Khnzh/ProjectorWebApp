import './Signup.css';
import supabase from './config/supabaseClient';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useAppContext } from './context/AuthContext';

function Signup() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext(); 
  const navigate = useNavigate();
  const [mail, setMail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dob, setDob] = useState(null);
  const [sex, setSex] = useState(null);
  const [subscribed, setSubscription] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [policy, setPolicy] = useState(false);

  const updMail = (mail) => setMail((m)=> m=mail);
  const updPwd = (pwd) => setPassword((p)=> p=pwd);
  const updName = (name) => setName((n)=> n=name);
  const updLastName = (LastName) => setLastName((l)=> l=LastName);
  const updDob = (dob) => setDob((d)=> d=dob);
  const updSex = (sex) => setSex((s)=> s=sex);
  const updSubscription = () => setSubscription((s)=> !s);
  const updAgreement = () => setAgreement((a) => !a);
  const updPolicy = () => setPolicy((p) => !p);

  const signUser = async () =>{
    let authData;
    let profileData;

    const auth = async () => {
        let { data, error } = await supabase.auth.signUp({
        email: mail,
        password: password
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
  .update({ name, lastName, dob, sex })
  .eq('user_id', authData.user.id)
  .select()
  if (data){ 
    console.log( data);
    setIsLoggedIn(true);
    navigate('/');
} else {console.log(error)}
        }
    }

  }

  return (
    <div className='login__cnt'>
        <h1 className='login__header'>ПРИВЕТСТВУЕМ ТЕБЯ В ПРОЖЕКТОРЕ!</h1>
        <input onChange={(e)=>updMail(e.target.value)} placeholder='Электронная почта' type="email" className="login__input signup" id='email'/>
        <input onChange={(e)=>updPwd(e.target.value)} placeholder='Пароль' type="password" className="login__input signup" id='password'/>
        <input onChange={(e)=>updName(e.target.value)} placeholder='Имя' type="text" className="login__input signup" id='name'/>
        <input onChange={(e)=>updLastName(e.target.value)} placeholder='Фамилия' type="text" className="login__input signup" id='second_name'/>
        <div className="signup__radio__cnt no-underline">
            <input onClick={(e) => updSex(e.target.value)} type="radio" id="sex_m" name="sex" value={false}/>
            <label htmlFor="sex_m"><svg className="radio sign__svg" viewBox="0 0 40 38" >
                <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                    c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                </svg><span className="radio__label">М</span></label>
        <input onClick={(e) => updSex(e.target.value)} type="radio" id="sex_f" name="sex" value={true}/>
            <label htmlFor="sex_f"><svg className="radio sign__svg" viewBox="0 0 40 38" >
                <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                    c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                </svg><span className="radio__label">Ж</span></label>
        </div>
        <input onChange={(e)=>updDob(e.target.value)}  placeholder='Дата рождения' type="date" className="login__input signup" id='dob'/>
        <ul>
            <li>
                <input onClick={updAgreement} type='checkbox' id='agreement' name='agreement' value='agreed_to_data' required/>
                <label htmlFor="agreement" className='radio__label'><svg className="sign__svg" viewBox="0 0 40 38" >
                <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                    c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                </svg>
                <span className='sign__label'>Соглашаюсь с Обработкой персональных данных</span></label>
            </li>
            <li>
                <input onClick={updPolicy} type='checkbox' id='policy' name='policy' value='agreed_to_policy' required/>
                <label htmlFor="policy" className='radio__label'><svg className="sign__svg" viewBox="0 0 40 38" >
                <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                    c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                </svg>
                <span className='sign__label'>Соглашаюсь с Политикой конфиденциальности</span></label>
            </li>
            <li>
                <input onClick={updSubscription} type='checkbox' id='subscribe' name='sub_to_news' value='subscribed'/>
                <label htmlFor="subscribe"><svg className="sign__svg" viewBox="0 0 40 38" >
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
