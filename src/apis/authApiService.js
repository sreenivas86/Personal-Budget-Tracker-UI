import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const sendData = async (data) => {
  const authUrl = `${BASE_URL}/auth/register`;

  try {
    const res = await axios.post(authUrl, data);
    return res;
  } catch (error) {
    if (error.response) {
      
      if (error.response.status === 409) {
        console.error("Conflict: User already exists.");
        throw new Error("Email already registered.");
      } else {
        console.error("Error:", error.response.data);
        throw new Error(error.response.data.message || "Something went wrong.");
      }
    } else {
      console.error("Network Error:", error.message);
      throw new Error("Network error, please try again.");
    }
  }
};

const login=async(data)=>{
  const url=BASE_URL+'/auth/login';
  try{
    const res=await axios.post(url,data);
    
    return res;

  }catch(error){
    throw new Error(error);
  }
  
  
}

export { sendData , login};
