import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import Spinner from "./components/Spinner";
import {apiUrl, filterData } from "./data.js";
import { toast } from "react-toastify"
function App () {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  useEffect(()=>{
    const fetchData= async() =>{
      setLoading(true)
      try{
         const res= await fetch(apiUrl);
         const output= await res.json();
         setCourses(output.data);
         //console.log(data);
      }
      catch(error){
        toast.error("Something Went Wrong");
      }
      setLoading(false)
    }
    fetchData();
  },[])
  return (
   <div className="flex flex-col ">
      <Navbar />
      <div  className="bg-bgDark2 min-h-screen">
      <Filter 
      filterData={filterData} category={category} setCategory={setCategory}/>
      <div className="w-11/12 max-w-[1200px]  mx-auto flex flex-wrap items-center justify-center">
       { loading? <Spinner/> :  <Cards courses={courses} category={category}/>}
      </div>
      </div>
     
   </div>);
}

export default App;
