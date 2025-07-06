import { createBrowserRouter } from "react-router";
import Home from "../components/pages/Home";
import AddBook from "../components/pages/AddBook";
import App from "../App";
 
import BorrowSummary from "../components/pages/BorrowSummary";
import DetailsBook from "../components/pages/DetailsBook";
import BorrowBook from "../components/pages/BorrowBook";


const router = createBrowserRouter([



    {

        path:"/",
        Component: App,

        children:[

            {
                index: true,
                Component: Home,
            },
            {
                path:"books",
                Component:Home,
            },
            {
                path:"books/:id",
               
                   Component:DetailsBook,
            },
            {path:"create-book",
                Component:AddBook,
            }
            ,
            {path:"/borrow/:bookId",
                Component:BorrowBook,
            }
            ,
            {path:"borrow-summary",
                Component:BorrowSummary,
            }
        ]
    }
])

export default router;