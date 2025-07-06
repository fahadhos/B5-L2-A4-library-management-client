
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({baseUrl:  import.meta.env.MODE === "development"
        ? "http://localhost:5000/api"
        : "https://library-management-app-with-mongoos.vercel.app/api",
}),
   tagTypes:["books"],
    endpoints:(builder)=>({
   
   getAllBooks: builder.query ({
      query: () => "/books",
      providesTags:["books"],
    }),
    // getBookById: builder.query ({
    //   query: (bookId,bookData) => ({
    //     url:`/books/${bookId}`,
    // method:"GET",
    // body:bookData
    // })
    // }),
  createBook: builder.mutation ({
      query: (bookData) =>({ url:"/books",
method:"POST",
body:bookData, }),
      invalidatesTags:["books"],
    }),
borrowBook: builder.mutation ({
      query: (borrowData) =>({
         url:"/borrow",
method:"POST",
body:borrowData, }),
      // invalidatesTags:["books"],
    }),
getBorrowSummary:builder.query({
    query:()=> '/borrow',
}),


 deleteBook: builder.mutation({
    query: (id)=>({
url:`/books/${id}`,
method:"DELETE",
    })
 }),

   updateBook: builder.mutation ({
        query:({id,data}) =>({
  //  url:`/books/${6869146a911bd78962b995a8}`,
   url:`/books/${id}`,
method:"PUT",
body:data, 
}),
  invalidatesTags:["books"],
         }),
   
  getBook: builder.query ({
      query: (id) =>({
    url:`/books/${id}`,
      
       }),
  
    }),


})
})


export const { useGetAllBooksQuery, useCreateBookMutation, useGetBorrowSummaryQuery, useDeleteBookMutation, useUpdateBookMutation, useGetBookQuery, useBorrowBookMutation}= baseApi;