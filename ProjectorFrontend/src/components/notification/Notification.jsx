import React, { useState } from "react";
import styles from "./Notification.module.scss";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../config/supabaseClient";

const Notification = ({ item, rmNotification }) => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const toUser = (e) => {
    e.stopPropagation();
    navigate(`../user/${item.sender.id}`);
  };

  const toProject = (e) => {
    e.stopPropagation();
    navigate(`../project/${item.project.id}`);
  };

  const notificationStyle = (status, read, expanded) => {
    if (!read || status == "pending") {
      if (expanded) {
        return cn(styles.notification, styles.notification_exp, styles.active);
      } else {
        return cn(styles.notification, styles.active);
      }
    } else {
      if (expanded) {
        return cn(styles.notification, styles.notification_exp);
      } else {
        return cn(styles.notification);
      }
    }
  };

  const hire = async (e) => {
    e.stopPropagation();
    const currentDate = new Date().toISOString();
    const { data, error } = await supabase
      .from("Notifications")
      .update({
        sender: state.pId,
        receiver: item.sender.id,
        project: item.project.id,
        status: "hired",
        read: false,
        edited_at: currentDate,
      })
      .eq("id", item.id)
      .select("id");
    console.log(error ? error : rmNotification(item.id));
  };

  const reject = async (e) => {
    e.stopPropagation();
    const currentDate = new Date().toISOString();
    const { data, error } = await supabase
      .from("Notifications")
      .update({
        sender: state.pId,
        receiver: item.sender.id,
        project: item.project.id,
        status: "rejected",
        read: false,
        edited_at: currentDate,
      })
      .eq("id", item.id)
      .select("id");
    console.log(error ? error : rmNotification(item.id));
  };

  const switchExpanded = () => setExpanded((prev) => !prev);
  return (
    <div
      className={notificationStyle(item.status, item.read, expanded)}
      onClick={switchExpanded}
    >
      {item.type == "role" && (
        <h1 onClick={(e) => toUser(e)}>
          {`${item.sender.name} ${item.sender.lastName}`} &ensp;
          <span onClick={(e) => toProject(e)}> {`(${item.project.name})`}</span>
        </h1>
      )}
      {item.type == "custom" && <h1>{item.title}</h1>}
      {item.type == "role" &&
        (item.status == "rejected" ? (
          <>
            <p>
              Вас пока не готовы принять для работы над проектом{" "}
              {item.project.name}
            </p>
          </>
        ) : item.status == "hired" ? (
          <>
            <p>
              Тебя выбрали на проект {item.project.name}! Скорее связывайся с
              сокомандниками, чтобы работать над проектом вместе
            </p>
          </>
        ) : (
          <>
            <p>
              {`${item.qualification_id.name} ${item.sender.name} ${item.sender.lastName}`}{" "}
              желает присоединиться к вашей творческой команде для работы над
              проектом {`"${item.project.name}"`}
            </p>
            {expanded && (
              <div className={styles.buttons}>
                <button className="min_underlined" onClick={(e) => hire(e)}>
                  ПРИНЯТЬ
                </button>
                <button className="min_underlined" onClick={(e) => reject(e)}>
                  ОТКЛОНИТЬ
                </button>
              </div>
            )}
          </>
        ))}
      {item.type == "custom" && (
        <>
          <p>{item.text}</p>
        </>
      )}
    </div>
  );
};

export default Notification;
