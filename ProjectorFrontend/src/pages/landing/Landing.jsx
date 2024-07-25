import { useState } from 'react'
import './Landing.module.scss'
import.meta.env.VITE_SUPABASE_KEY

function Landing() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>
        <img src="/projector.svg" alt="" className="big-header" />
        <div className="landing-cmps">
        <img src="/cloudFrame.svg" alt="" className="cloud" />
        <img src="/circlesComponent.svg" alt="" className="circles" />
        <p className="cloud-text">Камера, мотор… ПРОЖЕКТОР!<br/>Найди подходящего специалиста сейчас!</p>
        </div>
      </div>
    </>
  )
}

export default Landing
