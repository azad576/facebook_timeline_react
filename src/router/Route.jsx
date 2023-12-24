import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Add from "../pages/Add.jsx/Add";

const router=createBrowserRouter([
{

    path:'/',
    element:<Home/>,
   

},
{
    path:'/create',
    element:<Add/>
}

])

export default router