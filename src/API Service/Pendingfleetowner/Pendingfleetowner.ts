import axiosInstance from "../../Utils/axiosInstance"

export const Getpendingfleetowner = async (
    offset?: number,
    limit?: number
) => {
    const response = axiosInstance.get(`/api/fleetOwner/list/?offset=${offset}&limit=${limit}&isApprovedByAdmin=${false}`)
    return response;

}


