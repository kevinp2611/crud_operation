import Login from "../Components/Login/Login";
import Wrapper from "../Components/user/Wrapper";
import Details from "../Components/userDetails/detaiils";


const Privateroutes = [
  
    {
      path: "/",
      component: Wrapper ,
    
    },
    {
      path: "/user-detail",
      component: Details ,
    
    }
   
  ];
  const Publicroutes = [
    {
      path: "/Login",
      component: Login ,
    
    },
  ]

  export {Privateroutes,Publicroutes}