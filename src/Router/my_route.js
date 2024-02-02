import Upadateform from "../Components/Form/Updateform";
import Login from "../Components/Login/Login";
import Wrapper from "../Components/user/Wrapper";
import Details from "../Components/userDetails/detaiils";

const Privateroutes = [
  {
    path: "/",
    component: Wrapper,
  },
  {
    path: "/user-detail",
    component: Details,
  },
  {
    path: "/custom-form",
    component: Upadateform,
  },
];
const Publicroutes = [
  {
    path: "/Login",
    component: Login,
  },
];

export { Privateroutes, Publicroutes };
