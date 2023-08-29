import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore'
import ForgotPassword from './pages/ForgotPassword'
import Offers from './pages/Offers'
import Category from './pages/Category';
import Profile from "./pages/Profile";
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NavBar from './Components/NavBar'
import PrivateRouter from './Components/PrivateRouter';
import CreateListings from './pages/CreateListings'
import ListingPage from './pages/ListingPage';
import Contact from './pages/Contact';


function App() {
  

  return (
    <>
    <Router>
    <Routes>
    <Route path='/' element={<Explore/>}/>
    <Route path='/offers' element={<Offers/>}/>
    <Route path='/category/:categoryName' element={<Category/>}/>
    <Route path='/profile' element={<PrivateRouter/>}>
      <Route path='/profile' element={<Profile/> }/></Route>
    <Route path='/create-listing' element={<CreateListings/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/category/:categoryName/:listingId' element={<ListingPage/>}/>
    <Route path='/contact/:landlordId' element={<Contact/>}/>
    </Routes>
    <NavBar/>
    </Router>
    <ToastContainer/>
    </>
  )
}

export default App
