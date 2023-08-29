import {useNavigate,useLocation} from 'react-router-dom'
// import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'

function NavBar() {
    const navigate =  useNavigate()
    const location =  useLocation()
    const pathMatchRoute=(route)=>{
        if(route===location.pathname) return true}
  return (
    <div>
     {/* <OfferIcon/> */}
     <footer className='navbar'>
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItems" onClick={()=>navigate('/')}>
                    <p className={
                pathMatchRoute('/')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }>Explore</p>
                </li>
                <li className="navbarListItems" onClick={()=>navigate('/offers')}>
                    <p className={
                pathMatchRoute('/offers')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }>Offer</p>
                </li>
                <li className="navbarListItems" onClick={()=>navigate('/profile')}>
                    <p className={
                pathMatchRoute('/profile')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }> Profile</p>
                </li>
            </ul>
        </nav>
     </footer>
     
    </div>
  )
}

export default NavBar
