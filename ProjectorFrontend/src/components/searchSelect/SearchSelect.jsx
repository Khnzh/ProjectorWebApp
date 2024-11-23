import React, { useEffect } from "react";
import styles from "./SearchSelect.module.scss";

const SearchSelect = ({
  innerText,
  setInnerText,
  showList,
  setShowList,
  selectCountry,
  setSelectedCountry,
  selectedCountry,
  countries,
}) => {
  useEffect(() => console.log(countries), []);
  return (
    <div className={styles.inputSearch}>
      <input
        className={styles.input}
        type="text"
        onChange={(e) => setInnerText(e.target.value)}
        placeholder="Enter your country"
        value={innerText}
        onFocus={() => setShowList(true)}
        onBlur={() => setShowList(false)}
        ref={selectCountry}
      />
      <div className={styles.options}>
        {showList && (
          <ul>
            {countries
              .filter((country) =>
                country.name.toLowerCase().includes(innerText.toLowerCase())
              )
              .map((country) => (
                <li
                  key={country.id}
                  onMouseDown={() => {
                    setInnerText(country.name);
                    setSelectedCountry(country);
                    selectCountry.current.value = country.name;
                  }}
                >
                  {country.name}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchSelect;
