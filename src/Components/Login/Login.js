import { useNavigate } from "react-router-dom";
import Wrapper from "../user/Wrapper";

const Login = () => {
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", `${process.env.REACT_APP_TOKEN}`);
    navigate(`/`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <button type="submit"> Login</button>
    </form>
  );
};

export default Login;
