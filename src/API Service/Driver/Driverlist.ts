import axiosInstance from "../../Utils/axiosInstance";

export const getDriverList = async (
  offset?: number,
  limit?: number,
  

) => {
  const params = new URLSearchParams();

  if (offset !== undefined) params.append("offset", String(offset));
  if (limit !== undefined) params.append("limit", String(limit));
  


  const query = `api/driver/list/${params.toString() ? `?${params.toString()}` : ""}`;
  const response = await axiosInstance.get(query);
  return response;
};


export const UpdateDriverstatus=(data)=>{

    const response=axiosInstance.put('/api/driver/status',data)
    return response;
}