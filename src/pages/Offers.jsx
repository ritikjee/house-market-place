import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import {
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    collection,
    
} from 'firebase/firestore'
import ListingItem from "../Components/ListingItem"
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from "../Components/Spinner"
function Offers() {
    const [listings,setListings]= useState(null)
    const [loading,setLoading]= useState(true)
    const params = useParams()

    useEffect(()=>{
                const fetchListings= async ()=>{
                    try {
                        const listingsRef = collection(db, 'listings')

                // Create a query
                const q = query(
                listingsRef,
                where('offer', '==', true),
                orderBy('timestamp', 'desc'),
                limit(10)
                )

                // Execute query
                const querySnap = await getDocs(q)

                // const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                // setLastFetchedListing(lastVisible)

                const listings = []
                querySnap.forEach((doc)=>{
                  return listings.push({
                    id:doc.id,
                    data:doc.data()
                   })
                })
                setListings(listings)
                setLoading(false)
            } catch (error) {
               
                toast.error('Could not fetch listings')

            }
        }
        fetchListings()
    },[])
  return (
   <div className="categorry">
    <header>
      <p className="pageHeader">
        Offers
      </p>
    </header>
    {loading ? (
        <Spinner/>
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
               <ListingItem listing={listing.data} id ={listing.id} key={listing.id}/>
              ))}
            </ul>
          </main>
    </>)
    :(<p>No listings for {params.categoryName}</p>)}
   </div>
  )
}

export default Offers
