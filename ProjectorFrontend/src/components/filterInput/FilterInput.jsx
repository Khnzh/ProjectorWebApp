import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'
import styles from './FilterInput.module.scss'

export default function FilterInput({ i, data, selected, setSelected }) {
  const [query, setQuery] = useState('')

  const filteredData =
    query === ''
      ? data
      : data.filter((instance) => {
        return instance.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <div className={styles.combobox_wrapper}>
      <Combobox value={selected[i]} onChange={(value) => setSelected((s) => {
        const dataSet = { ...s };
        dataSet[i] = value
        return dataSet;
      })} onClose={() => setQuery('')}>
        <div className={styles.combobox_wrapper}>
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25', styles.filter_input
            )}
            displayValue={(instance) => instance?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <ComboboxOptions
          anchor="bottom start"
          transition
          className={clsx(
            'w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0', styles.options
          )}
        >
          {filteredData.map((instance) => (
            <ComboboxOption
              key={instance.id}
              value={instance}
              className={styles.option}
            >
              <div className="text-sm/6 text-white">{instance.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}