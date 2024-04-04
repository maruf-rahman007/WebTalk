import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks"
import { useEffect } from "react";


export const Home = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate()
    if(!isLoggedIn){
        useEffect(()=>{
            navigate('/signup'); 
        },[])
    } else {
        useEffect(()=>{
            navigate('/blogs')
        },[])
    }
    return <div>
        
    </div>
}