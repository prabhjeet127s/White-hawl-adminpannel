import axiosInstance from "../../Utils/axiosInstance";

export const Getongoingload = async (
    offset?: number,
    limit?: number,
    status?: string,
) => {

    const params = new URLSearchParams();

    if (offset!==undefined) params.append("offset",String(offset));
    if(limit!==undefined) params.append("limit",String(limit));
    if(status!==undefined) params.append("status",String(status));

    const query=`/api/load/?${params.toString()}`

    const response=  await axiosInstance.get(query)
    return response;

}
export const CreateOnGoingLoads=async(payload:any)=>{


    const response= axiosInstance.post('/api/load',payload)
    return response;

}





