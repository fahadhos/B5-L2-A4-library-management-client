 
import { BiBookAlt, BiSolidEdit } from 'react-icons/bi';
import { LuBookOpenCheck } from 'react-icons/lu';
import { ImBooks } from 'react-icons/im';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Loading from '../layout/Loading';
import  {useGetAllBooksQuery,useDeleteBookMutation }  from '../../api/baseApi'; 
 import Swal from 'sweetalert2'; 
import UpdateBookModal from './UpdateBookModal'; 
import { BiSolidBookReader } from "react-icons/bi";
 
import { Link } from 'react-router';
 
const Home = () => {

    
 
  interface IBook {
    _id:string,
    title:string
    author:string
     genre:'FICTION'|'NON_FICTION'|'SCIENCE'|
     'HISTORY'| 'BIOGRAPHY'| 'FANTASY',
     isbn:string
     description:string
     copies:number 
     available:boolean
     updateAvailability():void 
}



    const {data, isLoading} = useGetAllBooksQuery(undefined,{
        pollingInterval: 3000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });


  
// console.log({data, isLoading, isError});
// console.log((data?.data?.map(book => book.copies || 0)).reduce((acc, curr) => acc + curr, 0));
const distinctgenres = new Set(data?.data?.map( (book:IBook) => book?.genre)).size;
 

// const {data:getBookById }= useGetBookByIdQuery({})
//  console.log({getBookById});



const [deleteBook]= useDeleteBookMutation()

const handleDelete= (id:string)=>{
    Swal.fire({
  title: "Are you sure to delete this book?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    deleteBook(id);
  }
});
    // console.log("delete", deleteBook(id));
}


// const [selectedBook, setSelectedBook] = useState<IBook | undefined>(undefined); 
 
 
 
if(isLoading){
    return <div className='text-center text-2xl font-bold'><Loading></Loading>  </div>

}
if (!data || !data.data) {
 return <div className='text-center text-2xl font-bold'><Loading></Loading>  </div>

}

return (
        <>    
<div>
    <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold">Library Overview</h1>
         </div>

    <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
  <div className="stat  ">
    <div className="stat-title flex  place-items-center text-sm">Total Books <BiBookAlt className='justify-end flex ml-10 '/> </div>
    <div className="stat-value text-2xl">{data?.data?.length}</div>
    <div className="stat-desc">All books in the collection</div>
  </div>

  <div className="stat">
    <div className="stat-title flex  place-items-center text-sm">Distinct Genres <ImBooks className='justify-end flex ml-10 '/> </div>
    <div className="stat-value text-2xl">{ distinctgenres}</div>
    <div className="stat-desc">Variety of book genres</div>
  </div>

  <div className="stat">
   <div className="stat-title flex  place-items-center text-sm">Available Copies<LuBookOpenCheck className='justify-end flex ml-10 '/> </div>

    <div className="stat-value text-2xl">
        {
    data?.data
      ? data.data.map((book: IBook) => book?.copies || 0)?.reduce((acc: number, curr: number) => acc + curr, 0)
      : 0
  }
      {/* { (data?.data?.map((book:IBook) => book?.copies   || 0)).reduce((acc: number, curr: number) => acc + curr, 0)}  */}
      
      </div> 
    <div className="stat-desc">Copies ready for borrowing</div>
   </div>
</div>
</div>


<section className='mt-8'>
    <div className="overflow-x-auto">
        <h2 className='font-semibold mb-2'>Book Catalog</h2>

  <table className="table table-xs">
    <thead >
      <tr>
        <th></th>
        <th>Title</th>
        <th>Author</th>
        <th>Genre</th>
        <th >ISBN</th>
        <th  className='text-center'>Total Copies</th>
        {/* <th className='text-center'>Available</th> */}
        <th>Availability</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
     
     
   {
    !isLoading && data.data.map((book: IBook)=>(
 <tr>
        <th>  </th>
        <td>{book?.title}</td>
        <td>{book?.author}</td>
        <td>{book?.genre}</td>
        <td>{book?.isbn}</td>
        <td className='text-center'>{book?.copies}</td>
        {/* <td className='text-center'>0</td> */}
        <td className='text-center'>
         {book?.available ?   
<p className=" text-center p-2 rounded-4xl bg-[#D1FAE5] text-[#065F46]">Available</p>
:<p className=" text-center p-2 rounded-4xl bg-[#FFE4E6] text-[#9F1239]">Unavailable</p>
          }
       </td>

        <td> 
           {/* <Link to={`/edit-book/${book._id}`}> */}
   
      <div className='tool-tip tooltip tooltip-bottom' data-tip="edit">
   
 <button className="btn" onClick={() => {
  // setSelectedBook(book) 
  (document.getElementById('my_modal_5') as HTMLDialogElement | null)?.showModal();
}}>  <BiSolidEdit />
    </button>

 <UpdateBookModal   book={book} ></UpdateBookModal>
       </div>  
      {/* </Link> */}


       <div className='tool-tip tooltip tooltip-bottom' data-tip="delete">
      
       <button onClick={()=> handleDelete(book._id)} className='btn '> <RiDeleteBin2Line  /> </button>
     </div>
     
  
    <Link to={`/books/${book?._id}`}>
       <div className='tool-tip tooltip tooltip-bottom' data-tip="details of book">
         <button  className='btn '><LuBookOpenCheck  />
    
            </button>
         
     </div>
       </Link>
     <Link to={`/borrow/${book?._id}`}>
       <div className='tool-tip tooltip tooltip-bottom' data-tip="Borrow this book">
        <button  className='btn '><BiSolidBookReader />
    
            </button>
          
     </div>
      </Link>
     </td>
      </tr>

    ))}   
  
    </tbody>
   
  </table>
</div>
</section>


        </>
    );
}

export default Home;