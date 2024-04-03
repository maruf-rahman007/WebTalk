import { ChangeEvent, ChangeEventHandler, EventHandler, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SigninInput, SignupInput } from "@maruf.rahman/mediuminput"
import axios from "axios"
import { BACKEND_URL } from "../config"
export const Auth = ({type}:{type:"signin"|"signup"}) => {
    const [postInput,setPostInput] = useState<SignupInput>({
        username:"",
        email:"",
        password:""
    })
    const navigate = useNavigate();

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInput)
            const jwt = response.data.token;
            localStorage.setItem("token",jwt);
            navigate("/blogs")
        } catch (error) {
            alert("Eroor Happend while signin")
        }
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Crete an account
                    </div>
                    <div className="text-slate-500">
                        {type === "signin"?"Don't have an account":"Already have an account?"}
                        <Link className="pl-2 underline" to={type==="signin"?'/signup':'/signin'}>{type==="signin"?"Signup":"Login"}</Link>
                    </div>
                </div>
                <div className="pt-8">
                    { type==="signup"?<LabelledInput label="Username" placeholder="Maruf" onChange={(e)=>{
                        setPostInput(c=>({
                            ...c,
                            username:e.target.value
                        }))
                    }} /> :null}
                    <LabelledInput label="Email" placeholder="maruf@gmail.com" onChange={(e)=>{
                        setPostInput(c=>({
                            ...c,
                            email:e.target.value
                        }))
                    }} />
                    <LabelledInput label="Password" type="password" placeholder="@tangoMike12" onChange={(e)=>{
                        setPostInput(c=>({
                            ...c,
                            password:e.target.value
                        }))
                    }} />
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"?"Sign Up":"Sign In"}</button>

                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputTypes {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?:string;
}
function LabelledInput({ label, placeholder, onChange,type }: LabelledInputTypes) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type ||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
}