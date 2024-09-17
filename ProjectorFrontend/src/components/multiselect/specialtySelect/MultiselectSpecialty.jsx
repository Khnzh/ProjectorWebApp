import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { qualifications } from "../../../utilityFunctions/utilityObjects";
import styles from "../Multiselect.module.scss";

const people = qualifications;

export default function Multiselect({ profile, setProfile, mode = 0 }) {
  const [query, setQuery] = useState("");

  let selectedPeople = Array.isArray(profile.specialties)
    ? profile.specialties
    : [];

  const removeItem = (id) =>
    setProfile((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((person) => person.id !== id),
    }));

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  if ((mode = 0)) {
    return (
      <>
        {selectedPeople.length > 0 && (
          <ul className={styles.horizontal_list}>
            {selectedPeople.map((person) => (
              <li className={styles.list_item} key={person.id}>
                {mode == 0 && (
                  <button
                    className={styles.cross_button}
                    onClick={() => removeItem(person.id)}
                  >
                    ✖
                  </button>
                )}
                {person.name}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  } else {
    return (
      <Combobox
        multiple
        value={selectedPeople}
        onChange={(specialties) =>
          setProfile((prev) => ({ ...prev, specialties }))
        }
        onClose={() => setQuery("")}
      >
        {selectedPeople.length > 0 && (
          <ul className={styles.horizontal_list}>
            {selectedPeople.map((person) => (
              <li className={styles.list_item} key={person.id}>
                {mode == 0 && (
                  <button
                    className={styles.cross_button}
                    onClick={() => removeItem(person.id)}
                  >
                    ✖
                  </button>
                )}
                {person.name}
              </li>
            ))}
          </ul>
        )}
        <ComboboxInput
          className="specialty-input"
          aria-label="Assignees"
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxOptions
          anchor="bottom start"
          className={styles.specialty + " border empty:invisible"}
        >
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="data-[focus]:bg-blue-100"
            >
              {person.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    );
  }
}
