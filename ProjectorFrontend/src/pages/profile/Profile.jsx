import styles from './Profile.module.scss'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import Multiselect from '../../components/multiselect/specialtySelect/MultiselectSpecialty';
import MultiselectLang from '../../components/multiselect/languageSelect/MultiselectLanguage';
import { profileValidation, portfolioValidation, educationValidation, hasOnlySpecificStrings } from '../../utilityFunctions/Validation';    
import ImageInput from '../../components/profilePictureUpload/ImageInput';

export default function Profile(){
    const navigate = useNavigate();
    //FETCHING PARAMS
    const [errors, setErrors] = useState({});
    const { emode } = useParams();
    const [eduCells, setEduCells] = useState(0);
    const [projectCells, setProjectCells] = useState(0);
    const [activeEdu, setActiveEdu] = useState(0);
    const [activeProjects, setActiveProjects] = useState(0);
    const [selectedPeople, setSelectedPeople] = useState([])
    const [selectedLanguage, setSelectedLanguage] = useState([])
    
    const incrementEduCells = () => {if (eduCells<2) setEduCells(e=>e+1)}
    const decrementEduCells = () => {if (eduCells>0) setEduCells(e=>e-1)}
    const incrementProjectCells = () => {if (projectCells<4) setProjectCells(e=>e+1)}
    const decrementProjectCells = () => {if (projectCells>0) setProjectCells(e=>e-1)}
    
// TEST OUTPUTS
    // useEffect(()=>{console.log(project)}, [project])
    // useEffect(()=>{console.log(education)}, [education])
    // useEffect(()=>{console.log(profile)}, [profile])

// SETTING MODE FROM URL 0 = VIEW, 1 = EDIT AND UPDATE
    useEffect(()=>{if (emode!=='0') setMode(false);}, [emode])
    
    
// localStorage and state variables
    const localKey = "sb-rotyixpntplxytekbeuz-auth-token";
    const [uId, setUId] = useState(null);
    const [email, setEmail] = useState(null);
    const [mode, setMode] = useState(true)
    const [profilePic, setProfilePic] = useState()
    

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
        id: ['', '', '', '', '',]
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
        id: ['','','']
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


// FETCHING PORTFOLIO INFORMATION FROM DATABASE

    const fetchPortfolio = async(uId) => {
        let { data: Portfolio, error } = await supabase
        .from('Portfolio')
        .select("*")
        // Filters
        .eq('user_id', uId)

        if (error) { console.log(error) } else {
            setActiveProjects(Portfolio.length)
            if(Portfolio.length>0) setProjectCells((p) => Portfolio.length-1)
            for (let i=0; i < Portfolio.length; i++){
                for (const key in Portfolio[i]){
                    if (key!='user_id'){
                        setProject((p) =>{
                            const updated = p[key].map((name, index) => (index === i ? Portfolio[i][key] : name));
                            let obj = {...p};
                            obj[key] = updated;
                            return obj
                        });
                    }
                }
            }
        }
    };

// FETCHING EDUCATION INFORMATION FROM DATABASE


    const fetchEducation = async(uId) => {
        let { data: Education, error } = await supabase
        .from('Education')
        .select("*")
        // Filters
        .eq('user_id', uId)

        if (error) { console.log(error) } else {
            setActiveEdu(Education.length)
            if(Education.length>0) setEduCells((p) => Education.length-1)
            for (let i=0; i < Education.length; i++){
                for (const key in Education[i]){
                    if (key!='user_id'){
                        setEducation((p) =>{
                            const updated = p[key].map((name, index) => (index === i ? Education[i][key] : name));
                            let obj = {...p};
                            obj[key] = updated;
                            return obj
                        });
                    }
                }
            }
        }
    };

// FETCHING PROFILE INFORMATION FROM DATABASE


    useEffect(() =>
    { 
        const info = JSON.parse(localStorage.getItem(localKey));
        setUId((u) => info.user.id);
        setEmail((e) => info.user.email);

        const fetchProfile = async() => {
            let { data: Profile, error } = await supabase
            .from('Profile')
            .select("*")
            // Filters
            .eq('user_id', uId)
            setProfile((p) => {return {...p, name: Profile[0].name}})
            setProfile((p) => {return {...p, lastName: Profile[0].lastName}})
            setProfile((p) => {return {...p, bio: Profile[0].bio}})
            setProfile((p) => {return {...p, phNumber: Profile[0].phoneNumber}})
            setProfile((p) => {return {...p, socials: Profile[0].socials}})
            setProfile((p) => {return {...p, tg: Profile[0].telegram}})
        };

        const fetchLangs = async () =>{
            const { data, error } = await supabase
            .from('user_languages')
            .select('language_id(*)')
            .eq('user_id', uId)
            if (error) {console.log(error)} else
            {
                const langsData = data.map((item) => item.language_id)
                setProfile((p) => {return {...p, langs: langsData}})
            };
        }

        const fetchSpecs = async () => {
            const { data, error } = await supabase
            .from('user_qualifications')
            .select('qualification_id(*)')
            .eq('user_id', uId)
            if (error) {console.log(error)} else
            {
                const specsData = data.map((item) => item.qualification_id)
                setProfile((p) => {return {...p, specialties: specsData}})
            };
        }

        if (uId && email){
            fetchProfile();
            fetchLangs();
            fetchSpecs();
            fetchPortfolio(uId);
            fetchEducation(uId);
        }
    }
    , [uId])

// UPDATING AND EDITING PROFILE


    const updateProfile = async () => {

        const { data, error } = await supabase
        .from('Profile')
        .update([
            {
            name: profile.name,
            lastName: profile.lastName,
            bio: profile.bio,
            phoneNumber: profile.phNumber,
            telegram: profile.tg,
            socials: profile.socials
            }
        ])
        .eq('user_id', uId)
        .select()
        error ? console.log(error) : console.log(data);


        const multiSelectQuery = (value, specification) =>{
            let list = '['

            for (let o = 0; o < value.length; o++) {
                if (o == value.length-1) {
                    list = list + `{"user_id": "${uId}","${specification}_id": ${value[o].id}}]`
                } else {
                    list = list + `{"user_id": "${uId}","${specification}_id": ${value[o].id}},`
                }
            }
            return list
        }
        
        const langsList = multiSelectQuery(profile.langs, "language")

        const { error:langsErr } = await supabase
        .from('user_languages')
        .delete()
        .eq('user_id', uId)
        .select()
        if (langsErr) console.log(langsErr);
        
        const { error:langsInsErr } = await supabase
        .from('user_languages')
        .insert(JSON.parse(langsList))
        .select()
        if (langsInsErr) console.log(langsInsErr);
        
        const specsList = multiSelectQuery(profile.specialties, "qualification")
        
        const { error:specsErr } = await supabase
        .from('user_qualifications')
        .delete()
        .eq('user_id', uId)
        .select()
        if (specsErr) console.log(specsErr);
        
        const { error:specsInsErr } = await supabase
        .from('user_qualifications')
        .insert(JSON.parse(specsList))
        .select()
        if (specsInsErr) console.log(specsInsErr);
        navigate('/profile/0')
        
    }

    const createQueryFormat = (value, count, base) => {
        let list = [];
        for (let o = base; o <= count; o++){
            let obj = {user_id: uId}
            for (const key in value){
                if (key!='id' && value[key][o]) obj[key] = value[key][o];
            }
            list.push(obj)
        }
        return list;
    }

    const updateQueryFormat = (value, top) => {
        let list = [];
        for (let o = 0; o < top; o++){
            let obj = {user_id: uId}
            for (const key in value){
                if (value[key][o]) obj[key] = value[key][o];
            }
            list.push(obj)
        }
        return list;
    }

// UPDATING AND EDITING PORTFOLIO


    const saveProject = async (value, count, base) =>{
        let updList = updateQueryFormat(value, base)

        for (let i=0; i<updList.length; i++){
            const { data, error } = await supabase
            .from('Portfolio')
            .update(updList[i])
            .eq('id', updList[i].id)
            .select()
            error ? console.log(error) : console.log(data);
        }
        
        let insList = createQueryFormat(value, count, base)
        console.log(insList)

        const { error:specsInsErr } = await supabase
        .from('Portfolio')
        .insert(insList)
        .select()
        if (specsInsErr) {console.log(specsInsErr)}

        fetchPortfolio(uId)
    }

// UPDATING AND EDITING EDUCATION


    const saveEducation = async (value, count, base) =>{
        let updList = updateQueryFormat(value, base)

        for (let i=0; i<updList.length; i++){
            const { data, error } = await supabase
            .from('Education')
            .update(updList[i])
            .eq('id', updList[i].id)
            .select()
            error ? console.log(error) : console.log(data);
        }

        let insList = createQueryFormat(value, count, base)

        const { error:specsInsErr } = await supabase
        .from('Education')
        .insert(insList)
        .select()
        if (specsInsErr) console.log(specsInsErr);

        fetchEducation(uId)
    }

// DELETING EDUCATION OR PORTFOLIO INSTANCE, DEPENDS ON INPUT PARAMETERS


    const deleteRow = async (table, value, index) => {
        const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', value['id'][index])
        .select()
        if (error) console.log(error);

        (table==='Education') ? fetchEducation(uId) : fetchPortfolio(uId)
    }

// SAVES CHANGES AFTER VALIDATING INPUTS


    const saveChanges = () => {
        let errs;
        switch(active) {
            case 1:
                errs = profileValidation(profile)
                if (hasOnlySpecificStrings(errs, '') || !errs) updateProfile()
                break;
            case 2:
                errs = portfolioValidation(project, projectCells)
                if (hasOnlySpecificStrings(errs, '') || !errs) saveProject(project, projectCells, activeProjects)
                break;
            case 3:
                errs = educationValidation(education, eduCells)
                if (hasOnlySpecificStrings(errs, '') || !errs) saveEducation(education, eduCells, activeEdu)
                break;
          }
        setErrors(errs)
    }


// RESPONSIBLE FOR DISPLAYING THE CORRECT TAB

    const [active, setActive] = useState(1)
    const changeActive = (n) => { setActive((a)=>n) }
    

    return(
        <>
        <div className={styles.tab_container}>
            <div className={styles.tab_positioning}>
                <div onClick={() => changeActive(1)} className={active===1 ?styles.active_tab : styles.tab_toggle}><p>О себе</p></div>
                <div onClick={() => changeActive(2)} className={active===2 ?styles.active_tab : styles.tab_toggle}><p>Портфолио</p></div>
                <div onClick={() => changeActive(3)} className={active===3 ?styles.active_tab : styles.tab_toggle}><p>Образование</p></div>
            </div>


{/* PROFILE */}
            <div className={styles.tab_content} style={{display:  (active===1) ? 'flex' : 'none' }}>
                <ImageInput uId={uId} styleName={styles.custom_profile_pic_upload}/> 
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
                <p>Выберите специальность*</p>
                <Multiselect profile={profile} setProfile={setProfile} mode={mode} />
                {errors.specialties && (<p className="validation-message">{errors.specialties}</p>)}
                <p>ЯЗЫКИ</p>
                <MultiselectLang profile={profile} setProfile={setProfile} mode={mode}/>
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
            <div className={styles.tab_content} style={{display:  (active===3) ? 'flex' : 'none' }}>
                <h1>Добавьте ваше образование</h1>

                {/* MAPS THROUGH ALL EDUCATION INSTANCES AND RENDERS THEM */}
                {education.eduType.map((edu, index) =>
                (<div className={styles.additional_edu} style={{display:  ((index==0)) ? 'flex' : ((eduCells>=index) ? 'flex' : 'none') }}>
                    <div className={styles.edu_header}>
                            <p>ВИД ОБРАЗОВАНИЯ*</p>
                            {(index==0)?
                                ((activeEdu>0) && ((mode==0) && <p className={styles.delete_cell} onClick={() => deleteRow('Education', education, 0)}>delete</p>)):
                                ((activeEdu>index) ?
                                    ((mode==0) && <p className="delete-cell" onClick={() => deleteRow('Education', education, index)}>delete</p>):
                                    (<button onClick={decrementEduCells} className={styles.section_deletion}></button>))}
                        </div>
                    <div className={styles.radio_no_underline}>
                        {(edu == 'general')?
                        <input onClick={(e) => inputEduType(index, e)} disabled={mode} type="radio" id={index +"general"} name={index +"eduType"} value="general" defaultChecked/>:
                        <input onClick={(e) => inputEduType(index, e)} disabled={mode} type="radio" id={index +"general"} name={index +"eduType"} value="general"/>}
                        <label htmlFor={index +"general"}><svg className={'radio sign__svg ' + styles.radio__svg} viewBox="0 0 40 38" >
                            <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                                c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                            <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                            </svg><span className={styles.radio__label}>Основное</span></label>
                        {(edu == 'additional')?
                        <input onClick={(e) => inputEduType(index, e)} disabled={mode} type="radio" id={index + "additional"} name={index +"eduType"} value="additional" defaultChecked/>:
                        <input onClick={(e) => inputEduType(index, e)} disabled={mode} type="radio" id={index + "additional"} name={index +"eduType"} value="additional" />}
                        <label htmlFor={index + "additional"}><svg className={'radio sign__svg ' + styles.radio__svg} viewBox="0 0 40 38" >
                            <path className="box" d="M31.7,2.1C23.3,2.3,14.9,3.2,6.4,3.6C3.6,3.8,1.3,6.3,1.5,9.1c2.1,32.2-4.1,26.5,20.9,26.5
                                c4.1,0,16.2,1.1,15.6-2.4c-0.5-3.1-0.7-10.7-1.1-13.8c-0.2-2.3-0.2-8.5-0.8-13.6C36,3.6,34,2,31.7,2.1z"/>
                            <path className="check" d="M6.9,20.2c3.3,3.8,6.4,9.7,8.6,8.9c2.2-0.8,19-9.3,15.2-19.7"/>
                            </svg><span className={styles.radio__label}>Дополнительное</span></label>
                    </div>
                    {Array.isArray(errors.eduType) && errors.eduType[index] && (<p className="validation-message">{errors.eduType[index]}</p>)}
                    <label htmlFor={index + "edFacility"}>ОБРАЗОВАТЕЛЬНАЯ ОРГАНИЗАЦИЯ*</label>
                    <input onChange={(e) => inputFacility(index,e)} disabled={mode} type="text" name="edFacility" id={index +"edFacility"} defaultValue={education.facility[index]} placeholder='Введите...'/>
                    {Array.isArray(errors.facility) && errors.facility[index] && (<p className="validation-message">{errors.facility[index]}</p>)}
                    <label htmlFor={index + "faculty"}>ФАКУЛЬТЕТ*</label>
                    <input onChange={(e) => inputFaculty(index,e)} disabled={mode} type="text" name="faculty" id={index +"faculty"} defaultValue={education.faculty[index]} placeholder='Введите...'/>
                    {Array.isArray(errors.faculty) && errors.faculty[index] && (<p className="validation-message">{errors.faculty[index]}</p>)}
                    <label htmlFor={index + "mastery"}>МАСТЕР</label>
                    <input onChange={(e) => inputMastery(index,e)} disabled={mode} type="text" name="mastery" id={index +"mastery"} defaultValue={education.mastery[index]} placeholder='Введите...'/>
                    {Array.isArray(errors.mastery) && errors.mastery[index] && (<p className="validation-message">{errors.mastery[index]}</p>)}
                    <label htmlFor={index + "enYear"}>ГОД ПОСТУПЛЕНИЯ*</label>
                    <input onChange={(e) => inputEnrollment(index,e)} disabled={mode} type="number" name="enYear" id={index +"enYear"} defaultValue={education.enrollment[index]} placeholder='Введите...'/>
                    {Array.isArray(errors.enrollment) && errors.enrollment[index] && (<p className="validation-message">{errors.enrollment[index]}</p>)}
                    <label htmlFor={index + "gradYear"}>ГОД ВЫПУСКА*</label>
                    <input onChange={(e) => inputGrad(index,e)} disabled={mode} type="number" name="gradYear" id={index +"gradYear"} defaultValue={education.grad[index]} placeholder='Введите...'/>
                    {Array.isArray(errors.grad) && errors.grad[index] && (<p className="validation-message">{errors.grad[index]}</p>)}
                    <hr></hr>
                </div>)
                )}

                {(mode==0) && <p className={styles.add} onClick={incrementEduCells}>Добавить</p>}
            </div>

{/* PORTFOLIO */}
            <div className={styles.tab_content} style={{display:  (active===2) ? 'flex' : 'none' }}>
                <h1>Добавьте ваш проект</h1>

                {/* MAPS THROUGH ALL PROJECT INSTANCES AND RENDERS THEM */}
                {project.name.map((name, index) =>
                (<div className={styles.additional_edu} style={{display:  ((index==0)) ? 'flex' : ((projectCells>=index) ? 'flex' : 'none') }}>
                    <div className={styles.edu_header}>
                        <label htmlFor={index + "prName"}>НАЗВАНИЕ*</label>
                        {(index==0)?
                            ((activeProjects>0) && ((mode==0) && <p className={styles.delete_cell} onClick={() => deleteRow('Portfolio', project, o)}>delete</p>))
                            :((activeProjects>index) ? 
                                ((mode==0) && <p className={styles.delete_cell} onClick={() => deleteRow('Portfolio', project, index)}>delete</p>):
                                (<button onClick={decrementProjectCells} className={styles.section_deletion}></button>))}
                    </div>
                    <input onChange={(e)=>inputPrName(index, e)} disabled={mode} type="text" name="prName" id={index + "prName"} defaultValue={name} />
                    {Array.isArray(errors.prName) && errors.prName[index] && (<p className="validation-message">{errors.prName[index]}</p>)}
                    <label htmlFor={index + "prDesc"}>ОПИСАНИЕ</label>
                    <textarea onChange={(e) => inputPrDesc(index, e)} disabled={mode} name="prDesc" id={index + "prDesc"} defaultValue={project.desc[index]}></textarea>
                    {Array.isArray(errors.desc) && errors.desc[index] && (<p className="validation-message">{errors.desc[index]}</p>)}
                    <label htmlFor={index + "prRole"}>РОЛЬ В ПРОЕКТЕ*</label>
                    <input onChange={(e) => inputPrRole(index, e)} disabled={mode} type="text" name="prRole" id={index + "prRole"} defaultValue={project.role[index]}/>
                    {Array.isArray(errors.role) && errors.role[index] && (<p className="validation-message">{errors.role[index]}</p>)}
                    <label htmlFor={index + "prLink"}>ССЫЛКА</label>
                    <input onChange={(e) => inputPrLink(index, e)} disabled={mode} type="text" name="prLink" id={index + "prLink"} defaultValue={project.link[index]}/>
                    {Array.isArray(errors.link) && errors.link[index] && (<p className="validation-message">{errors.link[index]}</p>)}
                    <label htmlFor={index + "prYear"}>ГОД*</label>
                    <input onChange={(e) => inputPrYear(index, e)} disabled={mode} type="number" name="prYear" id={index + "prYear"} defaultValue={project.year[index]}/>
                    {Array.isArray(errors.year) && errors.year[index] && (<p className="validation-message">{errors.year[index]}</p>)}
                    <hr></hr>
                </div> )
                )}

                {(mode==0) && <p className={styles.add} onClick={incrementProjectCells}>Добавить</p>}

            </div>
            {mode ? <button onClick={()=>navigate('/profile/1')} className={styles.change_button} data-content='ИЗМЕНИТЬ'></button>
            : <button onClick={saveChanges} className={styles.save_button} data-content='СОХРАНИТЬ'></button>}
        </div>
        </>
    )
}