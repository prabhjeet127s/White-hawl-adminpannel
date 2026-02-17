import axiosInstance from "../../Utils/axiosInstance";

export const Getongoingload = (
    offset?: number,
    limit?: number,
    status?: string,
) => {

    const params = new URLSearchParams();

    if (offset!==undefined) params.append("offset",String(offset));
    if(limit!==undefined) params.append("limit",String(limit));
    if(status!==undefined) params.append("status",String(status));

    const query=`/api/load/?${params.toString()}`

    const response=axiosInstance.get(query)
    return response;


}




