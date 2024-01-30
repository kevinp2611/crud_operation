import Basic from "./Basic";

import Preference from "./Preference";
import Address from "./Address";

const formArray = {
  basic: {
    name: "basic",
    component: <Basic />,
  },
  address: {
    name: "address",
    component: <Address />,
  },
  preference: {
    name: "preference",
    component: <Preference />,
  },
};
export default formArray;
