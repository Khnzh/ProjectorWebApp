import React, { useEffect, useRef, useState } from "react";
import styles from "./SearchSelect.module.scss";

const SearchSelect = ({
  i,
  placeholder,
  data,
  selected,
  setSelected,
  parentstyles = null,
  iteration = 0,
}) => {
  const [showList, setShowList] = useState(false);
  const selectValue = useRef(null);

  return (
    <div className={styles.inputSearch}>
      <input
        className={parentstyles ? parentstyles.input : styles.input}
        type="text"
        onChange={(e) =>
          // setSelected({ id: 0, name: e.target.value })
          setSelected((ar) => {
            let updatedRoles = [...ar];

            // Create a shallow copy of the specific role object that needs to be updated
            let updatedRole = { ...updatedRoles[iteration] };

            // Update the property with the new value
            updatedRole[i] = { id: 0, name: e.target.value };

            // Replace the role in the array with the updated one
            updatedRoles[iteration] = updatedRole;
            // console.log(updatedRoles)
            return updatedRoles; // Return the new
          })
        }
        placeholder={placeholder}
        value={
          selected[iteration][i]
            ? selected[iteration][i].name
            : selected[iteration][i]
        }
        onFocus={() => setShowList(true)}
        onBlur={() => setShowList(false)}
        ref={selectValue}
      />
      <div className={parentstyles ? parentstyles.options : styles.options}>
        {showList && (
          <ul>
            {data &&
              data
                .filter((opt) =>
                  opt.name
                    .toLowerCase()
                    .includes(selectValue.current.value.toLowerCase())
                )
                .map((country) => (
                  <li
                    key={country.id}
                    onMouseDown={() => {
                      setSelected((ar) => {
                        let updatedRoles = [...ar];

                        // Create a shallow copy of the specific role object that needs to be updated
                        let updatedRole = { ...updatedRoles[iteration] };

                        // Update the property with the new value
                        updatedRole[i] = country;

                        // Replace the role in the array with the updated one
                        updatedRoles[iteration] = updatedRole;

                        return updatedRoles; // Return the new
                      });
                      selectValue.current.value = country.name;
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
