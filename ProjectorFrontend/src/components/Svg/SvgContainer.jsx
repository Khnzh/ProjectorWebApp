import React from "react";
import PropTypes from "prop-types";
import styles from "./SvgContainer.module.scss"; // CSS/SCSS для стилей контейнера

const SvgContainer = ({ src, width = "100%", height = "100%", className = "", alt = "SVG Image" }) => {
  return (
    <div className={`${styles.svg_container} ${className}`} style={{ width, height }}>
      <img src={'/NothingHere.svg'} alt={alt} className={styles.svg_image} />
    </div>
  );
};

// Пропсы для проверки типов данных
SvgContainer.propTypes = {
  width: PropTypes.string,         // Ширина контейнера
  height: PropTypes.string,        // Высота контейнера
  className: PropTypes.string,     // Дополнительные классы
  alt: PropTypes.string,           // Альтернативный текст
};

export default SvgContainer;