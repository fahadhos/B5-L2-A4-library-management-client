 
 
import {   useGetBookQuery } from "../../api/baseApi";
import { BiDetail } from "react-icons/bi"; 
 import { useParams } from "react-router";
import Loading from "../layout/Loading";

const DetailsBook = ( ) => {
 
const { id } = useParams();
const { data, isLoading } = useGetBookQuery(id);
   

 if (isLoading) {
        return <div className="text-center text-2xl font-bold"><Loading></Loading></div>
    }

// console.log("data", data);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="p-4 pb-2 text-xl font-extrabold opacity-90 tracking-wide">Details of Book </h1>
           <ul className="list bg-base-100 lg:text-3xl rounded-box shadow-md">
  
  <li className="p-4 pb-2 text-xl font-extrabold opacity-90 tracking-wide"> Book Name: {data?.data?.title}</li>
  
  <li className="list-row">
    <div> <BiDetail></BiDetail></div>
    <div className="space-y-3">
      <div className="text-xs font-semibold">Author:  {data?.data.author}</div>
      <div className="text-xs   font-semibold opacity-100">ISBN no. {data?.data.isbn}</div>
      <div className="text-xs uppercase font-semibold opacity-100">Genre. {data?.data.genre}</div>
     <div className="text-xs   font-semibold opacity-100">Total Copies. {data?.data.copies} </div>
     <div className="text-xs flex text-center justify-left    font-semibold opacity-100">
        <span className="mt-2 mr-3">Status    </span> 
         {data?.data?.availabe===true ?   
(<p className=" text-center p-2 rounded-4xl bg-[#D1FAE5] text-[#065F46] w-20">Available</p>
):(<p className=" text-center p-2 rounded-4xl bg-[#FFE4E6] text-[#9F1239]">Unavailable</p>
  )     }   </div>
    </div>
 
    <p className="list-col-wrap font-semibold text-sm">
       Description about the book: {data?.data.description}
         </p>
  
  </li>
  
  
  </ul>
        </div>
    );
};

export default DetailsBook;