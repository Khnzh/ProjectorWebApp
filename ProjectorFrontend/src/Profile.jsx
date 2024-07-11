import './Profile.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import supabase from './config/supabaseClient';
import Multiselect from './MultiselectSpecialty';
import MultiselectLang from './MultiselectLanguage';
import { profileValidation, portfolioValidation, educationValidation } from './Validation';

export default function Profile(){
//FETCHING PARAMS
    const [errors, setErrors] = useState({});
    const { emode } = useParams();
    const [eduCells, setEduCells] = useState(0);
    const [projectCells, setProjectCells] = useState(0);
    const [selectedPeople, setSelectedPeople] = useState([])
    const [selectedLanguage, setSelectedLanguage] = useState([])

    const incrementEduCells = () => {if (eduCells<2) setEduCells(e=>e+1)}
    const decrementEduCells = () => {if (eduCells>0) setEduCells(e=>e-1)}
    const incrementProjectCells = () => {if (projectCells<4) setProjectCells(e=>e+1)}
    const decrementProjectCells = () => {if (projectCells>0) setProjectCells(e=>e-1)}

    
// localStorage and state variables
    const localKey = "sb-rotyixpntplxytekbeuz-auth-token";
    const [uId, setUId] = useState(null);
    const [email, setEmail] = useState(null);
    const [mode, setMode] = useState(true)
    const [filledPr, setFilledPr] = useState(false)
    const [filledEdu, setFilledEdu] = useState(false)


// PROFILE VARIABLES
    const [profile, setProfile] = useState({
        name: '',
        lastName: '',
        bio: '',
        langs: [],
        phNumber: '',
        socials: '',
        specialties: [],
        tg: '',
    })
    

// PROFILE INPUT DATA FETCHING
const inputName = (e)=>setProfile((prev)=>{ 
    const {value} = e.target;
    return {...prev, name:value.trim()}})
const inputLastName = (e)=>setProfile((prev)=>{ 
    const {value} = e.target;
    return {...prev, lastName:value.trim()}})
const inputBio = (e)=>setProfile((prev)=>{ 
    const {value} = e.target;
    return {...prev, bio:value.trim()}})
const inputPhNumber = (e)=>setProfile((prev)=>{ 
    const {value} = e.target;
    return {...prev, phNumber:value.trim()}})
const inputSocials = (e)=>setProfile((prev)=>{ 
    const {value} = e.target;
    return {...prev, socials:value.trim()}})
const inputTg = (e)=>setProfile((prev)=>{ 
    const {value} = e.target;
    return {...prev, tg:value.trim()}})
    

// PORTFOLIO FIELD VARIABLES
    const [project, setProject] = useState({
        name: ['', '', '', '', '',],
        desc: ['', '', '', '', '',],
        role: ['', '', '', '', '',],
        link: ['', '', '', '', '',],
        year: ['', '', '', '', '',],
    }) 
    
    
// PORTFOLIO INPUT DATA FETCHING
    const inputPrName = (index, event) => {
        const { value } = event.target;
        setProject((p) =>{
            const updated = p.name.map((name, i) => (i === index ? value.trim() : name));
            return {...p, name: updated}
        });
    };
    
    const inputPrDesc = (index, event) => {
        const { value } = event.target;
        setProject((p) =>{
            const updated = p.desc.map((name, i) => (i === index ? value.trim() : name));
            return {...p, desc: updated}
        });
    };

    const inputPrRole = (index, event) => {
        const { value } = event.target;
        setProject((p) =>{
            const updated = p.role.map((name, i) => (i === index ? value.trim() : name));
            return {...p, role: updated}
        });
    };
        
    const inputPrLink = (index, event) => {
        const { value } = event.target;
        setProject((p) =>{
            const updated = p.link.map((name, i) => (i === index ? value.trim() : name));
            return {...p, link: updated}
        });
    };

    const inputPrYear = (index, event) => {
        const { value } = event.target;
        setProject((p) =>{
            const updated = p.year.map((name, i) => (i === index ? value.trim() : name));
            return {...p, year: updated}
        });
    };


// EDUCATION FIELD VARIABLES
    const [education, setEducation] = useState({
        mastery: ['', '', ''],
        eduType: ['', '', ''],
        enrollment: ['', '', ''],
        facility: ['', '', ''],
        faculty: ['', '', ''],
        grad: ['', '', ''],
    }) 

// EDUCATION INPUT DATA FETCHING
    const inputMastery = (index, event) => {
        const { value } = event.target;
        setEducation((e) =>{
            const updated = e.mastery.map((name, i) => (i === index ? value.trim() : name));
            return {...e, mastery: updated}
        });
    };

    const inputEduType = (index, event) => {
        const { value } = event.target;
        setEducation((e) =>{
            const updated = e.eduType.map((name, i) => (i === index ? value : name));
            return {...e, eduType: updated}
        });
    };

    const inputEnrollment = (index, event) => {
        const { value } = event.target;
        setEducation((e) =>{
            const updated = e.enrollment.map((name, i) => (i === index ? value.trim() : name));
            return {...e, enrollment: updated}
        });
    };

    const inputFacility = (index, event) => {
        const { value } = event.target;
        setEducation((e) =>{
            const updated = e.facility.map((name, i) => (i === index ? value.trim() : name));
            return {...e, facility: updated}
        });
    };

    const inputFaculty = (index, event) => {
        const { value } = event.target;
        setEducation((e) =>{
            const updated = e.faculty.map((name, i) => (i === index ? value.trim() : name));
            return {...e, faculty: updated}
        });
    };

    const inputGrad = (index, event) => {
        const { value } = event.target;
        setEducation((e) =>{
            const updated = e.grad.map((name, i) => (i === index ? value.trim() : name));
            return {...e, grad: updated}
        });
    };

const validateProfile = () => {setErrors((e)=> {return educationValidation(education, eduCells)});
}

// TEST OUTPUTS
    // useEffect(()=>{console.log(project)}, [project])
    // useEffect(()=>{console.log(education)}, [education])
    // useEffect(()=>{console.log(errors)}, [errors])

    useEffect(()=>{if (emode!=='0') setMode(false);}, [emode])
    // useEffect(()=>{console.log(profile)}, [profile])
   
    useEffect(()=>{
    if (profile.name && profile.lastName && profile.email && profile.bio && profile.langs && profile.phNumber && profile.tg && profile.socials){
        setFilledPr(true)
    } else {
        setFilledPr(false)
    }
   },[profile.name, profile.lastName, profile.email, profile.bio, profile.langs, profile.phNumber, profile.tg, profile.socials])

   useEffect(()=>{
    if (education.eduType && education.facility && education.faculty && education.mastery && education.enrollment && education.grad){
        setFilledEdu(true)
    } else {
        setFilledEdu(false)
    }
   },[education.eduType, education.facility, education.faculty, education.mastery, education.enrollment, education.grad])

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
            // console.log(Profile[0])
            setProfile((p) => {return {...p, name: Profile[0].name}})
            setProfile((p) => {return {...p, lastName: Profile[0].lastName}})
            setProfile((p) => {return {...p, bio: Profile[0].bio}})
            setProfile((p) => {return {...p, langs: Profile[0].languages}})
            setProfile((p) => {return {...p, phNumber: Profile[0].phoneNumber}})
            setProfile((p) => {return {...p, socials: Profile[0].socials}})
            setProfile((p) => {return {...p, tg: Profile[0].telegram}})
        };
        if (uId && email) fetchGifts();
}
, [uId])

// const testPortfolio = async () => {
//     const { data, error } = await supabase
//     .from('Portfolio')
//     .insert([
//       { name: name ,
//       user_id: uId,
//       year: name,
//       role: name },
//     ])
//     .select()

//     // let { data: Portfolio, error } = await supabase
//     //         .from('Portfolio')
//     //         .select("*")
//     //         // Filters
//     //         .eq('user_id', uId)
    
//   if (error){
//   console.log(error)} else {
//     console.log(data)
//   }
// }

// const testEducation = async () => {
//     // const { data, error } = await supabase
//     // .from('Education')
//     // .insert([
//     //   { edu_type: 'additional' ,
//     //   user_id: uId,
//     //   facility: 'additional',
//     //   faculty: 'additional',
//     //   enrollment: 'additional',
//     //   graduation: 'additional'},
//     // ])
//     // .select()

//     let { data: Education, error } = await supabase
//             .from('Education')
//             .select("*")
//             // Filters
//             .eq('user_id', uId)

//   if (error){
//   console.log(error)} else {
//     console.log(Education)
//   }
// }

function hasOnlyEmptyStrings(obj) {
    return Object.values(obj).every(value => {
        if (typeof value === 'string' && value === '') {
            return true;
        } else if (Array.isArray(value) && value.every(item => item === '')) {
            return true;
        }
        return false;
    });
}

const [active, setActive] = useState(1)
const changeActive = (n) => {
    let errs;
    switch(active) {
        case 1:
            errs = profileValidation(profile)
            break;
        case 2:
            errs = portfolioValidation(project, projectCells)
            break;
        case 3:
            errs = educationValidation(education, eduCells)
            break;
      }
      setErrors(errs);
      if (hasOnlyEmptyStrings(errs)) setActive((a)=>n); 
}

    return(
        <>
        <div className="tab-container blurred_bg">
            <div className="tab-positioning">
                <div onClick={()=>changeActive(1)} className={active===1 ?"tab-toggle active-tab" : "tab-toggle"}><p>О себе</p></div>
                <div onClick={()=>changeActive(2)} className={active===2 ?"tab-toggle active-tab" : "tab-toggle"}><p>Портфолио</p></div>
                <div onClick={()=>changeActive(3)} className={active===3 ?"tab-toggle active-tab" : "tab-toggle"}><p>Образование</p></div>
            </div>

{/* PROFILE */}
            <div className="tab-content" style={{display:  (active===1) ? 'flex' : 'none' }}>
                <h1>Расскажите о себе</h1>
                <label htmlFor="name">ИМЯ*</label>
                <input onChange={(e) => inputName(e)} disabled={mode} type="text" name="name" id="name" defaultValue={profile.name} placeholder='Введите...'/>
                {errors.name && (<p className="validation-message">{errors.name}</p>)}
                <label htmlFor="lastName" >ФАМИЛИЯ*</label>
                <input onChange={(e) => inputLastName(e)} disabled={mode} type="text" name="lastName" id="lastName" defaultValue={profile.lastName} placeholder='Введите...'/>
                {errors.lastName && (<p className="validation-message">{errors.lastName}</p>)}
                <label htmlFor="email">ПОЧТА*</label>
                <input disabled={mode} type="email" name="email" id="email" defaultValue={email} placeholder='Введите...'/>
                <label htmlFor="bio">НЕСКОЛЬКО СЛОВ О ВАС</label>
                <textarea onChange={(e) => inputBio(e)} disabled={mode} name="description" id="bio" defaultValue={profile.bio}></textarea>
                {errors.bio && (<p className="validation-message">{errors.bio}</p>)}
                <p>Выберите специалность*</p>
                <Multiselect profile={profile} setProfile={setProfile} />
                {errors.specialties && (<p className="validation-message">{errors.specialties}</p>)}
                <p>ЯЗЫКИ</p>
                <MultiselectLang profile={profile} setProfile={setProfile} />
                {errors.langs && (<p className="validation-message">{errors.langs}</p>)}
                <label htmlFor="mobile">ТЕЛЕФОН</label>
                <input onChange={(e) => inputPhNumber(e)} disabled={mode} type="text" name="mobile" id="mobile" defaultValue={profile.phNumber} placeholder='Введите...'/>
                {errors.phNumber && (<p className="validation-message">{errors.phNumber}</p>)}
                <label htmlFor="tgLink">ТЕЛЕГРАМ</label>
                <input onChange={(e) => inputTg(e)} disabled={mode} type="text" name="tgLink" id="tgLink" defaultValue={profile.tg} placeholder='Введите...'/>
                {errors.tg && (<p className="validation-message">{errors.tg}</p>)}
                <label htmlFor="socialMedia">ССЫЛКИ НА ДРУГИЕ СОЦИАЛЬНЫЕ СЕТИ</label>
                <input onChange={(e) => inputSocials(e)} disabled={mode} type="text" name="socialMedia" id="socialMedia" defaultValue={profile.socials} placeholder='Введите...'/>
                {errors.socials && (<p className="validation-message">{errors.socials}</p>)}
            </div>

{/* EDUCATION */}
            <div className="tab-content" style={{display:  (active===3) ? 'flex' : 'none' }}>
                <h1>Добавьте ваше образование</h1>
                <p>ВИД ОБРАЗОВАНИЯ*</p>
                <div className="signup__radio__cnt no-underline">
                    <input onClick={(e) => inputEduType(0,e)} disabled={mode} type="radio" id="general" name="eduType" value="general" />
                    <label htmlFor="general"><svg className="sign__svg" viewBox="0 0 40 38" >
                        <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                            c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                        <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                        </svg><span className="radio__label">Основное</span></label>
                <input onClick={(e) => inputEduType(0,e)} disabled={mode} type="radio" id="additional" name="eduType" value="additional" />
                    <label htmlFor="additional"><svg className="sign__svg" viewBox="0 0 40 38" >
                        <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                            c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                        <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                        </svg><span className="radio__label">Дополнительное</span></label>
                </div>
                {Array.isArray(errors.eduType) && errors.eduType[0] && (<p className="validation-message">{errors.eduType[0]}</p>)}
                <label htmlFor="edFacility">ОБРАЗОВАТЕЛЬНАЯ ОРГАНИЗАЦИЯ*</label>
                <input onChange={(e) => inputFacility(0,e)} disabled={mode} type="text" name="edFacility" id="edFacility" defaultValue={education.facility[0]} placeholder='Введите...'/>
                {Array.isArray(errors.facility) && errors.facility[0] && (<p className="validation-message">{errors.facility[0]}</p>)}
                <label htmlFor="faculty">ФАКУЛЬТЕТ*</label>
                <input onChange={(e) => inputFaculty(0,e)} disabled={mode} type="text" name="faculty" id="faculty" defaultValue={education.faculty[0]} placeholder='Введите...'/>
                {Array.isArray(errors.faculty) && errors.faculty[0] && (<p className="validation-message">{errors.faculty[0]}</p>)}
                <label htmlFor="mastery">МАСТЕР</label>
                <input onChange={(e) => inputMastery(0,e)} disabled={mode} type="text" name="mastery" id="mastery" defaultValue={education.mastery[0]} placeholder='Введите...'/>
                {Array.isArray(errors.mastery) && errors.mastery[0] && (<p className="validation-message">{errors.mastery[0]}</p>)}
                <label htmlFor="enYear">ГОД ПОСТУПЛЕНИЯ*</label>
                <input onChange={(e) => inputEnrollment(0,e)} disabled={mode} type="number" name="enYear" id="enYear" defaultValue={education.enrollment[0]} placeholder='Введите...'/>
                {Array.isArray(errors.enrollment) && errors.enrollment[0] && (<p className="validation-message">{errors.enrollment[0]}</p>)}
                <label htmlFor="gradYear">ГОД ВЫПУСКА*</label>
                <input onChange={(e) => inputGrad(0,e)} disabled={mode} type="number" name="gradYear" id="gradYear" defaultValue={education.grad[0]} placeholder='Введите...'/>
                {Array.isArray(errors.grad) && errors.grad[0] && (<p className="validation-message">{errors.grad[0]}</p>)}

                
                <div className="additional_edu" style={{display:  (eduCells>0) ? 'flex' : 'none' }}>
                    <hr></hr>
                    <div className='edu_header'>
                        <p>ВИД ОБРАЗОВАНИЯ*</p>
                        <button onClick={decrementEduCells} className="cross"></button>
                    </div>
                    <div className="signup__radio__cnt no-underline">
                        <input onClick={(e) => inputEduType(1,e)} disabled={mode} type="radio" id="1general" name="1eduType" value="general"/>
                        <label htmlFor="1general"><svg className="sign__svg" viewBox="0 0 40 38" >
                            <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                                c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                            <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                            </svg><span className="radio__label">Основное</span></label>
                    <input onClick={(e) => inputEduType(1,e)} disabled={mode} type="radio" id="1additional" name="1eduType" value="additional"/>
                        <label htmlFor="1additional"><svg className="sign__svg" viewBox="0 0 40 38" >
                            <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                                c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                            <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                            </svg><span className="radio__label">Дополнительное</span></label>
                    </div>
                    {Array.isArray(errors.eduType) && errors.eduType[1] && (<p className="validation-message">{errors.eduType[1]}</p>)}
                    <label htmlFor="edFacility">ОБРАЗОВАТЕЛЬНАЯ ОРГАНИЗАЦИЯ*</label>
                    <input onChange={(e) => inputFacility(1,e)} disabled={mode} type="text" name="edFacility" id="1edFacility" defaultValue={education.facility[1]} placeholder='Введите...'/>
                    {Array.isArray(errors.facility) && errors.facility[1] && (<p className="validation-message">{errors.facility[1]}</p>)}
                    <label htmlFor="faculty">ФАКУЛЬТЕТ*</label>
                    <input onChange={(e) => inputFaculty(1,e)} disabled={mode} type="text" name="faculty" id="1faculty" defaultValue={education.faculty[1]} placeholder='Введите...'/>
                    {Array.isArray(errors.faculty) && errors.faculty[1] && (<p className="validation-message">{errors.faculty[1]}</p>)}
                    <label htmlFor="mastery">МАСТЕР</label>
                    <input onChange={(e) => inputMastery(1,e)} disabled={mode} type="text" name="mastery" id="1mastery" defaultValue={education.mastery[1]} placeholder='Введите...'/>
                    {Array.isArray(errors.mastery) && errors.mastery[1] && (<p className="validation-message">{errors.mastery[1]}</p>)}
                    <label htmlFor="enYear">ГОД ПОСТУПЛЕНИЯ*</label>
                    <input onChange={(e) => inputEnrollment(1,e)} disabled={mode} type="number" name="enYear" id="1enYear" defaultValue={education.enrollment[1]} placeholder='Введите...'/>
                    {Array.isArray(errors.enrollment) && errors.enrollment[1] && (<p className="validation-message">{errors.enrollment[1]}</p>)}
                    <label htmlFor="gradYear">ГОД ВЫПУСКА*</label>
                    <input onChange={(e) => inputGrad(1,e)} disabled={mode} type="number" name="gradYear" id="1gradYear" defaultValue={education.grad[1]} placeholder='Введите...'/>
                    {Array.isArray(errors.grad) && errors.grad[1] && (<p className="validation-message">{errors.grad[1]}</p>)}
                </div>
                <div className="additional_edu" style={{display:  (eduCells>1) ? 'flex' : 'none' }}>
                    <hr></hr>
                    <div className='edu_header'>
                        <p>ВИД ОБРАЗОВАНИЯ*</p>
                        <button onClick={decrementEduCells} className="cross"></button>
                    </div>
                    <div className="signup__radio__cnt no-underline">
                        <input onClick={(e) => inputEduType(2,e)} disabled={mode} type="radio" id="2general" name="2eduType" value="general" defaultChecked={new Boolean(education.eduType[2] == 'general')}/>
                        <label htmlFor="2general"><svg className="sign__svg" viewBox="0 0 40 38" >
                            <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                                c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                            <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                            </svg><span className="radio__label">Основное</span></label>
                    <input onClick={(e) => inputEduType(2,e)} disabled={mode} type="radio" id="2additional" name="2eduType" value="additional" defaultChecked={new Boolean(education.eduType[2] == 'additional')}/>
                        <label htmlFor="2additional"><svg className="sign__svg" viewBox="0 0 40 38" >
                            <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                                c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                            <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                            </svg><span className="radio__label">Дополнительное</span></label>
                    </div>
                    {Array.isArray(errors.eduType) && errors.eduType[2] && (<p className="validation-message">{errors.eduType[2]}</p>)}
                    <label htmlFor="edFacility">ОБРАЗОВАТЕЛЬНАЯ ОРГАНИЗАЦИЯ*</label>
                    <input onChange={(e) => inputFacility(2,e)} disabled={mode} type="text" name="edFacility" id="2edFacility" defaultValue={education.facility[2]} placeholder='Введите...'/>
                    {Array.isArray(errors.facility) && errors.facility[2] && (<p className="validation-message">{errors.facility[2]}</p>)}
                    <label htmlFor="faculty">ФАКУЛЬТЕТ*</label>
                    <input onChange={(e) => inputFaculty(2,e)} disabled={mode} type="text" name="faculty" id="2faculty" defaultValue={education.faculty[2]} placeholder='Введите...'/>
                    {Array.isArray(errors.faculty) && errors.faculty[2] && (<p className="validation-message">{errors.faculty[2]}</p>)}
                    <label htmlFor="mastery">МАСТЕР</label>
                    <input onChange={(e) => inputMastery(2,e)} disabled={mode} type="text" name="mastery" id="2mastery" defaultValue={education.mastery[2]} placeholder='Введите...'/>
                    {Array.isArray(errors.mastery) && errors.mastery[2] && (<p className="validation-message">{errors.mastery[2]}</p>)}
                    <label htmlFor="enYear">ГОД ПОСТУПЛЕНИЯ*</label>
                    <input onChange={(e) => inputEnrollment(2,e)} disabled={mode} type="number" name="enYear" id="2enYear" defaultValue={education.enrollment[2]} placeholder='Введите...'/>
                    {Array.isArray(errors.enrollment) && errors.enrollment[2] && (<p className="validation-message">{errors.enrollment[2]}</p>)}
                    <label htmlFor="gradYear">ГОД ВЫПУСКА*</label>
                    <input onChange={(e) => inputGrad(2,e)} disabled={mode} type="number" name="gradYear" id="2gradYear" defaultValue={education.grad[2]} placeholder='Введите...'/>
                    {Array.isArray(errors.grad) && errors.grad[2] && (<p className="validation-message">{errors.grad[2]}</p>)}
                </div>
                <p className="add" onClick={incrementEduCells}>Добавить</p>
            </div>

{/* PORTFOLIO */}
            <div className="tab-content" style={{display:  (active===2) ? 'flex' : 'none' }}>
                <h1>Projects</h1>
                <label htmlFor="prName">Name*</label>
                <input onChange={(e)=>inputPrName(0, e)} disabled={mode} type="text" name="prName" id="prName" />
                {Array.isArray(errors.prName) && errors.prName[0] && (<p className="validation-message">{errors.prName[0]}</p>)}
                <label htmlFor="prDesc">Description</label>
                <textarea onChange={(e) => inputPrDesc(0, e)} disabled={mode} name="prDesc" id="prDesc"></textarea>
                {Array.isArray(errors.desc) && errors.desc[0] && (<p className="validation-message">{errors.desc[0]}</p>)}
                <label htmlFor="prRole">Your role*</label>
                <input onChange={(e) => inputPrRole(0, e)} disabled={mode} type="text" name="prRole" id="prRole" />
                {Array.isArray(errors.role) && errors.role[0] && (<p className="validation-message">{errors.role[0]}</p>)}
                <label htmlFor="prLink">Project link</label>
                <input onChange={(e) => inputPrLink(0, e)} disabled={mode} type="text" name="prLink" id="prLink" />
                {Array.isArray(errors.link) && errors.link[0] && (<p className="validation-message">{errors.link[0]}</p>)}
                <label htmlFor="prYear">Year*</label>
                <input onChange={(e) => inputPrYear(0, e)} disabled={mode} type="number" name="prYear" id="prYear" />
                {Array.isArray(errors.year) && errors.year[0] && (<p className="validation-message">{errors.year[0]}</p>)}


                <div className="additional_edu" style={{display:  (projectCells>0) ? 'flex' : 'none' }} >
                    <hr />
                    <div className='edu_header'>
                        <label htmlFor="prName">Name*</label>
                        <button onClick={decrementProjectCells} className="cross"></button>
                    </div>
                    <input onChange={(e)=>inputPrName(1, e)} disabled={mode} type="text" name="prName" id="1prName" />
                    {Array.isArray(errors.prName) && errors.prName[1] && (<p className="validation-message">{errors.prName[1]}</p>)}
                    <label htmlFor="prDesc">Description</label>
                    <textarea onChange={(e) => inputPrDesc(1, e)} disabled={mode} name="prDesc" id="1prDesc"></textarea>
                    {Array.isArray(errors.desc) && errors.desc[1] && (<p className="validation-message">{errors.desc[1]}</p>)}
                    <label htmlFor="prRole">Your role*</label>
                    <input onChange={(e) => inputPrRole(1, e)} disabled={mode} type="text" name="prRole" id="1prRole" />
                    {Array.isArray(errors.role) && errors.role[1] && (<p className="validation-message">{errors.role[1]}</p>)}
                    <label htmlFor="prLink">Project link</label>
                    <input onChange={(e) => inputPrLink(1, e)} disabled={mode} type="text" name="prLink" id="1prLink" />
                    {Array.isArray(errors.link) && errors.link[1] && (<p className="validation-message">{errors.link[1]}</p>)}
                    <label htmlFor="prYear">Year*</label>
                    <input onChange={(e) => inputPrYear(1, e)} disabled={mode} type="number" name="prYear" id="1prYear" />
                    {Array.isArray(errors.year) && errors.year[1] && (<p className="validation-message">{errors.year[1]}</p>)}
                </div>


                <div className="additional_edu" style={{display:  (projectCells>1) ? 'flex' : 'none' }}>
                    <hr />
                    <div className='edu_header'>
                        <label htmlFor="prName">Name*</label>
                        <button onClick={decrementProjectCells} className="cross"></button>
                    </div>
                    <input onChange={(e)=>inputPrName(2, e)} disabled={mode} type="text" name="prName" id="2prName" />
                    {Array.isArray(errors.prName) && errors.prName[2] && (<p className="validation-message">{errors.prName[2]}</p>)}
                    <label htmlFor="prDesc">Description</label>
                    <textarea onChange={(e) => inputPrDesc(2, e)} disabled={mode} name="prDesc" id="2prDesc"></textarea>
                    {Array.isArray(errors.desc) && errors.desc[2] && (<p className="validation-message">{errors.desc[2]}</p>)}
                    <label htmlFor="prRole">Your role*</label>
                    <input onChange={(e) => inputPrRole(2, e)} disabled={mode} type="text" name="prRole" id="2prRole" />
                    {Array.isArray(errors.role) && errors.role[2] && (<p className="validation-message">{errors.role[2]}</p>)}
                    <label htmlFor="prLink">Project link</label>
                    <input onChange={(e) => inputPrLink(2, e)} disabled={mode} type="text" name="prLink" id="2prLink" />
                    {Array.isArray(errors.link) && errors.link[2] && (<p className="validation-message">{errors.link[2]}</p>)}
                    <label htmlFor="prYear">Year*</label>
                    <input onChange={(e) => inputPrYear(2, e)} disabled={mode} type="number" name="prYear" id="2prYear" />
                    {Array.isArray(errors.year) && errors.year[2] && (<p className="validation-message">{errors.year[2]}</p>)}
                </div>


                <div className="additional_edu" style={{display:  (projectCells>2) ? 'flex' : 'none' }}>
                    <hr />
                    <div className='edu_header'>
                        <label htmlFor="prName">Name*</label>
                        <button onClick={decrementProjectCells} className="cross"></button>
                    </div>
                    <input onChange={(e)=>inputPrName(3, e)} disabled={mode} type="text" name="prName" id="3prName" />
                    {Array.isArray(errors.prName) && errors.prName[3] && (<p className="validation-message">{errors.prName[3]}</p>)}
                    <label htmlFor="prDesc">Description</label>
                    <textarea onChange={(e) => inputPrDesc(3, e)} disabled={mode} name="prDesc" id="3prDesc"></textarea>
                    {Array.isArray(errors.desc) && errors.desc[3] && (<p className="validation-message">{errors.desc[3]}</p>)}
                    <label htmlFor="prRole">Your role*</label>
                    <input onChange={(e) => inputPrRole(3, e)} disabled={mode} type="text" name="prRole" id="3prRole" />
                    {Array.isArray(errors.role) && errors.role[3] && (<p className="validation-message">{errors.role[3]}</p>)}
                    <label htmlFor="prLink">Project link</label>
                    <input onChange={(e) => inputPrLink(3, e)} disabled={mode} type="text" name="prLink" id="3prLink" />
                    {Array.isArray(errors.link) && errors.link[3] && (<p className="validation-message">{errors.link[3]}</p>)}
                    <label htmlFor="prYear">Year*</label>
                    <input onChange={(e) => inputPrYear(3, e)} disabled={mode} type="number" name="prYear" id="3prYear" />
                    {Array.isArray(errors.year) && errors.year[3] && (<p className="validation-message">{errors.year[3]}</p>)}
                </div>


                <div className="additional_edu" style={{display:  (projectCells>3) ? 'flex' : 'none' }}>
                    <hr />
                    <div className='edu_header'>
                        <label htmlFor="prName">Name*</label>
                        <button onClick={decrementProjectCells} className="cross"></button>
                    </div>
                    <input onChange={(e)=>inputPrName(4, e)} disabled={mode} type="text" name="prName" id="4prName" />
                    {Array.isArray(errors.prName) && errors.prName[4] && (<p className="validation-message">{errors.prName[4]}</p>)}
                    <label htmlFor="prDesc">Description</label>
                    <textarea onChange={(e) => inputPrDesc(4, e)} disabled={mode} name="prDesc" id="4prDesc"></textarea>
                    {Array.isArray(errors.desc) && errors.desc[4] && (<p className="validation-message">{errors.desc[4]}</p>)}
                    <label htmlFor="prRole">Your role*</label>
                    <input onChange={(e) => inputPrRole(4, e)} disabled={mode} type="text" name="prRole" id="4prRole" />
                    {Array.isArray(errors.role) && errors.role[4] && (<p className="validation-message">{errors.role[4]}</p>)}
                    <label htmlFor="prLink">Project link</label>
                    <input onChange={(e) => inputPrLink(4, e)} disabled={mode} type="text" name="prLink" id="4prLink" />
                    {Array.isArray(errors.link) && errors.link[4] && (<p className="validation-message">{errors.link[4]}</p>)}
                    <label htmlFor="prYear">Year*</label>
                    <input onChange={(e) => inputPrYear(4, e)} disabled={mode} type="number" name="prYear" id="4prYear" />
                    {Array.isArray(errors.year) && errors.year[4] && (<p className="validation-message">{errors.year[4]}</p>)}
                </div>
                <p className="add" onClick={incrementProjectCells}>Добавить</p>

            </div>


            <button className="svg-border-button">
        </button>
            {/* <button onClick={testEducation} className="change-button">
            
        </button> */}
        </div>
        </>
    )
}