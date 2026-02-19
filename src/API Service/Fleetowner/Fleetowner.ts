

import axios from "axios";
import axiosInstance from "../../Utils/axiosInstance";

export const getFleetOwnerList = async (
    offset?: number,
    limit?: number
) => {

    const params = new URLSearchParams();


    if (offset !== undefined) params.append("offset", String(offset));
    if (limit !== undefined) params.append("limit", String(limit));

    const query = `api/fleetOwner/list?${params.toString()}`;

    const response = await axiosInstance.get(query);
    return response;


} 


export const updateOwnerstatus =async(data)=>{

    const response=await axiosInstance.put('/api/fleetOwner/status',data)
    return response;


}



export const Deletefleetowner = async (id)=>{

  const response= await axiosInstance.delete(`/api/fleetOwner/${id}`)
  return response
}