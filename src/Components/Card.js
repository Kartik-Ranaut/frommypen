import React from 'react';
import Nature from './Nature';
import {useState} from 'react';
import Author from './Author';
import Content from './Content';
import { useNavigate, useNavigation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Card(props) {
  const [disply,setdisplay]=useState(false);
  
  function display(){
    
   
  }
  return (
    <Link to={`/frommypen/blog/${props._id}`} className='card' onClick={display} >
        <img className='cardimage' src={props.img}></img>
        <div className='rightcontent'>
        <Nature nature={props.nature}></Nature>
        <h1 className='titleofcard'>{props.title}</h1>
        <Author Date={props.date}></Author>
        </div>
        
    </Link>
  )
}
