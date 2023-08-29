import { useRef, useState } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import { updateDoc,doc } from "firebase/firestore"
import { Link,useNavigate } from "react-router-dom"
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
function Profile() {
  const auth= getAuth()
  const navigate = useNavigate()
  
  const[changeDetails,setChangeDetails]=useState(false)
  const [formData,setformData]= useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email,
  })
  const {name,email} =formData

  const logout=()=>{
    auth.signOut()
    navigate('/')
  }

  const onSubmit=async ()=>{
    try {
      if(auth.currentUser.displayName!==name){
        await updateProfile(auth.currentUser,{
          displayName:name
        })

        const userRef=doc(db,'users',auth.currentUser.uid)
        await updateDoc(userRef,{
          name
        })
      }
    } catch (error) {
      toast.error('Could not update profile details')
    }
  }
  const onChange=(e)=>{
    setformData((prev)=> ({...prev,[e.target.id]: e.target.value}))
  }
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
          <button className="logOut" type ='button' onClick={logout}>Logout</button>
          </header>
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Rersonal Details</p>
            <p className="changePersonalDetails" onClick={()=>{
              changeDetails && onSubmit()
              setChangeDetails((prevState)=>!prevState)
            }}>
              {changeDetails? 'done' : 'change'}
            </p>
          </div>
          <div className="profileCard">
            <form>
              <input type="text" id="name" className={!changeDetails?'profileName':'profileNameActive'} disabled={!changeDetails} value={name} onChange={onChange}/>
              <input type="text" id="email" className={!changeDetails?'profileEmail':'profileEmailActive'} disabled={!changeDetails} value={email} onChange={onChange}/>
            </form>
          </div>
          <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>
        </main>
      
    </div>
  )
  
}

export default Profile
