import { useContext } from "react";
import { invoice } from "./invoiceContext";

const Employee = () =>{
const {empData,setempData} = useContext(invoice)
return(
    <>
   { console.log("emp",empData)}

<h1> Emp Data:</h1>
{
empData.map((data) => (
<li> 

    {`Index: ${data.index}, Salary: ${data.salary}`}
</li>

))}

</>)
}
export default Employee;