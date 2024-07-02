import './Profile.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import supabase from './config/supabaseClient';


export default function Profile(){
   const localKey = "sb-rotyixpntplxytekbeuz-auth-token";
   const [uId, setUId] = useState(null);
   const [email, setEmail] = useState(null);
   const [name, setName] = useState(null);
   const [lastName, setLastName] = useState(null);
   const [bio, setBio] = useState(null);
   const [eduType, setEduType] = useState(null);
   const [enrollment, setEnrollment] = useState(null);
   const [facility, setFacility] = useState(null);
   const [faculty, setFaculty] = useState(null);
   const [grad, setGrad] = useState(null);
   const [langs, setLangs] = useState(null);
   const [mastery, setMastery] = useState(null);
   const [phNumber, setPhNumber] = useState(null);
   const [socials, setSocials] = useState(null);
   const [tg, setTg] = useState(null);

   const { editMode } = useParams();
   const [mode, setMode] = useState(false)
   const [filledPr, setFilledPr] = useState(false)
   const [filledEdu, setFilledEdu] = useState(false)
   useEffect(()=>{setMode(editMode)}, [editMode])
   useEffect(()=>{
    if (name && lastName && email && bio && langs && phNumber && tg && socials){
        setFilledPr(true)
    } else {
        setFilledPr(false)
    }
   },[name, lastName, email, bio, langs, phNumber, tg, socials])

   useEffect(()=>{
    if (eduType && facility && faculty && mastery && enrollment && grad){
        setFilledEdu(true)
    } else {
        setFilledEdu(false)
    }
   },[eduType, facility, faculty, mastery, enrollment, grad])

   useEffect(() =>
    { 
        const info = JSON.parse(localStorage.getItem(localKey));
        setUId((u) => info.user.id);
        setEmail((e) => info.user.email);
        const fetchGifts = async() => {
            let { data: Profile, error } = await supabase
            .from('Profile')
            .select("*")
            // Filters
            .eq('user_id', uId)
            console.log(Profile[0])
            setEduType((e) => Profile[0].edu_type)
            setName((n) => Profile[0].name)
            setLastName((l) => Profile[0].lastName)
            setBio((b) => Profile[0].bio)
            setEnrollment((e) => Profile[0].enrollment)
            setFacility((f) => Profile[0].facility)
            setFaculty((f) => Profile[0].faculty)
            setGrad((g) => Profile[0].graduation)
            setLangs((l) => Profile[0].languages)
            setMastery((m) => Profile[0].mastery)
            setPhNumber((p) => Profile[0].phoneNumber)
            setSocials((s) => Profile[0].socials)
            setTg((t) => Profile[0].telegram)
        };
        if (uId && email) fetchGifts();
}
, [uId])
const [active, setActive] = useState(1)
const changeActive = (n) => {setActive((a)=>n)}

    return(
        <>
        <div className="tab-container blurred_bg">
            <div className="tab-positioning">
                <div onClick={()=>changeActive(1)} className={active===1 ?"tab-toggle active-tab" : "tab-toggle"}><p>О себе</p></div>
                <div onClick={()=>changeActive(2)} className={active===2 ?"tab-toggle active-tab" : "tab-toggle"}><p>Портфолио</p></div>
                <div onClick={()=>changeActive(3)} className={active===3 ?"tab-toggle active-tab" : "tab-toggle"}><p>Образование</p></div>
            </div>


            <div className="tab-content" style={{display:  (active===1) ? 'flex' : 'none' }}>
                <h1>Расскажите о себе</h1>
                <label htmlFor="name">ИМЯ</label>
                <input disabled={false} type="text" name="name" id="name" defaultValue={name} placeholder='Введите...'/>
                <label htmlFor="lastName" >ФАМИЛИЯ</label>
                <input type="text" name="lastName" id="lastName" defaultValue={lastName} placeholder='Введите...'/>
                <label htmlFor="email">ПОЧТА</label>
                <input type="email" name="email" id="email" defaultValue={email} placeholder='Введите...'/>
                <label htmlFor="bio">НЕСКОЛЬКО СЛОВ О ВАС</label>
                <textarea name="description" id="bio" defaultValue={bio}></textarea>
                <label htmlFor="langs">ЯЗЫКИ</label>
                <input type="text" name="langs" id="langs" defaultValue={langs} placeholder='Введите...'/>
                <label htmlFor="mobile">ТЕЛЕФОН</label>
                <input type="number" name="mobile" id="mobile" defaultValue={phNumber} placeholder='Введите...'/>
                <label htmlFor="tgLink">ТЕЛЕГРАМ</label>
                <input type="text" name="tgLink" id="tgLink" defaultValue={tg} placeholder='Введите...'/>
                <label htmlFor="socialMedia">ССЫЛКИ НА ДРУГИЕ СОЦИАЛЬНЫЕ СЕТИ</label>
                <input type="text" name="socialMedia" id="socialMedia" defaultValue={socials} placeholder='Введите...'/>
                <button>Save changes</button>
            </div>
            <div className="tab-content" style={{display:  (active===3) ? 'flex' : 'none' }}>
                <h1>Добавьте ваше образование</h1>
                <p>ВИД ОБРАЗОВАНИЯ*</p>
                <div className="signup__radio__cnt no-underline">
                    <input type="radio" id="general" name="eduType" value="general" defaultChecked={new Boolean(eduType == 'general')}/>
                    <label htmlFor="general"><svg className="sign__svg" viewBox="0 0 40 38" >
                        <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                            c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                        <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                        </svg><span className="radio__label">Основное</span></label>
                <input type="radio" id="additional" name="eduType" value="additional" defaultChecked={new Boolean(eduType == 'additional')}/>
                    <label htmlFor="additional"><svg className="sign__svg" viewBox="0 0 40 38" >
                        <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                            c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                        <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                        </svg><span className="radio__label">Дополнительное</span></label>
                </div>
                <label htmlFor="edFacility">ОБРАЗОВАТЕЛЬНАЯ ОРГАНИЗАЦИЯ*</label>
                <input type="text" name="edFacility" id="edFacility" defaultValue={facility} placeholder='Введите...'/>
                <label htmlFor="faculty">ФАКУЛЬТЕТ*</label>
                <input type="text" name="faculty" id="faculty" defaultValue={faculty} placeholder='Введите...'/>
                <label htmlFor="mastery">МАСТЕР</label>
                <input type="text" name="mastery" id="mastery" defaultValue={mastery} placeholder='Введите...'/>
                <label htmlFor="enYear">ГОД ПОСТУПЛЕНИЯ</label>
                <input type="number" name="enYear" id="enYear" defaultValue={enrollment} placeholder='Введите...'/>
                <label htmlFor="gradYear">ГОД ВЫПУСКА</label>
                <input type="number" name="gradYear" id="gradYear" defaultValue={grad} placeholder='Введите...'/>
                <button>Save changes</button>
            </div>
            <div className="tab-content" style={{display:  (active===2) ? 'flex' : 'none' }}>
                <h1>Projects</h1>
                <label htmlFor="prName">Name</label>
                <input type="text" name="prName" id="prName" />
                <label htmlFor="prDesc">Description</label>
                <textarea name="prDesc" id="prDesc"></textarea>
                <label htmlFor="prRole">Your role</label>
                <input type="text" name="prRole" id="prRole" />
                <label htmlFor="prLink">Project link</label>
                <input type="text" name="prLink" id="prLink" />
                <label htmlFor="prYear">Year</label>
                <input type="number" name="prYear" id="prYear" />
                <button>Save changes</button>
            </div>
        </div>
        </>
    )
}