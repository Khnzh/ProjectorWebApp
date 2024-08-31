import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import styles from './DropdownSpecs.module.scss'

export default function DropdownSpecs({specs, mainSpec, setMainSpec}) {
  const updateMainSpec = (e) => {
    e.preventDefault();
    const chosenSpec = e.target.innerText
    specs.map((item) =>{
      if (item.name == chosenSpec) setMainSpec(item)
    })
  }

  return (
    <Menu>
      <MenuButton className={styles.main_spec}>{mainSpec.name}</MenuButton>
      <MenuItems anchor="bottom start">
        {specs.map((item, index) => ((mainSpec.id!=item.id) && <MenuItem id={index}>
          <a id={index + 'link'} onClick={(e) => updateMainSpec(e)}>
            {item.name}
          </a>
        </MenuItem>))}
      </MenuItems>
    </Menu>
  )
}