import styles from "./Landing.module.scss";
import Header from "../../components/header/Header";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.paperOverlay}></div>
        <div className={styles.page_top}>
          <Header />
        </div>
        <section id="about" className={styles.landing__about}>
          <img
            src="/projector.svg"
            alt=""
            width={1493}
            height={335}
            className={styles.sign_big_header}
          />
          <div className={styles.landing_cmps}>
            <div className={styles.cloud_text}>
              <p>
                Камера, мотор… ПРОЖЕКТОР!
                <br />
                Найди подходящего специалиста сейчас!
              </p>
              <span>
                Камера, мотор… ПРОЖЕКТОР!
                <br />
                Найди подходящего специалиста сейчас!
              </span>
            </div>
            <div className={styles.signup}>
              <p>Зарегистрироваться</p>
              <span>Зарегистрироваться</span>
              <button></button>
            </div>
          </div>
        </section>
        <section id="forUsers" className={styles.landing__info_for_users}>
          <div className={cn(styles.forusers_row1, styles.curve_top_bg)}>
            <div className={styles.sign_projector_is}>
              <img src="sign_projector_is.png" alt="" width={511} height={74} />
              <p>
                Платформа для начинающих специалистов в сфере киноиндустрии,
                которые хотят найти команду для реализации своего видеопроекта
              </p>
            </div>
            <img
              src="/fella.png"
              alt=""
              width={412}
              height={633}
              className={styles.forusers_img1}
            />
            <img
              src="/assets/bottom_curve.svg"
              alt=""
              className={styles.curve_bottom}
            />
          </div>
          <div className={styles.margin_div}>
            <div className={styles.forusers_row2}>
              <img
                src="/two_fellas.png"
                alt=""
                width={519}
                height={587}
                className={styles.forusers_img2}
              />
              <div className={styles.sign_why_us}>
                <img src="sign_why_us.png" alt="" width={440} height={110} />
                <ul>
                  <li>
                    <p>Предлагаем юридически закрепить трудовые отношения</p>
                  </li>
                  <li>
                    <p>Создаем неформальное коммьюнити специалистов</p>
                  </li>
                  <li>
                    <p>Помогаем найти подходящих специалистов</p>
                  </li>
                  <li>
                    <p>Даем возможность развить себя как личный бренд</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button
            className={styles.minimalistic_button}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Зарегистрироваться
          </button>
        </section>
        <section className={styles.landing__opportunities} id="opportunities">
          <img
            src="sign_opportunities.png"
            alt=""
            width={1509}
            height={202}
            className={cn(styles.sign_big_header, "margin_bottom_7")}
          />
          <div className={styles.landing_cmps}>
            <div className={styles.landing_cmps__third_width_element}>
              <h2>РЕЖИССЕРА</h2>
              <img
                src="/assets/hlopushka.svg"
                alt=""
                width={252}
                height={202}
              />
              <ol>
                <li>рассказать о своём проекте на сайте</li>
                <li>собрать/найти единомышленников в команду</li>
                <li>получить доступ продюсеров к твоему портфолио</li>
                <li>пообщаться с понравившимся исполнителем</li>
                <li>заключить договор об оказании услуг с подрядчиками</li>
              </ol>
            </div>
            <div className={styles.landing_cmps__third_width_element}>
              <h2>ПРОДЮСЕРА</h2>
              <img src="/dollar_bill.png" alt="" width={256} height={194} />
              <ol>
                <li>рассказать о своей идее на сайте</li>
                <li>найти подходящего режиссера для реализации проекта</li>
                <li>пообщаться с понравившимся исполнителем</li>
                <li>заключить договор об оказании услуг с подрядчиками</li>
              </ol>
            </div>
            <div className={styles.landing_cmps__third_width_element}>
              <h2>ДРУГИХ ЧЛЕНОВ КОМАНДЫ</h2>
              <img src="/three_fellas.png" alt="" width={304} height={196} />
              <ol>
                <li>организовать депонирование сценариев</li>
                <li>получить доступ к анкетам подрядчиков</li>
                <li>быстро откликнуться на понравившуюся вакансию</li>
                <li>пообщаться с понравившимся исполнителем</li>
              </ol>
            </div>
          </div>
          <button
            className={styles.minimalistic_button}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Зарегистрироваться
          </button>
          <img
            src="filming_team.png"
            alt=""
            width={1511}
            height={370}
            className={cn(styles.sign_big_header)}
          />
        </section>
        <section className={styles.landing__opportunities} id="partnership">
          <img
            src="sign_collaborating_with.png"
            alt=""
            width={1484}
            height={204}
            className={cn(styles.sign_big_header, "margin_bottom_7")}
          />
          <div className={styles.landing_cmps}>
            <div className={styles.landing_cmps__half_width_element}>
              <h2>УНИВЕРСИТЕТАМИ</h2>
              <ul>
                <li>
                  повышение эффективности коммуникации между студентами внутри
                  вуза
                </li>
                <li>
                  повышение успеваемости студентов удобная модель предоставления
                  лицензии на продукт по подписке SaaS
                </li>
                <li>единая корпоративная система для вуза</li>
              </ul>
            </div>
            <div className={styles.landing_cmps__half_width_element}>
              <h2>ПАРТНЕРАМИ ИЗ КИНОСФЕРЫ</h2>
              <ul>
                <li>разработка взаимовыгодной стратегии продвижения</li>
                <li>
                  повышение узнаваемости возможность привлечения ЦА студентов
                </li>
                <li>увеличение продаж продукта</li>
              </ul>
            </div>
          </div>
          <button
            className={styles.minimalistic_button}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Зарегистрироваться
          </button>
        </section>
        <section className={styles.landing__opportunities} id="contactUs">
          <div className={styles.questions_bg}>
            <div className={styles.questions_cmps}>
              <svg
                width="1498"
                height="844"
                className={styles.questions_frame}
                viewBox="0 0 1498 844"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M28.6808 745.222C21.7033 725.006 22.5457 704.099 17.7581 683.453C12.4089 660.385 8.71552 635.742 5.62185 612.251C-1.52069 558.016 4.10481 500.16 4.10481 445.506C4.10481 417.153 9.85254 389.694 13.6621 361.676C17.7026 331.961 17.7581 302.752 17.7581 272.826C17.7581 229.04 20.4888 185.397 20.4888 141.529C20.4888 113.423 27.6451 85.8971 28.6808 57.8524C29.9293 24.044 56.5169 7.3058 89.3621 3.69045C140.922 -1.98485 191.812 7.89655 242.583 14.6445C265.57 17.6999 286.8 28.2707 309.939 31.0757C335.908 34.2239 361.953 39.703 387.611 44.7683C416.472 50.466 445.87 49.7006 474.992 53.7446C507.91 58.3156 540.59 57.8524 573.751 57.8524C641.454 57.8524 709.099 60.5909 776.882 60.5909C849.388 60.5909 921.565 52.3753 993.969 52.3753C1055.59 52.3753 1117.23 44.1597 1178.74 44.1597C1220.9 44.1597 1259.52 33.0438 1301.17 28.3372C1332.92 24.7493 1363.11 29.4508 1394.62 22.2516C1405.59 19.7453 1415.55 16.7745 1426.78 16.7745C1434.82 16.7745 1436.97 19.8539 1440.28 28.185C1456.46 68.9676 1466.66 114.599 1473.2 157.961C1480 203.06 1481.39 249.953 1481.39 295.495C1481.39 331.358 1493.44 366.159 1494.89 401.993C1497.29 460.873 1495.05 520.318 1495.05 579.237C1495.05 623.605 1486.1 668.182 1480.03 712.055C1475.17 747.132 1457.82 763.734 1427.08 779.149C1421.59 781.903 1415.12 780.662 1409.18 780.822C1392.49 781.275 1374.63 784.94 1358.51 789.038C1326.31 797.226 1296.08 789.092 1263.24 792.385C1235.93 795.124 1208.44 802.221 1181.02 802.731C1154.52 803.223 1128.23 802.58 1101.83 800.601C1074.66 798.563 1047.28 800.99 1020.21 803.339C986.493 806.266 952.711 805.469 918.876 805.469C871.719 805.469 826.591 819.162 779.613 819.162C731.167 819.162 683.57 813.685 635.343 813.685C613.679 813.685 592.284 816.423 570.717 816.423C550.83 816.423 530.004 814.617 510.339 818.097C474.388 824.459 441.118 838.371 404.298 840.918C337.382 845.546 273.857 834.466 208.298 824.03C186.396 820.544 165.652 812.678 144.886 805.469C132.6 801.204 120.535 795.475 107.87 792.385C93.0828 788.778 111.184 793.292 116.062 794.515"
                  stroke="#DD9E28"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className={cn(styles.questions_cmps__half_width_element)}>
                <img
                  src="questions.png"
                  alt=""
                  width={395}
                  height={70}
                  className={styles.sign_big_header}
                />
                <h2 className={styles.contact_h2}>Предложения?</h2>
                <p>Свяжитесь с нами!</p>
                <div className={cn(styles.landing_cmps, styles.gap)}>
                  <img
                    src="whatsapp_icon.png"
                    alt=""
                    width={71}
                    height={77}
                    className={styles.sign_big_header}
                  />
                  <img
                    src="instagram_icon.png"
                    alt=""
                    width={71}
                    height={77}
                    className={styles.sign_big_header}
                  />
                  <img
                    src="telegram_icon.png"
                    alt=""
                    width={71}
                    height={77}
                    className={styles.sign_big_header}
                  />
                </div>
              </div>
              <div className={styles.questions_cmps__half_width_element}>
                <p className={styles.margin_bottom_1em}>
                  Пользователям <br />
                  projector.inform@gmail.com
                </p>
                <p className={styles.margin_bottom_1em}>
                  Партнёрам <br />
                  partner@projector.ru
                </p>
                <p>
                  Трудоустройство
                  <br />
                  job@projector.ru
                </p>
              </div>
            </div>

            <img
              src="flash_rays.png"
              alt=""
              width={200}
              height={300}
              className={styles.sign_big_header}
            />
          </div>
          <img
            src="people_with_flash.png"
            alt=""
            width={200}
            height={300}
            className={cn(styles.sign_big_header, "margin_top_negative10")}
          />
        </section>
        <footer className={styles.landing__footer}>
          <p>ООО «Прожектор» {new Date().getFullYear()}</p>
          <ul>
            <li>
              <a href="">Политика конфиденциальности</a>
            </li>
            <li>
              <a href="">Пользовательское соглашение</a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default Landing;
