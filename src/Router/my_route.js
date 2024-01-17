import User from "../Components/user/Main";
import Details from "../Components/userDetails/detaiils";

const routes = [
    {
      path: "/",
      component: User ,
    
    },
    {
      path: "/user-detail",
      component: Details ,
    
    }
   
  ];

  export default routes;