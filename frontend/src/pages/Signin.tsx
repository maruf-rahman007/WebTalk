import { useNavigate } from "react-router-dom"
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
import { useAuth } from "../hooks"
import { useEffect } from "react"

export const Signin = () => {
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()
    if (isLoggedIn) {
        useEffect(()=>{
            navigate("/blogs")
        },[])
        console.log("en")
    }else {
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type="signin" />
        </div>
        <div className="hidden lg:block">
            <Quote />
        </div>
    </div>
    }
}