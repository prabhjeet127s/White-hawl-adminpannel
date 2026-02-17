import axiosInstance from "../../Utils/axiosInstance";


export const getTrucksList = async (
    offset?: number,
    limit?: number,
    vehicleId?: string,
    vehicleType?: string

) => {

    const params = new URLSearchParams();
    if (offset !== undefined) params.append("offset", String(offset));
    if (limit !== undefined) params.append("limit", String(limit));
    if (vehicleType !== undefined) params.append("vehicleType", String(vehicleType));
    if (vehicleId !== undefined) params.append("vehicleId", String(vehicleId));

    const query = `api/vehicle/?${params.toString()}`;

    const response = await axiosInstance.get(query)

    return response;
}


export const addTrucksList= async (data)=>{


    const response=await axiosInstance.post('/api/vehicle/',data)



}