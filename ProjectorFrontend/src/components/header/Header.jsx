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
      <div className={styles.header}>
        <ul className={styles.header__navbar}>
          <li className={styles.header__navlink}>
            <div className={styles.dropdown}>
              <a href="/">ГЛАВНАЯ</a>
              <div className={styles.dropdown_content}>
                <a href="/#about">О НАС</a>
                <a href="/#forUsers">ПОЛЬЗОВАТЕЛЯМ</a>
                <a href="/#partnership">ПАРТНЕРАМ</a>
                <a href="/#contactUs">КОНТАКТЫ</a>
              </div>
            </div>
          </li>
          <li className={styles.header__navlink}>
            <a href="/projects">ПРОЕКТЫ</a>
          </li>
        </ul>
        {isLoggedIn ? (
          <ul className={styles.header__navbar}>
            <li className={styles.header__navlink}>
              <Link to="/profile/0">ПРОФИЛЬ</Link>
            </li>
            <li className={styles.header__navlink}>
              <a onClick={logoutUser} href="">
                ВЫЙТИ
              </a>
            </li>
          </ul>
        ) : (
          <ul className={styles.header__navbar}>
            <li className={styles.header__navlink}>
              <Link to="/login">ВОЙТИ В АККАУНТ</Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
