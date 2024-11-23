import React, { useEffect, useState } from "react";
import styles from "./MultiSelectSearch.module.scss";

const MultiSelectSearch = ({
  innerText,
  setInnerText,
  showList,
  setShowList,
  selectCountry,
  setSelectedCountry,
  selectedCountry,
  countries,
  profile,
  setProfile,
  mode,
  specKey,
}) => {
  const [options, setOptions] = useState(null);
  useEffect(() => {
    setOptions(() => {
      let opts = [...countries];
      profile[specKey].map((chosen) => {
        opts.splice(chosen.id - 1, 1, { id: null, name: "null" });
      });
      return opts;
    });

    console.log(profile);
  }, [profile]);

  const setLang = (item) => {
    setProfile((prev) => {
      let all = { ...prev };
      let res = [...all[specKey]];
      console.log(res);
      res.push(item);
      all[specKey] = res;
      return all;
    });
  };

  const removeItem = (id) => {
    setProfile((prev) => ({
      ...prev,
      specKey: prev[specKey].filter((language) => language.id !== id),
    }));
  };

  return (
    options && (
      <>
        <ul className={styles.horizontal_list}>
          {profile[specKey].map((language) => (
            <li className={styles.list_item} key={"c" + language.id}>
              <button
                className={styles.cross_button}
                onClick={() => removeItem(language.id)}
              >
                ✖
              </button>
              {language.name}
            </li>
          ))}
        </ul>
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
                {options
                  .filter((opt) => {
                    // opt &&
                    return opt.name
                      .toLowerCase()
                      .includes(innerText.toLowerCase());
                  })
                  .map((opt) => (
                    <li
                      key={opt.id}
                      onMouseDown={() => {
                        setInnerText(opt.name);
                        setSelectedCountry(opt);
                        selectCountry.current.value = opt.name;
                        setLang(opt);
                      }}
                    >
                      {opt.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default MultiSelectSearch;
