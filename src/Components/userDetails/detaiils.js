import { useLocation, useParams } from "react-router-dom"


const Details = () =>{
  let param = useParams();
  const location = useLocation();
  console.log(location, param)
  return (
    <>
     <h1> {location.state.userData.id}</h1>
   < label> name:
     <h4> {location.state.userData.name}</h4>
     </label>
     < label> email:
     <h4> {location.state.userData.email}</h4>
     </label>
    </>
  )
}
export default Details