import "./App.css";
import {useEffect, useState} from 'react';
import Home from "./Components/Home";
import Blog from "./Components/Blog";
import Latest from "./Components/Latest";
import Contact from "./Components/Contact";
import axios from 'axios';
import Login from "./Components/Login";
import Signin from "./Components/Signin";
import Content from "./Components/Content";
import { Navigate, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink,Link, Routes,Route } from "react-router-dom";

function App() {
  const navigate=useNavigate();
  let chatElement=document.getElementById("chatelement")
  const [inputdata,setinputdata]= useState("");
  const [inputres,setinputres]= useState([{res:"Hello! how can I assist you today?"}]);
  const genbutton=async()=>{
    
    let datainput=inputdata;
    let obj={send:datainput,res:"Loading..."}
    setinputdata("");
    setinputres(inputdataa=>[...inputdataa,obj]);
    let response= await fetch("https://arogyadarshi-backend.onrender.com/api/geminiRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputdata }),
    });
    const data = await response.json();
    console.log(data);
    setinputres(inputress=>inputress.map(item=>
      item.send === datainput ? {...item,res:data.data.candidates[0].content.parts[0].text.replaceAll("*","").replaceAll("#","")} : item
    ));

    chatElement.scrollTop = chatElement.scrollHeight;
  }

  function handleKeyDown(event){
    if (event.key === 'Enter') {
      genbutton();
    }
  }

  const [postdata,setpostdata]=useState([{content:"loading..",title:"loading..",date:"hh"},]);
  const [latestId,setLatestId]=useState();
  const [islogedin,setlogedin]=useState(false);
  const [userdata,setuserdata]=useState();
  const [searchres,setsearchres]=useState([]);
  let newserdata;
  const findsubstr=(event)=>{
    newserdata=[];
    setsearchres([]);
    let substr= event.target.value;
    postdata.forEach((element)=>{
      if(element.title.includes(substr)){

        newserdata.push(element)
        setsearchres(newserdata);
      }
      
    });
    console.log(searchres);
  }
  const test=async()=>{
    try{

      const responsee=await fetch("https://blog-app-api-804s.onrender.com/api/test",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"token":document.cookie.substring(6) }),
      });
      let res=await responsee.json();
   
      console.log(res);
      if(res.success==true){
        setlogedin(true);
        setuserdata(res.data);
      }
      } catch(error){
        console.log(error)
        console.log("the user is not logedin");
        setlogedin(false);
      }
  }
  const [selected,setSelected]=useState(false);
  
  function userbtnhandler(){
    setSelected(!selected);
  }
  const [themeimage,setthemeimage]=useState(<i class="fa-solid fa-moon"></i>);

  
  
  const [theme,setTheme]=useState("lightmode");
  function changetheme(){
    if(theme==="darkmode"){
      setTheme("lightmode");
      setthemeimage(<i class="fa-solid fa-moon"></i>);
    }
    else{
      setTheme("darkmode");
      setthemeimage(<i class="fa-regular fa-sun"></i>);
    }
  }
  useEffect(()=>{
    test();
    
  },[islogedin])

  useEffect(()=>{
    document.body.className=theme;
    
  },[theme])
  return (
    <div>
    <div className="toastpos">

       <ToastContainer position="top-right"
          toastClassName="toast"
          autoClose={500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme==="darkmode"? "dark":"light"}
         
        />
    </div>
    <div className="app">
      <div className="mobileview">
          
          <NavLink className="NavLink" to="/frommypen"> <i class="fa-solid fa-house"></i> <h6>Home</h6> </NavLink>
          
          <NavLink className="NavLink" to="/frommypen/blog"><i class="fa-solid fa-blog"></i> <h6>Blog</h6> </NavLink>
          <NavLink className="NavLink" to={`/frommypen/blog/${latestId}`}><i class="fa-solid fa-bolt"></i> <h6>Latest</h6></NavLink>
          <NavLink className="NavLink" to="/frommypen/contact"><i class="fa-solid fa-address-card"></i> <h6>Contact</h6></NavLink>
      </div>
      <div className="header">
        <div className="weblogo"></div>
        <div className="Links  ">
          <NavLink className="NavLink" to="/frommypen">Home</NavLink>
          
          <NavLink className="NavLink" to="/frommypen/blog">Blog</NavLink>
          <NavLink className="NavLink" to={`/frommypen/blog/${latestId}`}>Latest</NavLink>
          <NavLink className="NavLink" to="/frommypen/contact">Contact</NavLink>
        </div>
        <div className="search">
          <input className="srch" type="text" id="searchinput" placeholder="search" onChange={findsubstr}></input>
          <div className="searchresbox" id="searchbox">
            {
              searchres.length==0 ? <h4>No results found</h4> :
            
            
              searchres.map((element)=>{
                return(<div className="searchelemnt" onClick={()=>{navigate(`/frommypen/blog/${element._id}`); let searchbox=document.getElementById("searchinput"); searchbox.value=""}}>
                  <img src={element.img} className="searchimg"></img>
                  <h4>{element.title.substring(0,50)}</h4>
                </div>)
              })
            }
          </div>
          <button className="themechangebtn" onClick={changetheme}>{themeimage}</button>
          <button className="user" onClick={userbtnhandler}  ><i class="fa-solid fa-user"></i></button>
          { selected? <div className="checklogin">
              {/* login pop up */}
            {islogedin? <div className="logedindet">
                          {/* if user is logedin */}
                          <i class="fa-solid fa-user userlogo" ></i>
                          <h3>{userdata.name}</h3>
                          <a className="emiallnk">{userdata.email}</a>
                          <button className="button-5 btnalso" onClick={()=>{document.cookie="token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;"; setlogedin(false)} }><i class="fa-solid fa-right-from-bracket"></i>Log Out</button>
                         </div> : <div className="btnbox">
                          {/* if user is not logedin */}
                          <button onClick={userbtnhandler} className="simple "><Link to="/frommypen/login" className="button-5 btnalso" >Login</Link></button>
                          <div className="or">
                            <div className="line"></div>
                            <p>or</p>
                            <div className="line"></div>
                          </div>
                          <button onClick={userbtnhandler} className="simple "><Link to="/frommypen/signin" className="button-5 btnalso">Sign In</Link></button>
                        </div>
            }

          </div>:<></>}
        </div>
      </div>
     
          <div className="chatWithAi">
            <h3>Chat with AI</h3>
            <div className="centerans" id="chatelement">
              {
                inputres.map((element)=>{
                  return(<div>
                   {element.send && <p className="send">{element.send}</p>}
                   {element.res && <p className="recieve">{element.res}</p>}
                  </div>)
                })
              }
            </div>
            <div className="inpbtn">
            <input type="text"  onChange={(event)=>{setinputdata(event.target.value)}} value={inputdata} onKeyDown={handleKeyDown} placeholder="type something.."></input>
            <button onClick={genbutton}>Generate</button>
            </div>
            
          </div>

      {/* <div className="container">
        {selectHome && <Home {...dataji}></Home>}
        {selectBlog && <Blog></Blog>}
        {selectLatest && <Latest></Latest>}
        {selectContact && <Contact></Contact>}
        
      </div> */}

      <Routes>
        <Route path="/frommypen" element={<Home setpostdata={setpostdata} setLatestId={setLatestId}></Home>}></Route>
        <Route path="/frommypen/blog" element={<Blog></Blog>}></Route>
        <Route path="/frommypen/latest" element={<Latest></Latest>}></Route>
        <Route path="/frommypen/contact" element={<Contact></Contact>}></Route>
        <Route path="/frommypen/login" element={<Login setlogedin={setlogedin}></Login>}></Route>
        <Route path="/frommypen/signin" element={<Signin></Signin>}></Route>
        <Route path="/frommypen/blog/:blogId" element={<Content postdata={postdata}></Content>}></Route>

        <Route path="*" element={<div>Page not found</div>}></Route>
      </Routes>
    </div>
    </div>
  );
}

export default App;
