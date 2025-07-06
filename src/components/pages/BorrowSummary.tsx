import { useGetBorrowSummaryQuery } from "../../api/baseApi";

import Loading from '../layout/Loading';

const BorrowSummary = () => {


const {data, isLoading} = useGetBorrowSummaryQuery(undefined);
 
if(isLoading){
    return <div className='text-center text-2xl font-bold'><Loading></Loading>
  </div>
}

// console.log(data.data.map(borrow=>(console.log(borrow.book))));
    return (
        <div className="flex  justify-center min-h-screen">
           
           <section className='mt-8'>
               <div className="overflow-x-auto">
                   <h2 className='font-semibold mb-2'>Borrow Summary</h2>
           
             <table className="table table-xs ">
               <thead >
                 <tr>
                   <th></th>
                   <th>Title</th>
                  
                   <th >ISBN</th>
                   <th  className='text-center'>Total Quantity Borrowed</th>
                
                   </tr>
               </thead>
               <tbody>
                
                
              {
               !isLoading && data?.data?.map((borrow:any)=>(
            <tr>
                   <th>  </th>
                   <td>{borrow?.book.title}</td>
 
                   <td>{borrow?.book?.isbn}</td>
                   <td className='text-center'>{borrow?.totalQuantity}</td>
                    
                 
                 </tr>
           
               ))}   
             
               </tbody>
              
             </table>
           </div>
           </section>
        </div>
    );
};

export default BorrowSummary;