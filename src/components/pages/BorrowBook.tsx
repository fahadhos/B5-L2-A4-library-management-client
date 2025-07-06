 import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
 import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useBorrowBookMutation } from "../../api/baseApi";
const BorrowBook = () => {
   
       const { register, handleSubmit, formState:{errors}}= useForm()
    


       const bookId= useParams().bookId
         console.log("bookId", bookId);  
   const [borrowBook, {data,isLoading,isError,isSuccess}]= useBorrowBookMutation()
   const navigate = useNavigate()
    
   useEffect(()=>{
       if(isSuccess){
           Swal.fire({
               title: 'Success!',
               text: `${data?.message}`,
               icon: 'success',
               confirmButtonText: 'OK'
             })
            navigate('/')
       }
       if(isError){
           Swal.fire({
               title: 'Error!',
               text: `Validation failed`,
               icon: 'error',
               confirmButtonText: 'OK'
             })
       }
   }, [isSuccess, isError]);
   
    
   // console.log("Data:", data);
       return (
           <div className="flex flex-col items-center justify-center min-h-screen">
          
         <form onSubmit={handleSubmit(async(data)=>
   {
       const borrowData = {
           ...data 
       }
    //    const res =await borrowBook(borrowData);
       await borrowBook(borrowData);
      
    //    console.log("inside submit",res );
   })}>
             <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
     <legend className="fieldset-legend">Borrow Book</legend>
   
     <label className="label">Book ID</label>
     <input type="text" {...register("book", {required:true})} className="input" placeholder="Borrow book Id" defaultValue={bookId} />
     <label className="label">quantity</label>
     <input type="number" {...register("quantity", {required:true})} className="input" placeholder="Quantity of book" />
   {errors.quantity && <span className='text-red-600'>Quantity is required</span>}
   
     <label className="label">Due Date</label>
      <input type="datetime-local"{...register("dueDate", {required:true})} className="input" placeholder="Select Due Date"/>
 {errors.dueDate && <span className='text-red-600'>Due Date is required</span>}
   </fieldset>
   <input className="btn bg-[#636AE8]" type="submit" value={isLoading?"borrowing book now": "Borrow this book"} />
   </form>
    
           </div>
       );
   };

export default BorrowBook;