 
import { useEffect } from "react";
import {  useUpdateBookMutation } from "../../api/baseApi";
import { useForm } from "react-hook-form";
 import Swal from "sweetalert2";
const UpdateBookModal = ( {book}:any ) => {


// console.log('id',book?._id   ); 

        const { register, handleSubmit,reset}= useForm()


useEffect(() => {
  if (book) {
    reset(book); // pre-fill all fields at once
  }
}, [book, reset]);
        const [updateBook,{data,isSuccess,isError}]=useUpdateBookMutation()


        
        useEffect(()=>{
            if(isSuccess){
                Swal.fire({
                    title: 'Success!',
                    text: `${data?.message}`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
                const modal = document.getElementById("my_modal_5") as HTMLDialogElement | null;
                modal?.close();
                //  navigate('/books')
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
        
         const handleClose = () => {
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement | null;
    if (modal) {
      modal.close();     
      reset(); 
    }}

    // const [getBook]=useGetBookMutation()
    return (
        <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
         
          <h3 className="font-bold text-lg">Edit this Book  <button onClick={()=>handleClose()}  className="btn">Close</button></h3>

               <div className="modal-action justify-center ">
            {/* <form method="dialog"> */}
                   <form  method="dialog" onSubmit={handleSubmit(async(data)=>
{
    // const editBookData = {
    //     ...data 
    // }
     
    // console.log("editBookData",data);
     const id=  book?._id;
       await updateBook({ id, data});
   
    // console.log("inside submit",res );
    // console.log(book._id,JSON.stringify(editBookData));
    // const res =await createBook(bookData);
   
    // console.log("inside submit",res );
})}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  
  <label className="label">Title</label>
  <input type="text" {...register("title")} className="input" placeholder="Title" defaultValue={book?.title}  /> 

  <label className="label">Author</label>
  <input type="text" {...register("author")} className="input" placeholder="Author name"  defaultValue={book?.author}  />

  <label className="label">Genre</label>
  <select defaultValue={book?.genre} {...register("genre" )} className="select"   >
  <option disabled={true} >Select a genre</option>
  <option>FICTION</option>
  <option>NON_FICTION</option>
  <option>SCIENCE</option>
  <option>HISTORY</option>
  <option>BIOGRAPHY</option>
  <option>FANTASY</option>
</select>
  <label className="label">ISBN</label>
  <input type="number"  {...register("isbn")}  className="input" placeholder="ISBN number" defaultValue={book?.isbn}  required />
  <label className="label">Description</label>
  <input type="text" {...register("description")}  className="input" placeholder="Description" defaultValue={book?.description}  />
  <label className="label">Copies</label>
  <input type="number" {...register("copies")} className="input" placeholder="Copies" defaultValue={book?.copies}  />
  <label className="label">Available</label><input
  type="checkbox"
    {...register("available")}
 id="toggle"
 
  className="toggle border-black bg-[#989ce8] checked:border-[#636AE8] checked:bg-[#636AE8] checked:text-white"
/>
</fieldset>
<input className="btn bg-[#636AE8] text-white mt-2 mx-auto justify-center flex items-center text-center place-content-center" type="submit" value="Update Book" />
    </form>
            
          </div>
        </div>
      </dialog> 
        </>
    );
};

export default UpdateBookModal;