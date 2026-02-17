

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
console.log(Response)