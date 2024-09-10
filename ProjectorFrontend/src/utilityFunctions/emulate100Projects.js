import {
  qualifications,
  experiences,
  types,
  employmentTypes,
  shifts,
  salaries
} from '../../utilityFunctions/utilityObjects';


const playTitles = [
  "Гамлет",
  "Три сестры",
  "Вишневый сад",
  "Ревизор",
  "Король Лир",
  "Чайка",
  "Фауст",
  "Макбет",
  "Укрощение строптивой",
  "Много шума из ничего",
  "Одинокие",
  "На дне",
  "Антигона",
  "Эдип царь",
  "Буря",
  "Дядя Ваня",
  "Гроза",
  "Гедда Габлер",
  "Человек-подушка",
  "Сон в летнюю ночь"
];

const playDescriptions = [
  "Трагедия о принце Дании, который мстит за убийство своего отца...",
  "Пьеса о трех сестрах, которые мечтают вернуться в Москву из провинции...",
  "История о продаже семейного имения с вишневым садом...",
  "Комедия о том, как чиновники маленького городка принимают за ревизора простого мошенника...",
  "Трагедия о короле, который решает разделить своё королевство между дочерьми...",
  "История о несчастной любви, творческих поисках и разочарованиях...",
  "История о докторе Фаусте, который заключает сделку с дьяволом...",
  "Трагедия о шотландском полководце, который убивает короля и захватывает трон...",
  "Комедия о своенравной женщине и мужчине, который решает её 'укротить'...",
  "Комедия о любви и недоразумениях, в которой две пары сталкиваются с интригами...",
  "Пьеса о людях, чьи жизни наполнены одиночеством и поиском смысла...",
  "История о группе людей, живущих на дне общества, чьи судьбы пересекаются в ночлежке...",
  "Трагедия о борьбе между долгом перед государством и семейными обязанностями...",
  "Трагедия о царе Эдипе, который, не зная, убивает своего отца и женится на матери...",
  "История о маге Просперо, который вызывает бурю, чтобы отомстить своим врагам...",
  "Драма о жизни людей, которые осознают тщетность своих усилий...",
  "Трагедия о женщине по имени Катерина, которая сталкивается с жестокостью общества...",
  "История о женщине, которая борется с ограничениями, наложенными на неё обществом...",
  "Мрачная драма о писателе, чьи пугающие рассказы привлекают внимание властей...",
  "Комедия о любви и волшебстве, где герои оказываются в волшебном лесу..."
];

const promotions = ['a', 'b', 'c', 'z']

const uids = [
  '602d7977-718a-40e8-a78e-995581c482f0',
  '51435c42-de15-4380-8b33-0b105957e1fd',
  '4e18d996-cf01-43bb-a17e-4be0813de3ad',
  '2a2c7e81-989c-483b-9a94-1636546ea721'
  ]

export default function create_100_projects() {
    for (let i = 0; i<100; i++){
      (async() => {
        const random_uid = uids[Math.floor(Math.random() * 4)]

        const {data: profId, error: ePId} = await supabase.rpc('profile_id', { p_user_id: random_uid })

        if (ePId) {
          console.log(ePId)
        } else {
          const { data, error } = await supabase
          .from('Projects')
          .insert([
            {
              name: playTitles[Math.floor(Math.random() * 20)],
              description: playDescriptions[Math.floor(Math.random() * 20)],
              promotion: promotions[Math.floor(Math.random() * 4)],
              type: types[Math.floor(Math.random() * 10)].name,
              user_id: random_uid,
              profile_id: profId,
            },
          ])
          .select('id')

          if (error) {
            console.log(error)
          } else {
            for (let r=0; r<3; r++){const { data: qualData, error: qualError } = await supabase
          .from('project_qualifications')
          .insert([
            {
              project_id: data[0].id,
              qualification_id: qualifications[Math.floor(Math.random() * 123)].id,
              experience: experiences[Math.floor(Math.random() * 4)].name,
              employment: employmentTypes[Math.floor(Math.random() * 3)].name,
              shift: shifts[Math.floor(Math.random() * 4)].name,
              salary: salaries[Math.floor(Math.random() * 4)].name,
            },
          ])
          .select()

          if (qualError) {
            console.log(qualError)
          }}
          }
        }

      })()
    }
  }