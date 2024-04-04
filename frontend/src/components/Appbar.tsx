import { useAuth } from "../hooks"
import { Avater } from "./BlogCard"
import { Link, useNavigate } from "react-router-dom"

export const Appbar = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex justify-center flex-col font-bold cursor-pointer">
            WebTalk
        </Link>
        <div>
        <Link to={'/publish'}>
            <button type="button" className="cursor-pointer mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
        </Link>
        {isLoggedIn == true?
        <button onClick={()=>{
            setIsLoggedIn(false);
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedin");
            navigate('/signin');
        }} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
        :null}
            <Avater size={"big"} name="maruf"/>
        </div>
    </div>
}