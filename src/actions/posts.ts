import { axiosInstance } from "@/utils/axiosInstance";

export const sendPostAction = async (formData: FormData) => {
    const res = await axiosInstance.post('/storage/postsImages', formData);
    const imageData = res.data;

    console.log('got imageData', imageData)

    formData.append('imageUrl', imageData.publicUrl);

    console.log('form data url', formData.get('imageUrl'))

    const response = await axiosInstance.post('/posts', formData);

    console.log('send post response', response.data);

    return { errorMessage: true ? null : 'message' }
}