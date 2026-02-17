import axiosInstance from "../../Utils/axiosInstance";





export const signin= async (data:{email:string;password:string})=>{

    const response=await axiosInstance.post('/api/admin/login',data)
    console.log(data)
    return response;

}