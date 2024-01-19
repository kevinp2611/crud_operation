import { createContext, useMemo, useState } from "react";

const ctx = createContext();


const Context = ({children}) => {
  const [theme, setTheme] = useState("light");
  

  const themeData = useMemo(() => ({
    theme,
    setTheme,
    
  }), [theme]);

  const userData = useMemo


  return <ctx.Provider value={themeData}>


    {children}
   
    
    </ctx.Provider>;
};

export { ctx, Context };
