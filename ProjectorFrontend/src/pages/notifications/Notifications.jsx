import React, { useEffect, useState } from "react";
import styles from "./Notifications.module.scss";
import supabase from "../../config/supabaseClient";
import { useAuth } from "../../context/AuthContext";

const Notifications = () => {
  const { state } = useAuth();
  const [notifications, setNotifications] = useState();

  useEffect(() => {
    const fetchNotif = async () => {
      const { data, error } = await supabase
        .from("Notifications")
        .select(
          `
        id,
        receiver!inner(id),
        sender(id, name, lastName),
        project(id, name),
        type,
        status,
        read,
        edited_at
        `
        )
        .eq("receiver", state.pId)
        .order("edited_at", { ascending: false })
        .order("read", { ascending: true });
      if (error) {
        console.log(error);
      } else {
        setNotifications([...data]);
        return data;
      }
    };
    if (state.pId) fetchNotif();
  }, [state.pId]);
  useEffect(() => console.log(notifications), [notifications]);
  return (
    <div className={styles.notifications}>
      <div className={styles.notifications__body}>
        <div className={styles.notification}>
          {/* {notifications.map((item) => item)} */}
          <h1>
            Nika Sorokina <span>(Cehovyj malchishka)</span>
          </h1>
          <p>
            Description our is thr nice and fluffy but Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Laborum odit quam neque, culpa
            quis inventore distinctio nostrum veritatis, maiores obcaecati
            placeat illo officiis laudantium aperiam aspernatur magnam ipsum
            quidem odio. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Porro minima atque fugiat! Quasi incidunt natus, facilis, eius
            obcaecati officiis nostrum et hic sint, aperiam molestiae non
            suscipit atque temporibus similique.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
