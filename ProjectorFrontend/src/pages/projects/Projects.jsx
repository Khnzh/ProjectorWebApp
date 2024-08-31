import styles from'./Projects.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

function Projects() {
  const localKey = "sb-rotyixpntplxytekbeuz-auth-token";
  const [uId, setUId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [qualificationId, setQualificationId] = useState(null);


// all projects fetching
  
  // useEffect(() =>
  //   { 
  //       const info = JSON.parse(localStorage.getItem(localKey));
  //       setUId((u) => info.user.id);

  //       const fetchProjects = async() => {
  //           let { data: Projects, error } = await supabase
  //           .from('Projects')
  //           .select("*")

  //           if (error) {console.log(error)}
  //           else {
  //             //assigning first projects id to ProjectId to test it later              
  //             setProjectId(()=> {
  //               const {id} = Projects[0]
  //               return id
  //             })
  //             console.log(Projects)
  //           }
  //       };
  //       fetchProjects()
  //   }
  //   , [])


// fetching qualifications for the particular project

    // useEffect( () => {
    //   const fetchSpecs = async () => {
    //     const { data: qualifications, error } = await supabase
    //     .from('project_qualifications')
    //     .select('qualification_id(*)')
    //     // insert projectId which u want, id of first project for example
    //     .eq('project_id', projectId)
    //     if (error) {console.log(error)} else
    //     {
    //         console.log(qualifications)
    //     };
    //   }

    //   if (projectId) fetchSpecs();
    // }
    // , [projectId])


// example of creating a project

    // useEffect( () => {
    //   const insertProject = async () => {
    //     const { data, error } = await supabase
    //     .from('Projects')
    //     .insert([
    //         {
    //         name: 'test_name',
    //         description: 'test_description',
    //         user_id: uId,
    //         promotion: 'A'
    //         }
    //     ])
    //     .select()
    //     if (!error) console.log(data)  
    //   }

    //   if (uId) insertProject();
    // }
    // , [uId])


//fetching qualification id by name

  // useEffect( () => {
  //   const fetchQualificationId = async () => {
  //     const { data, error } = await supabase
  //         .from('qualifications')
  //         .select('id')
  //         .eq('name', 'Редактор')
  //       if (!error){
  //         setQualificationId(()=> {
  //           return data[0].id
  //         })
  //         console.log(data)
  //       } else {
  //         console.log(error)
  //       }
  //   }

  //   fetchQualificationId();
  // }
  // , [])


//adding qualification to a project

    // const addQualification = async () => {
    //   const { data , error } = await supabase
    //     .from('project_qualifications')
    //     .insert([
    //         {
    //           qualification_id: qualificationId,
    //           project_id: projectId,
    //           }
    //     ])
    //     .select()
    //   if (!error) console.log(data)
    // }

    // const add = async () => {
    //   if (projectId && qualificationId) addQualification()
    //     console.log('clicked')
    // }


  return (
   <button onClick={add}>Press here</button>
  )
}

export default Projects;
