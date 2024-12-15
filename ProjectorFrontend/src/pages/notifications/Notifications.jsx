import React, { useCallback, useEffect, useState } from "react";
import styles from "./Notifications.module.scss";
import supabase from "../../config/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import Notification from "../../components/notification/Notification";

const Notifications = () => {
  const { state } = useAuth();
  const [notifications, setNotifications] = useState([undefined]);

  const readNotif = async () => {
    console.log("called");
    const { data: read, error: readError } = await supabase
      .from("Notifications")
      .update({ read: true })
      .eq("receiver", state.pId)
      .eq("read", false)
      .select("id");
    console.log(readError ? readError : read);
  };

  const fetchNotif = async () => {
    const { data, error } = await supabase
      .from("Notifications")
      .select(
        `
        id,
        receiver!inner(id),
        sender(id, name, lastName),
        project(id, name),
        qualification_id(id, name),
        type,
        status,
        read,
        edited_at,
        text,
        title
        `
      )
      .eq("receiver", state.pId)
      .order("edited_at", { ascending: false })
      .order("read", { ascending: true });
    if (error) {
      setNotifications([null]);
      console.log(error);
    } else {
      setNotifications([...data]);
      const readNotifs = [...data].filter((item) => item.read == false);
      if (readNotifs.length > 0) readNotif();
      return data;
    }
  };

  useEffect(() => {
    if (state.pId) fetchNotif();
  }, [state.pId]);

  const rmNotification = useCallback(
    (id) => {
      setNotifications((prev) => {
        const notifs = [...prev].filter((item) => item.id != id);
        return notifs;
      });
    },
    [setNotifications]
  );

  useEffect(() => console.log(notifications), [notifications]);
  return (
    <div className={styles.notifications}>
      <div className={styles.notifications__body}>
        {notifications[0] &&
          notifications.map((item, index) => (
            <Notification
              item={item}
              key={index}
              rmNotification={rmNotification}
            />
          ))}
      </div>
    </div>
  );
};

export default Notifications;
