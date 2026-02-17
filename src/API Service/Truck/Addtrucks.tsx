
import axiosInstance from "../../Utils/axiosInstance";




export const AddTrucks= async(data)=>{
    
    const response=await axiosInstance.post('/api/vehicle/',data);

    return response;


}