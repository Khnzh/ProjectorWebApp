import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import styles from "../Multiselect.module.scss";

const languages = [
  { id: 1, name: "العربية (Arabic)" },
  { id: 2, name: "Беларуская (Belarusian)" },
  { id: 3, name: "Deutsche (German)" },
  { id: 4, name: "English" },
  { id: 5, name: "Eesti (Estonian)" },
  { id: 6, name: "Español (Spanish)" },
  { id: 7, name: "Ελληνικά (Greek)" },
  { id: 8, name: "Français (French)" },
  { id: 9, name: "ქართული (Georgian)" },
  { id: 10, name: "हिन्दी (Hindi)" },
  { id: 11, name: "Magyar (Hungarian)" },
  { id: 12, name: "Nederlands (Dutch)" },
  { id: 13, name: "Latviešu (Latvian)" },
  { id: 14, name: "Lietuvių (Lithuanian)" },
  { id: 15, name: "Polski (Polish)" },
  { id: 16, name: "Português (Portuguese)" },
  { id: 17, name: "فارسی (Persian)" },
  { id: 18, name: "Русский (Russian)" },
  { id: 19, name: "Svenska (Swedish)" },
  { id: 20, name: "Türkçe (Turkish)" },
  { id: 21, name: "Українська (Ukrainian)" },
  { id: 22, name: "Кыргызча (Kyrgyz)" },
  { id: 23, name: "Italiano (Italian)" },
  { id: 24, name: "한국어 (Korean)" },
  { id: 25, name: "日本語 (Japanese)" },
  { id: 26, name: "Қазақша (Kazakh)" },
  { id: 27, name: "Ўзбекча (Uzbek)" },
  { id: 28, name: "中文 (Chinese)" },
];

export default function MultiselectLang({ profile, setProfile, mode }) {
  const [query, setQuery] = useState("");

  const selectedLanguages = Array.isArray(profile.langs) ? profile.langs : [];
  // Function to remove a language from the selected languages
  const removeItem = (id) => {
    setProfile((prev) => ({
      ...prev,
      langs: prev.langs.filter((language) => language.id !== id),
    }));
  };

  // Filter languages based on the query
  const filteredLanguages =
    query === ""
      ? languages
      : languages.filter((language) =>
          language.name.toLowerCase().includes(query.toLowerCase())
        );

  if (mode) {
    return (
      <>
        {selectedLanguages.length > 0 ? (
          <ul className={styles.horizontal_list}>
            {selectedLanguages.map((language) => (
              <li className={styles.list_item} key={language.id}>
                {mode === 0 && (
                  <button
                    className={styles.cross_button}
                    onClick={() => removeItem(language.id)}
                  >
                    ✖
                  </button>
                )}
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
      <Combobox
        multiple
        value={selectedLanguages}
        onChange={(langs) => setProfile((prev) => ({ ...prev, langs }))}
        onClose={() => setQuery("")}
      >
        <ul className={styles.horizontal_list}>
          {selectedLanguages.map((language) => (
            <li className={styles.list_item} key={language.id}>
              {mode == 0 && (
                <button
                  className={styles.cross_button}
                  onClick={() => removeItem(language.id)}
                >
                  ✖
                </button>
              )}
              {language.name}
            </li>
          ))}
        </ul>
        <ComboboxInput
          className={styles.specialty_input}
          aria-label="Languages"
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxOptions
          anchor="bottom start"
          className={styles.specialty + " border empty:invisible"}
        >
          {filteredLanguages.map((language) => (
            <ComboboxOption
              key={language.id}
              value={language}
              className="data-[focus]:bg-blue-100"
            >
              {language.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    );
  }
}
