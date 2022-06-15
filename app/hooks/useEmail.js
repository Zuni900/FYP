import { UserContext } from "../context/Index";
import {useContext} from "react";
const useEmail=()=>{ 
    const {userEmail,setEmail}=useContext(UserContext);
    const setUserEmail=(email)=>{
        setEmail(email);
    }
    return {userEmail, setUserEmail};
}
export default useEmail;