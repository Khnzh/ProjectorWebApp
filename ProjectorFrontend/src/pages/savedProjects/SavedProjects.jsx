import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import ProjectCard from "../../components/projectCard/ProjectCard";

const SavedProjects = () => {
  const localKey = "sb-rotyixpntplxytekbeuz-auth-token";
  const [uId, setUId] = useState(null);
  const [prInfo, setPrInfo] = useState(null);

  useEffect(
    () => async () => {
      const info = JSON.parse(localStorage.getItem(localKey));
      setUId((u) => info.user.id);

      const { data, error } = await supabase
        .from("Saved_projects")
        .select(
          `
            Projects (id,
        name,
        description,
        created_at,
        Profile ( id, name, lastName ),
        project_qualifications!inner( 
          qualification_id!inner(name), 
          experience, 
          employment, 
          shift, 
          salary
        ))
          `
        )
        .eq("user_id", info.user.id);

      !error
        ? setPrInfo(data.map((item) => item.Projects))
        : console.log(error);
    },
    []
  );

  useEffect(() => console.log(prInfo), [prInfo]);
  return (
    <div>
      {prInfo &&
        prInfo.map((item) => (
          <ProjectCard
            key={item.id}
            item={item}
            coverImg={`https://rotyixpntplxytekbeuz.supabase.co/storage/v1/object/public/project_photos/${item.Profile.id}/${item.id}/Project_pic.png`}
          />
        ))}
    </div>
  );
};

export default SavedProjects;
