import React, { useState, useEffect } from 'react'
import Nature from './Nature'
import Author from './Author'

import { Outlet,useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Content({postdata}) {
  const [loading,setLoading]= useState(false);
  const [title,settitle]= useState();
  const [content,setcontent]= useState();
  const [id,setid]= useState();
  const [nature,setnature]= useState();
  const [date,setdate]= useState("");
  const [img,setimg]= useState();
  
//   // find out the id of blog
  const location = useLocation();
  
  const [messages,setmessages]= useState();
  const [textarea,settextarea]= useState();
  function textareahandler(event){
    settextarea(event.target.value)
  }


  const postcomment=async()=>{
    try{

    
    let req={
      "message":textarea,
      "bId":id,
      "token":document.cookie.substring(6)
    }
    let data= await fetch('https://blog-app-api-804s.onrender.com/api/postcomment',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...req}),
    });
    let datan= await data.json();
    console.log("comment created");
    console.log(datan);
    if(datan.success===false){
      toast.error("You need to logedin.");
    }
    else{
      toast.success("Successfully created comment.");
    }
    call();
  }catch(error){
    console.log(error);
    toast.alert("You need to logedin fo posting comments.");
    alert("You need to logedin fo posting comments.");
  }
  }


  const call= async()=>{
    let bId= location.pathname.split("/").at(-1).replaceAll("-"," ");
    
    


  let data= await fetch('https://blog-app-api-804s.onrender.com/api/getcomment',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"bId":bId }),
  });
  let datan= await data.json();
  setmessages(datan.data);
  console.log("comments data",datan);

    postdata.forEach(element => {
      if(element._id===bId){
      setid(bId);
      console.log(element.title);
      setcontent(element.content);
      setnature(element.nature);
      setdate(element.date);
      settitle(element.title);
      setimg(element.img);
    console.log("founded")
    }
  });
  console.log(bId);
  console.log(`postdata is ${id},${nature}`);
  console.log(title);
};

const fetchdata = async()=>{
          try{  
            let bId= location.pathname.split("/").at(-1).replaceAll("-"," ");
            // console.log(typeof(bId));
            // let bodyData={
            //   "_id":bId
            // }
            let data= await fetch(`https://blog-app-api-804s.onrender.com/api/getaPost/${bId}`);
              let datan= await data.json();
              let findata=datan.data[0];
              console.log(findata);
              settitle(findata.title);
              setimg(findata.img);
              setnature(findata.nature);
              setdate(findata.date);
              setcontent(findata.content);
              setid(findata._id);
            }
            catch(error){
              console.log(error);
              console.log("error occured in geting a post");
            }
}
useEffect(()=>{
  setLoading(true);
  console.log("fetch request sent");
  fetchdata();
  console.log("fetch request completed");
  call();
  setLoading(false);
},[location])
  return (
    <div>
        {

          loading ? <div>loading</div> :
          <div className='containercontent content-article'>
        
        <Nature nature={nature}> </Nature>
        <h1 className='text-3xl'>{title}</h1>
        <Author Date={date} ></Author>
        <img src={img}></img>
        <p>
        {
          content
        }
        </p>
        <br></br>
        <div className='comments'>
          <h1>Comments</h1>
          <hr></hr>
          <div className='comment'>

              {
                messages?.map(element=>{
                  return(
                    <div className='cmt'>
                      <div className='userinfo'>
                        <div className='username'> 
                          <i class="fa-solid fa-user"></i>
                          <h2>{element.name}</h2>
                        </div>
                          <p>{element.date.substring(0,10)}</p>
                        </div>
                        <p>{element.message}</p>
                      
                    </div>
                  )
                })
              }
          </div>
          <hr></hr>
          <div className='leave'>
              <h1>Leave a Comment</h1>
              <textarea className ="inputcommment" placeholder='Type here..' onChange={textareahandler}></textarea>
              <button className='button-5' onClick={postcomment}>Post Comment</button>
          </div>
        </div>
    </div>
        }
   
   
    </div>
  )
}
