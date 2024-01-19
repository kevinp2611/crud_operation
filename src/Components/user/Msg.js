import { useContext, useMemo } from "react"
import { msg } from "./MsgContext"


const Msg = () =>{
    const {isdone,setIsdone,color,setColor} = useContext(msg)

    setTimeout(() => {
    
        setIsdone("")
        setColor("")
        }, 2000)


    return useMemo(()=>( 
        <>
        {console.log("msg")}
        {
           < div style={{color:`${color}`}}>{isdone}</div>

        }
        </>

    ),[isdone,color])
}
export default Msg