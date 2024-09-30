import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import styles from "./FilterInput.module.scss";

export default function FilterInput({
  pageStyles = [null, null, null],
  i,
  placeholder,
  data,
  selected,
  setSelected,
  iteration = 0,
}) {
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? data
      : data.filter((instance) => {
          return instance.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={styles.combobox_wrapper}>
      <Combobox
        value={selected[iteration][i]}
        onChange={(value) =>
          setSelected((ar) => {
            let updatedRoles = [...ar];

            // Create a shallow copy of the specific role object that needs to be updated
            let updatedRole = { ...updatedRoles[iteration] };

            // Update the property with the new value
            updatedRole[i] = value;

            // Replace the role in the array with the updated one
            updatedRoles[iteration] = updatedRole;

            return updatedRoles; // Return the new
          })
        }
        onClose={() => setQuery("")}
      >
        <div className={styles.combobox_wrapper}>
          <ComboboxInput
            placeholder={placeholder}
            className={clsx(pageStyles[0] || styles.filter_input)}
            displayValue={(instance) => instance?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <ComboboxOptions
          anchor="bottom start"
          transition
          className={clsx(pageStyles[1] || styles.options)}
        >
          {filteredData.map((instance) => (
            <ComboboxOption
              key={instance.id}
              value={instance}
              className={clsx(pageStyles[2] || styles.option)}
            >
              <div className="text-sm/6 text-white">{instance.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
