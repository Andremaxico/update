import { axiosInstance } from "@/utils/axiosInstance";

export const sendPostAction = async (formData: FormData) => {
    const res = await axiosInstance.post('/storage/postsImages', formData);
    // const response = await axiosInstance.post('/posts', data);

    const imageUrl = await res.data()
    console.log('data after uploading file', imageUrl);

    return { errorMessage: true ? null : 'message' }
}