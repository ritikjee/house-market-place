import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {doc,setDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase.config'
// import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import keyboardArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../Components/OAuth'
function SignUp() {
  const auth =getAuth()
  const[showpassword,setShowPassword]= useState(false);
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:''
  })
  
  const navigate = useNavigate()

  const{name,email, password}=formData
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit=async(e)=>{
    e.preventDefault()

    try{
      const userCredential= await createUserWithEmailAndPassword(auth,email,password)

      const user = userCredential.user

      updateProfile(auth.currentUser,{
        displayName:name,
      })
      const formDataCopy={...formData}
      delete formDataCopy.password;
      formDataCopy.timestamp=serverTimestamp()
      await setDoc(doc(db,'users',user.uid),formDataCopy)
      navigate('/')
    }
    catch(error){
      toast.error("Somethng went bad with registration")
    }
    
  }
  return (
    <>
    <div className="pageContainer">'
    <header>
          <p className='pageHeader'>Welcome New User</p>
        </header>
    <form onSubmit={onSubmit}>
    <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />
    <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <input
              type={showpassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
    </div>
    <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>
          <div className='signInBar'>
            <p className='signInText'>Sign Up</p>
            <button className='signInButton'>
              {/* <ArrowRightIcon fill='#ffffff' width='34px' height='34px' /> */}
              <img className='rightIcon' src={keyboardArrowRightIcon} alt='GO' />
            </button>
          </div>
        </form>
        <OAuth/>
        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
    </div>
    
    </>
  )
}

export default SignUp
 