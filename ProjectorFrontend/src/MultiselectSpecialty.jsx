import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { useState } from 'react'

const people = [
    { id: 1, name: 'Актер' },
    { id: 2, name: 'Сценарист' },
    { id: 3, name: 'Продакшн' },
    { id: 4, name: 'Режиссер' },
    { id: 5, name: 'Редактор' },
    { id: 6, name: 'Продюсер' },
    { id: 7, name: 'Звукорежиссер' },
    { id: 8, name: 'Фотограф' },
    { id: 9, name: 'Монтажер' },
    { id: 10, name: 'Видеограф' },
    { id: 11, name: 'Арт-директор' },
    { id: 12, name: 'Ассистент продюсера' },
    { id: 13, name: 'Креативный продюсер' },
    { id: 14, name: 'Линейный продюсер' },
    { id: 15, name: 'Продюсер постпродакшн' },
    { id: 16, name: 'Администратор по площадке' },
    { id: 17, name: 'Исполнительный продюсер' },
    { id: 18, name: 'Заказчик' },
    { id: 19, name: 'ТВ-продюсер' },
    { id: 20, name: 'Ассистент' },
    { id: 21, name: 'Компания' },
    { id: 22, name: 'Стажер' },
    { id: 23, name: 'Менеджер по площадке' },
    { id: 24, name: 'Локейшн-скаут' },
    { id: 25, name: 'Сопродюсер' },
    { id: 26, name: 'Осветитель' },
    { id: 27, name: 'Помощник гафера' },
    { id: 28, name: 'Оператор крана' },
    { id: 29, name: 'Бригадир осветителей (гафер)' },
    { id: 30, name: 'Дольщик' },
    { id: 31, name: 'Инженер по генераторам' },
    { id: 32, name: 'Старший рабочий-механик' },
    { id: 33, name: 'Помощник старшего рабочего-механика' },
    { id: 34, name: 'Художник постановщик' },
    { id: 35, name: 'Бутафор' },
    { id: 36, name: 'Установщик декораций, постановщик' },
    { id: 37, name: 'Фудстилист' },
    { id: 38, name: 'Реквизитор' },
    { id: 39, name: 'Декоратор' },
    { id: 40, name: 'Художник по костюмам' },
    { id: 41, name: 'Ассистент художника по гриму' },
    { id: 42, name: 'Ассистент художника по костюмам' },
    { id: 43, name: 'Художник по специальному гриму' },
    { id: 44, name: 'Стилист' },
    { id: 45, name: 'Художник-гример' },
    { id: 46, name: 'Парикмахер' },
    { id: 47, name: 'Костюмер' },
    { id: 48, name: 'Animation Supervisor' },
    { id: 49, name: 'Художник по макетам' },
    { id: 50, name: 'Моушн-дизайнер' },
    { id: 51, name: 'Augmented Reality (AR)' },
    { id: 52, name: 'Дизайнер постеров' },
    { id: 53, name: 'Motion Control Camera Operator' },
    { id: 54, name: 'VFX Editor' },
    { id: 55, name: 'TD' },
    { id: 56, name: 'Roto Artist' },
    { id: 57, name: 'CG Supervisor' },
    { id: 58, name: 'Compositor' },
    { id: 59, name: 'Compositing Supervisor' },
    { id: 60, name: 'Matchmover' },
    { id: 61, name: 'Matte Painter' },
    { id: 62, name: 'Технический специалист по спец.эффектам' },
    { id: 63, name: 'Lighting TD' },
    { id: 64, name: 'VFX Producer' },
    { id: 65, name: 'VFX Artist' },
    { id: 66, name: 'Pipeline TD' },
    { id: 67, name: 'CG Producer' },
    { id: 68, name: 'Flame/Inferno Operator' },
    { id: 69, name: 'Stop Motion Animator' },
    { id: 70, name: 'Аниматор' },
    { id: 71, name: 'Иллюстратор' },
    { id: 72, name: 'Virtual Reality (VR)' },
    { id: 73, name: 'Художник 3D' },
    { id: 74, name: 'Previs Artist' },
    { id: 75, name: 'Modeler' },
    { id: 76, name: 'Rigger' },
    { id: 77, name: 'Texture Artist' },
    { id: 78, name: 'Layout Artist' },
    { id: 79, name: 'VFX Supervisor' },
    { id: 80, name: 'CG Generalist' },
    { id: 81, name: 'Concept Artist' },
    { id: 82, name: 'Пиротехник' },
    { id: 83, name: 'Оружейник' },
    { id: 84, name: 'Постановщик трюков' },
    { id: 85, name: 'Каскадер' },
    { id: 86, name: 'Режиссер монтажа' },
    { id: 87, name: 'Цветокоррекция (колорист)' },
    { id: 88, name: 'Клинап' },
    { id: 89, name: 'Второй режиссер' },
    { id: 90, name: 'Скрипт-супервайзер' },
    { id: 91, name: 'Режиссер планирования' },
    { id: 92, name: 'Раскадровщик' },
    { id: 93, name: 'Кастинг-директор' },
    { id: 94, name: 'Бригадир массовки' },
    { id: 95, name: 'Ассистент режиссера по актерам' },
    { id: 96, name: 'Архивариус' },
    { id: 97, name: 'Технический директор' },
    { id: 98, name: 'Хореограф' },
    { id: 99, name: 'Помощник режиссера' },
    { id: 100, name: 'Композитор' },
    { id: 101, name: 'Звукооператор на площадке' },
    { id: 102, name: 'Саунд продюсер' },
    { id: 103, name: 'Звукорежиссер перезаписи' },
    { id: 104, name: 'Бум-оператор' },
    { id: 105, name: 'Шумооформитель' },
    { id: 106, name: 'Ассистент звукооператора' },
    { id: 107, name: 'Инженер звукозаписи' },
    { id: 108, name: 'Музыкальный продюсер' },
    { id: 109, name: 'Оператор-постановщик' },
    { id: 110, name: '2-й ассистент оператора' },
    { id: 111, name: 'Оператор' },
    { id: 112, name: 'Плейбэк' },
    { id: 113, name: 'Оператор стедикам' },
    { id: 114, name: 'Механик камеры' },
    { id: 115, name: 'Ассистент оператора' },
    { id: 116, name: 'Q-take оператор' },
    { id: 117, name: '1-й ассистент оператора' },
    { id: 118, name: 'Оператор дрона' },
    { id: 119, name: 'DIT' },
    { id: 120, name: 'Оператор комбинированных съемок' },
    { id: 121, name: 'Оператор воздушных съемок' },
    { id: 122, name: 'Директор съемочной группы' },
    { id: 123, name: 'Создатель субтитров' },
    { id: 124, name: 'Скрипт-доктор' }
]

export default function Multiselect({ profile, setProfile }) {
  const [query, setQuery] = useState('')

  let selectedPeople = Array.isArray(profile.specialties) ? profile.specialties : [];

  const removeItem = (id) => setProfile(prev => ({
    ...prev,
    specialties: prev.specialties.filter((person) => person.id !== id)
  }))

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox multiple value={selectedPeople} onChange={(specialties) => setProfile(prev => ({ ...prev, specialties }))} onClose={() => setQuery('')}>
      {selectedPeople.length > 0 && (
        <ul className="horizontal-list">
          {selectedPeople.map((person) => (
            <li className="list-item" key={person.id}>
                <button className="cross-button" onClick={()=>removeItem(person.id)}>✖</button>
                {person.name}
            </li>
          ))}
        </ul>
      )}
      <ComboboxInput className='specialty-input' aria-label="Assignees" onChange={(event) => setQuery(event.target.value)} />
      <ComboboxOptions anchor="bottom start" className="specialty border empty:invisible">
        {filteredPeople.map((person) => (
          <ComboboxOption key={person.id} value={person} className="data-[focus]:bg-blue-100">
            {person.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
}
