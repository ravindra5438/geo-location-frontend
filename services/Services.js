import axios from "axios"
import {REACT_APP_URL} from "@env"

export default login = async ({email,password})=>{
    console.log(email,password);
try {
    const data = await axios({
        url:`${REACT_APP_URL}/login`,
        method:"post",
        data:{
            email:email,
            password:password,
        }
    })
    console.log(data.data);
} catch (err) {
    console.log(err);
}
}
