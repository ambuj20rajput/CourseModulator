import Navbar from './Components/Navbar' ; 
import Cards from './Components/Cards' ;
import Filter from './Components/Filters' ; 
import Spinner from './Components/Spinner';
import { apiUrl,filterData } from './data';

import {toast} from 'react-toastify' ;
import './App.css';
import { useEffect, useState } from 'react';


function App() {
 
  const [courses,setCourses] = useState([]) ; 
  const [loading,setLoading] = useState(true) ;

  const [category, setCategory] = useState(filterData[0].title);


  const fetchData = async() => {
    setLoading(true) ;
    try
    {
      let res = await fetch(apiUrl) ;
      let output = await res.json(); 
      console.log(output.data);
      setCourses(output.data) ;
    }
    catch(error)
    {
      toast.error("Something Went Wrong !") ;
    }
    setLoading(false) ; 
  }

  useEffect(() =>{
    fetchData() ;
  },[])


  return (
    <div className='min-h-screen flex flex-col bg-blue-300'>
       <div className='bg-blue-950 py-4'> <Navbar/> </div>
 

       <div> <Filter filterData={filterData} category={category} setCategory={setCategory} /> </div>

       <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {
            loading ? <Spinner/> : <Cards courses={courses} category={category} />
          }
       </div>      
    </div>
  );
}

export default App;
