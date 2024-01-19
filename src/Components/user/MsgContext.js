import { createContext,useState,useMemo, useCallback } from "react";

const msg = createContext();

const MsgContext = ({children})=>{
    const [isdone,setIsdone] = useState("")
    const [color,setColor] = useState("")

    // const handleSubmit = useCallback(() => {

    // }, []);


  






    const Msgvalue = useMemo(
        () => ({
            isdone,
            setIsdone,
            color,
            setColor,
    
        }),
        [isdone,color]
      );

    return (<msg.Provider value={Msgvalue}> {children}</msg.Provider>)
};
export {MsgContext, msg}