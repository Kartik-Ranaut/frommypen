import React,{useState} from 'react'
import { CookiesProvider, useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
    const [loading,setloading]=useState(false);
    const navigate=useNavigate();
    const [cookies, setCookie] = useCookies(['user'])
    const loginhandler=async()=>{
        
        setloading(true);
       
        const datareq={
            "email":data.email,
            "password":data.password,
        }
        try{
            const response= await fetch('https://blog-app-api-804s.onrender.com/api/login',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datareq),
            })
            const res=await response.json();
            console.log(res);
            if(res.success){
                props.setlogedin(true)
                console.log("login successful");
                setCookie('token', res.token,3*20*1000)
                setloading(false);
                toast.success("Login Successfull");
                navigate("/");
            }
            else{

                console.log("login failed");
                setloading(false);
                toast.error("wrong credentials");
            }
            

        } catch(error){
            console.log("login failed");
            console.log(error);
            setloading(false);
            toast.error("server error occured");
        }
    }
    const [data, setData] = useState({ email: "", password: "" });
    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
        console.log(input.value)
	};
  return (
    <div className='login'>
            <h1 className='text-xl'>Login form</h1>
            <div className='Input'>
                <label for="email" className='Input-label'>Email</label>
                <input type="text"  name="email" className='Input-text' id="email" placeholder='e.g. abc@google.com ' onChange={handleChange}></input>
                <label for="pwd" className='Input-label'>Password</label>
                <input type="password"  name="password" className='Input-text' id="pwd" placeholder='enter a strong password' onChange={handleChange}></input>
            </div>
            <button className="button-5" onClick={loginhandler}>Login</button>
    

    </div>
  )
}
