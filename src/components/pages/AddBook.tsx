import { useEffect } from 'react';
import { useCreateBookMutation }  from '../../api/baseApi'; 
import { useForm } from "react-hook-form";

 import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
const AddBook = () => {



    const { register, handleSubmit, formState:{errors}}= useForm()
 
const [ createBook, {data,isLoading,isError,isSuccess}]= useCreateBookMutation()
const navigate = useNavigate()
//  console.log(isSuccess);
useEffect(()=>{
    if(isSuccess){
        Swal.fire({
            title: 'Success!',
            text: `${data?.message}`,
            icon: 'success',
            confirmButtonText: 'OK'
          })
         navigate('/books')
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
    const bookData = {
        ...data 
    }
     await createBook(bookData);
    // const res =await createBook(bookData);
   
    // console.log("inside submit",res );
})}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Add New Book</legend>

  <label className="label">Title</label>
  <input type="text" {...register("title", {required:true}) } className="input" placeholder="Title" />
{errors.title && <span className='text-red-600'>Title is required</span>}
  <label className="label">Author</label>
  <input type="text" {...register("author", {required:true})} className="input" placeholder="Author name" />
{errors.author && <span className='text-red-600'>Author name is required</span>}
  <label className="label">Genre</label>
  <select defaultValue="Pick a color" {...register("genre")} className="select">
  <option disabled={true} >Select a genre</option>
  <option>FICTION</option>
  <option>NON_FICTION</option>
  <option>SCIENCE</option>
  <option>HISTORY</option>
  <option>BIOGRAPHY</option>
  <option>FANTASY</option>
</select> 
{errors.genre && <span className='text-red-600'>Genre is required</span>} 

<label className="label">ISBN</label>
  <input type="number"  {...register("isbn", {required:true})}  className="input" placeholder="ISBN number" />
  {errors.isbn && <span className='text-red-600'>ISBN number is required</span>}
  
  <label className="label">Description</label>
  <input type="text" {...register("description", {required:true})}  className="input" placeholder="Description" />
  {errors.description && <span className='text-red-600'>Description is required</span>}
  
  <label className="label">Copies</label>
  <input type="number" {...register("copies", {required:true})} className="input" placeholder="Copies" />
  {errors.copies && <span className='text-red-600'>Copies is required</span>}
 
  <label className="label">Available</label>
  <input
  type="checkbox"
    {...register("available", {required:true})}
 id="toggle"
  className="toggle border-black bg-[#989ce8] checked:border-[#636AE8] checked:bg-[#636AE8] checked:text-white"
/>
{errors.available && <span className='text-red-600'>Set Status is required</span>}
</fieldset>
<input className="btn text-white font-bold flex justify-center bg-[#636AE8]" type="submit" value={isLoading?"Submitting": "Submit"} />
</form>
 
        </div>
    );
};

export default AddBook;