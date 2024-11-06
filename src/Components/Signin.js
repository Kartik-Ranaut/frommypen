import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Signin() {
  const [loading,setloading]=useState(false);
  const navigate=useNavigate();

  const signinhandler=async()=>{
        
    setloading(true);
   
    const datareq={
        "email":data.email,
        "password":data.password,
        "name":data.name
    }
    try{
        const response= await fetch('https://blog-app-api-804s.onrender.com/api/signup',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datareq),
        })
        const res=await response.json();
        console.log(res);
        if(res.success){
       
            console.log("signin successful");
           
            setloading(false);
            toast.success("signin Successfull");
            navigate("/frommypen");
        }
        else{

            console.log("signin failed");
            setloading(false);
            toast.error("failed to signin");
        }
        

    } catch(error){
        console.log("failed to signin");
        console.log(error);
        setloading(false);
        toast.error("server error occured");
    }
}


  const [data, setData] = useState({ email: "", password: "",name:"" });
  const handleChange = ({ currentTarget: input }) => {
  setData({ ...data, [input.name]: input.value });
      console.log(input.value)
};
  return (
    <div className='login'>
      <h1 className='text-xl'>Signin form</h1>
            <div className='Input'>
                <label for="name" className='Input-label'>Name</label>
                <input type="text"  name="name" className='Input-text' id="name" placeholder='e.g. Gajpati Singh' onChange={handleChange}></input>
                <label for="email" className='Input-label'>Email</label>
                <input type="text"  name="email" className='Input-text' id="email" placeholder='e.g. abc@google.com ' onChange={handleChange}></input>
                <label for="pwd" className='Input-label'>Password</label>
                <input type="password"  name="password" className='Input-text' id="pwd" placeholder='enter a strong password' onChange={handleChange}></input>
            </div>
            <button className="button-5" onClick={signinhandler}>Sign In</button>
    </div>
  )
}
