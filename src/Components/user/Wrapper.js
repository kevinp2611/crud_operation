
import User from "./Main";
import { UserContext } from "./userContext";
import { InvoiceContext } from "./invoiceContext";
import Employee from "./Employee"
import { MsgContext } from "./MsgContext";



const Wrapper = () => {
  
  return(
    <>
      <UserContext>
    <MsgContext> 
      <User/>
    </MsgContext>
      </UserContext>
<InvoiceContext> 
    <Employee />
</InvoiceContext>
    </>

      ) 
    
};
export default Wrapper;