import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>
        <div className="header">
          <ul className="nav-bar">
            <li className="nav-link">О НАС</li>
            <li className="nav-link">ПОЛЬЗОВАТЕЛЯМ</li>
            <li className="nav-link">ПАРТНЕРАМ</li>
            <li className="nav-link">КОНТАКТЫ</li>
            <li className="sign">ВОЙТИ в аккаунт</li>
          </ul>
        </div>
        <img src="../public/projector.svg" alt="" className="big-header" />
        <div className="landing-cmps">
        <img src="../public/cloudFrame.svg" alt="" className="cloud" />
        <img src="../public/circlesComponent.svg" alt="" className="circles" />
        <p className="cloud-text">Камера, мотор… ПРОЖЕКТОР!<br/>Найди подходящего специалиста сейчас!</p>
        </div>
      </div>
    </>
  )
}

export default App
