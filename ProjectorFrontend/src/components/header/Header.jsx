import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import styles from "./Header.module.scss";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const localKey = "sb-rotyixpntplxytekbeuz-auth-token";
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(localKey)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, setIsLoggedIn]);

  const logoutUser = async (e) => {
    e.preventDefault();
    let { error } = await supabase.auth.signOut();
    setIsLoggedIn(false);
    error ? console.log(error) : navigate("/");
  };

  return (
    <>
      <div className={styles.paperOverlay}></div>
      <div className={styles.header}>
        <ul className={styles.header__navbar}>
          <li className={styles.header__navlink}>
            <Link to="/">О НАС</Link>
          </li>
          <li className={styles.header__navlink}>
            <Link to="/projects">ПОЛЬЗОВАТЕЛЯМ</Link>
          </li>
          <li className={styles.header__navlink}>
            <Link to="/">ПАРТНЕРАМ</Link>
          </li>
          <li className={styles.header__navlink}>
            <Link to="/">КОНТАКТЫ</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className={styles.header__sign_10percent_left}>
                <Link to="/profile/0">ПРОФИЛЬ</Link>
              </li>
              <li className={styles.header__sign}>
                <a onClick={logoutUser}>ВЫЙТИ</a>
              </li>
            </>
          ) : (
            <li className={styles.header__sign_10percent_left}>
              <Link to="/login">ВОЙТИ В АККАУНТ</Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
