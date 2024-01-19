import { createContext, useState ,useMemo} from "react"

const invoice = createContext();

const  InvoiceContext = ({children})=>{

    const [empData,setempData] = useState([{
        index:"1",
        salary:"45000",
        city:"amreli"
    }])

    const testData = useMemo(
        () => ({
            empData,
            setempData
        }),
        [empData]
      );

    return(<invoice.Provider value={testData}> {children}</invoice.Provider>)

};
export {InvoiceContext, invoice}