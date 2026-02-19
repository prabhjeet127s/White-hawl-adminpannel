import axiosInstance from "../../Utils/axiosInstance";

export const getDriverList = async (
  offset?: number,
  limit?: number,
  status?:string
  

) => {
  const params = new URLSearchParams();

  if (offset !== undefined) params.append("offset", String(offset));
  if (limit !== undefined) params.append("limit", String(limit));
  if(status!==undefined) params.append("status",String(status))
   


  const query = `api/driver/list/${params.toString() ? `?${params.toString()}` : ""}`;
  const response = await axiosInstance.get(query);
  return response;
};


export const UpdateDriverstatus= async (data)=>{

    const response= await axiosInstance.put('/api/driver/status',data)
    return response;
}


export const Deletedriver= async (id)=>{

  const response= await axiosInstance.delete(`/api/driver/${id}`)
  return response
}