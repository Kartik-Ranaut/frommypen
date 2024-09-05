import { createContext, useState } from "react";

export const AppContext=createContext();

export function AppContextProvider({children}){
    const [loading,setloading]=useState(false);
    const [title,settitle]= useState();
    const [content,setcontent]= useState();
    const [id,setid]= useState();
    const [nature,setnature]= useState();
    const [date,setdate]= useState();
    const [img,setimg]= useState();


    // datafilling code
    

    const value={
        loading,
        setloading,
        title,
        settitle,
        content,
        setcontent,
        id,
        setid,
        nature,
        setnature,
        date,
        setdate,
        img,
        setimg
    };

    return (<AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>)
}