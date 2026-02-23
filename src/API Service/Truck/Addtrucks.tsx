
import axiosInstance from "../../Utils/axiosInstance";




export const AddTrucks= async(data:any)=>{
    
    const response=await axiosInstance.post('/api/vehicle/',data);

    return response;


}