import { useNavigate } from "react-router-dom"
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
import { useAuth } from "../hooks";
import { useEffect } from "react";

export const Signup = () => {
    const navigate = useNavigate();
    const { isLoggedIn} = useAuth()
    if (isLoggedIn) {
        useEffect(()=>{
            navigate("/blogs")
        },[])
    } else {
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>                                                                                           
            <Auth type="signup" />
        </div>
        <div className="hidden lg:block">
            <Quote />
        </div>
    </div>
    }
}