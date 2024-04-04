import nlwUniteIcon from '../assets/Frame 7108.svg'
import { NavLink } from './nav-lin'


export function Header(){
  return(
    <div className='flex items-center gap-5'>
      <img src={nlwUniteIcon}/>
      <nav className='flex items-center gap-5'>
        <NavLink href="/Enventos">Eventos</NavLink>
        <NavLink href="/Participantes">Participantes</NavLink>
      </nav>
    </div>
  )

}