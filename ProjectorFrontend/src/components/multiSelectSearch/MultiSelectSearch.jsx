import React, { useEffect, useRef, useState } from "react";
import styles from "./MultiSelectSearch.module.scss";
import cn from "classnames";

const MultiSelectSearch = ({
  profile,
  setProfile,
  mode,
  specKey,
  valueList,
}) => {
  const [innerText, setInnerText] = useState("");
  const [showList, setShowList] = useState(false);
  const selectValue = useRef(null);

  const [options, setOptions] = useState(null);
  useEffect(() => {
    setOptions(() => {
      if (profile[specKey].length != 0) {
        let opts = [...valueList];
        profile[specKey].map((chosen) => {
          opts.splice(chosen.id - 1, 1, null);
        });
        return opts;
      } else {
        return valueList;
      }
    });
  }, [profile]);

  const setLang = (item) => {
    setProfile((prev) => {
      let all = { ...prev };
      let res = [...all[specKey]];
      res.push(item);
      all[specKey] = res;
      return all;
    });
  };

  const removeItem = (id) => {
    setProfile((prev) => {
      // ...prev,
      // specKey: prev[specKey].filter((language) => language.id !== id),
      let all = { ...prev };
      let res = [...all[specKey]];
      all[specKey] = res.filter((language) => language.id !== id);
      return all;
    });
  };
  if (mode) {
    return (
      <>
        {profile[specKey].length > 0 ? (
          <ul className={styles.horizontal_list}>
            {profile[specKey].map((language) => (
              <li className={styles.list_item} key={"c" + language.id}>
                {language.name}
              </li>
            ))}
          </ul>
        ) : (
          <input type="text" disabled />
        )}
      </>
    );
  } else {
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
              placeholder="Введите"
              value={innerText}
              onFocus={() => setShowList(true)}
              onBlur={() => setShowList(false)}
              ref={selectValue}
            />
            <div className={styles.options}>
              {showList && (
                <ul>
                  {options
                    .filter((opt) => {
                      return (
                        opt &&
                        opt.name.toLowerCase().includes(innerText.toLowerCase())
                      );
                    })
                    .map((opt) => (
                      <li
                        key={opt.id}
                        onMouseDown={() => {
                          setInnerText("");
                          selectValue.current.value = opt.name;
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
  }
};

export default MultiSelectSearch;
